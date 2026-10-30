from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, Field
from pathlib import Path
from datetime import datetime
from typing import Literal
import sqlite3
import json
import os
import re
import time
import hmac
import hashlib
import secrets
import base64

app = FastAPI(title="SAATHI Learning API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_PATH = Path(__file__).with_name("saathi.db")

SECRET_KEY = os.getenv(
    "SAATHI_SECRET_KEY",
    "saathi-local-development-key-change-before-deployment"
)

security = HTTPBearer(auto_error=False)


def get_connection():
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
    return connection


# PASSWORD SECURITY
def hash_password(password, salt=None):
    salt = salt or secrets.token_hex(16)

    hashed = hashlib.pbkdf2_hmac(
        "sha256",
        password.encode(),
        bytes.fromhex(salt),
        310000
    ).hex()

    return salt + "$" + hashed


def verify_password(password, stored_hash):
    try:
        salt, original_hash = stored_hash.split("$", 1)

        new_hash = hash_password(
            password, salt
        ).split("$", 1)[1]

        return hmac.compare_digest(new_hash, original_hash)

    except (ValueError, TypeError):
        return False


# LOGIN TOKENS
def encode_part(value):
    return base64.urlsafe_b64encode(value).decode().rstrip("=")


def create_token(user_id):
    payload = json.dumps({
        "sub": user_id,
        "exp": int(time.time()) + 8 * 60 * 60
    }).encode()

    encoded = encode_part(payload)

    signature = encode_part(
        hmac.new(
            SECRET_KEY.encode(),
            encoded.encode(),
            hashlib.sha256
        ).digest()
    )

    return encoded + "." + signature


def read_token(token):
    try:
        encoded, signature = token.split(".", 1)

        expected = encode_part(
            hmac.new(
                SECRET_KEY.encode(),
                encoded.encode(),
                hashlib.sha256
            ).digest()
        )

        if not hmac.compare_digest(signature, expected):
            raise ValueError()

        payload = encoded + "=" * (-len(encoded) % 4)
        data = json.loads(base64.urlsafe_b64decode(payload))

        if data["exp"] < int(time.time()):
            raise ValueError()

        return int(data["sub"])

    except Exception:
        raise HTTPException(
            status_code=401,
            detail="Session expired or invalid. Log in again."
        )


# DATABASE
def initialize_database():
    with get_connection() as connection:
        connection.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password_hash TEXT NOT NULL,
                role TEXT NOT NULL,
                class_name TEXT NOT NULL DEFAULT 'Class 7',
                created_at TEXT NOT NULL,
                student_code TEXT UNIQUE
            )
        """)

        connection.execute("""
            CREATE TABLE IF NOT EXISTS submissions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                student_name TEXT NOT NULL DEFAULT 'Unknown student',
                class_name TEXT NOT NULL,
                subject TEXT NOT NULL,
                topic TEXT NOT NULL,
                correct_answers INTEGER NOT NULL,
                total_questions INTEGER NOT NULL,
                accuracy INTEGER NOT NULL,
                mistake_tags_json TEXT NOT NULL,
                learning_phase TEXT NOT NULL,
                recommended_level TEXT NOT NULL,
                recommended_activity TEXT NOT NULL,
                explanation TEXT NOT NULL,
                prerequisite_suggestion TEXT,
                created_at TEXT NOT NULL,
                teacher_feedback TEXT DEFAULT '',
                teacher_override_level TEXT,
                teacher_override_activity TEXT,
                teacher_override_reason TEXT,
                student_id INTEGER,
                is_demo INTEGER NOT NULL DEFAULT 0
            )
        """)

        user_columns = {
            row["name"]
            for row in connection.execute(
                "PRAGMA table_info(users)"
            ).fetchall()
        }

        submission_columns = {
            row["name"]
            for row in connection.execute(
                "PRAGMA table_info(submissions)"
            ).fetchall()
        }

        user_migrations = {
            "student_code": """
                ALTER TABLE users ADD COLUMN student_code TEXT
            """
        }

        submission_migrations = {
            "student_name": """
                ALTER TABLE submissions ADD COLUMN student_name TEXT
                NOT NULL DEFAULT 'Unknown student'
            """,
            "teacher_feedback": """
                ALTER TABLE submissions ADD COLUMN teacher_feedback TEXT
                DEFAULT ''
            """,
            "teacher_override_level": """
                ALTER TABLE submissions ADD COLUMN teacher_override_level TEXT
            """,
            "teacher_override_activity": """
                ALTER TABLE submissions ADD COLUMN teacher_override_activity TEXT
            """,
            "teacher_override_reason": """
                ALTER TABLE submissions ADD COLUMN teacher_override_reason TEXT
            """,
            "student_id": """
                ALTER TABLE submissions ADD COLUMN student_id INTEGER
            """,
            "is_demo": """
                ALTER TABLE submissions ADD COLUMN is_demo INTEGER
                NOT NULL DEFAULT 0
            """
        }

        for column, sql in user_migrations.items():
            if column not in user_columns:
                connection.execute(sql)

        for column, sql in submission_migrations.items():
            if column not in submission_columns:
                connection.execute(sql)

        # Assign IDs to accounts created before student IDs were added.
        users = connection.execute("""
            SELECT id, role
            FROM users
            WHERE student_code IS NULL
        """).fetchall()

        for user in users:
            if user["role"] == "faculty":
                code = f"FAC{user['id']:04d}"
            else:
                code = f"STU{1000 + user['id']}"

            connection.execute("""
                UPDATE users SET student_code = ?
                WHERE id = ?
            """, (code, user["id"]))

        connection.execute("""
            CREATE UNIQUE INDEX IF NOT EXISTS
            idx_users_student_code
            ON users(student_code)
        """)

        # Create faculty demo account if it does not exist.
        faculty_email = os.getenv(
            "SAATHI_FACULTY_EMAIL",
            "faculty@saathi.local"
        ).strip().lower()

        faculty_password = os.getenv(
            "SAATHI_FACULTY_PASSWORD",
            "Faculty@123"
        )

        faculty = connection.execute(
            "SELECT id FROM users WHERE email = ?",
            (faculty_email,)
        ).fetchone()

        if not faculty:
            connection.execute("""
                INSERT INTO users (
                    name, email, password_hash, role,
                    class_name, created_at, student_code
                )
                VALUES (?, ?, ?, ?, ?, ?, ?)
            """, (
                "SAATHI Faculty",
                faculty_email,
                hash_password(faculty_password),
                "faculty",
                "Class 7",
                datetime.now().isoformat(timespec="seconds"),
                "FAC0001"
            ))


initialize_database()


# DEMO STUDENTS
DEMO_STUDENTS = [
    {
        "code": "STU1001",
        "name": "Aarav Sharma",
        "email": "aarav.demo@saathi.local",
        "class_name": "Class 7",
        "subject": "Mathematics",
        "topic": "Fractions",
        "score": 2,
        "accuracy": 40,
        "tags": ["multiplication"],
        "level": "Foundation",
        "phase": "Learn",
        "activity": "Revise multiplication before practising fractions",
        "explanation": "Review multiplication before returning to fractions.",
        "prerequisite": "Practise multiplication facts and equal groups."
    },
    {
        "code": "STU1002",
        "name": "Meera Reddy",
        "email": "meera.demo@saathi.local",
        "class_name": "Class 7",
        "subject": "Mathematics",
        "topic": "Fractions",
        "score": 3,
        "accuracy": 60,
        "tags": ["equivalent fractions"],
        "level": "Practice",
        "phase": "Solve",
        "activity": "Practise equivalent fractions",
        "explanation": "Use guided examples to strengthen understanding.",
        "prerequisite": "Review equivalent fractions."
    },
    {
        "code": "STU1003",
        "name": "Ravi Kumar",
        "email": "ravi.demo@saathi.local",
        "class_name": "Class 7",
        "subject": "Mathematics",
        "topic": "Fractions",
        "score": 1,
        "accuracy": 20,
        "tags": ["multiplication", "fractions"],
        "level": "Foundation",
        "phase": "Learn",
        "activity": "Review multiplication and fraction basics",
        "explanation": "Start with prerequisite skills and simple examples.",
        "prerequisite": "Revise multiplication before fractions."
    },
    {
        "code": "STU1004",
        "name": "Ananya Patel",
        "email": "ananya.demo@saathi.local",
        "class_name": "Class 8",
        "subject": "Science",
        "topic": "Cells",
        "score": 5,
        "accuracy": 100,
        "tags": [],
        "level": "Challenge",
        "phase": "Test",
        "activity": "Try a harder activity",
        "explanation": "Strong performance suggests readiness for a challenge.",
        "prerequisite": None
    },
    {
        "code": "STU1005",
        "name": "Arjun Rao",
        "email": "arjun.demo@saathi.local",
        "class_name": "Class 6",
        "subject": "English",
        "topic": "Nouns and Pronouns",
        "score": 4,
        "accuracy": 80,
        "tags": ["pronouns"],
        "level": "Challenge",
        "phase": "Test",
        "activity": "Practise more advanced grammar examples",
        "explanation": "Good progress; continue practising with harder examples.",
        "prerequisite": "Review pronouns as needed."
    }
]


def seed_demo_data():
    with get_connection() as connection:
        for student in DEMO_STUDENTS:
            existing = connection.execute(
                "SELECT id FROM users WHERE email = ?",
                (student["email"],)
            ).fetchone()

            if existing:
                user_id = existing["id"]

                connection.execute("""
                    UPDATE users
                    SET student_code = ?
                    WHERE id = ?
                    AND (student_code IS NULL OR student_code = ?)
                """, (
                    student["code"],
                    user_id,
                    student["code"]
                ))

            else:
                cursor = connection.execute("""
                    INSERT INTO users (
                        name, email, password_hash, role,
                        class_name, created_at, student_code
                    )
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                """, (
                    student["name"],
                    student["email"],
                    hash_password("Student@123"),
                    "student",
                    student["class_name"],
                    datetime.now().isoformat(timespec="seconds"),
                    student["code"]
                ))

                user_id = cursor.lastrowid

            already_seeded = connection.execute("""
                SELECT id FROM submissions
                WHERE student_id = ? AND is_demo = 1
                LIMIT 1
            """, (user_id,)).fetchone()

            if not already_seeded:
                connection.execute("""
                    INSERT INTO submissions (
                        student_name, class_name, subject, topic,
                        correct_answers, total_questions, accuracy,
                        mistake_tags_json, learning_phase,
                        recommended_level, recommended_activity,
                        explanation, prerequisite_suggestion,
                        created_at, student_id, is_demo
                    )
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
                """, (
                    student["name"],
                    student["class_name"],
                    student["subject"],
                    student["topic"],
                    student["score"],
                    5,
                    student["accuracy"],
                    json.dumps(student["tags"]),
                    student["phase"],
                    student["level"],
                    student["activity"],
                    student["explanation"],
                    student["prerequisite"],
                    datetime.now().isoformat(timespec="seconds"),
                    user_id
                ))


seed_demo_data()


# REQUEST MODELS
class RegisterRequest(BaseModel):
    name: str = Field(min_length=2, max_length=30)
    email: str = Field(min_length=5, max_length=100)
    password: str = Field(min_length=8, max_length=128)
    class_name: Literal[
        "Class 6", "Class 7", "Class 8", "Class 9", "Class 10"
    ]


class LoginRequest(BaseModel):
    email: str
    password: str
    role: Literal["student", "faculty"]


class LearningRequest(BaseModel):
    student_name: str = Field(
        default="Unknown student",
        min_length=1,
        max_length=30
    )
    class_name: str
    subject: str
    topic: str
    correct_answers: int = Field(ge=0, le=5)
    total_questions: int = Field(default=5, ge=1, le=5)
    mistake_tags: list[str] = Field(default_factory=list)


class FeedbackRequest(BaseModel):
    submission_id: int = Field(gt=0)
    feedback: str = Field(min_length=1, max_length=1000)


class TeacherOverrideRequest(BaseModel):
    submission_id: int = Field(gt=0)
    override_level: Literal["Foundation", "Practice", "Challenge"]
    override_activity: str = Field(min_length=1, max_length=200)
    reason: str = Field(default="", max_length=500)


# AUTH HELPERS
def public_user(user):
    return {
        "id": user["id"],
        "student_code": user["student_code"],
        "name": user["name"],
        "email": user["email"],
        "role": user["role"],
        "class_name": user["class_name"]
    }


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    if credentials is None:
        raise HTTPException(
            status_code=401,
            detail="Please log in first."
        )

    user_id = read_token(credentials.credentials)

    with get_connection() as connection:
        user = connection.execute(
            "SELECT * FROM users WHERE id = ?",
            (user_id,)
        ).fetchone()

    if not user:
        raise HTTPException(
            status_code=401,
            detail="User account not found."
        )

    return dict(user)


def require_student(current_user=Depends(get_current_user)):
    if current_user["role"] != "student":
        raise HTTPException(
            status_code=403,
            detail="Student account required."
        )
    return current_user


def require_faculty(current_user=Depends(get_current_user)):
    if current_user["role"] != "faculty":
        raise HTTPException(
            status_code=403,
            detail="Faculty access required."
        )
    return current_user


# BASIC ROUTES
@app.get("/")
def home():
    return {"message": "Welcome to SAATHI!", "status": "running"}


@app.get("/api/health")
def health_check():
    return {"message": "SAATHI backend is running!"}


# REGISTRATION
@app.post("/api/auth/register")
def register_student(data: RegisterRequest):
    name = data.name.strip()
    email = data.email.strip().lower()

    if not name:
        raise HTTPException(status_code=400, detail="Name is required.")

    if not re.fullmatch(r"[^@\s]+@[^@\s]+\.[^@\s]+", email):
        raise HTTPException(status_code=400, detail="Invalid email address.")

    with get_connection() as connection:
        existing = connection.execute(
            "SELECT id FROM users WHERE email = ?",
            (email,)
        ).fetchone()

        if existing:
            raise HTTPException(
                status_code=409,
                detail="Email is already registered."
            )

        cursor = connection.execute("""
            INSERT INTO users (
                name, email, password_hash, role,
                class_name, created_at, student_code
            )
            VALUES (?, ?, ?, ?, ?, ?, NULL)
        """, (
            name,
            email,
            hash_password(data.password),
            "student",
            data.class_name,
            datetime.now().isoformat(timespec="seconds")
        ))

        user_id = cursor.lastrowid
        student_code = f"STU{1000 + user_id}"

        connection.execute("""
            UPDATE users SET student_code = ?
            WHERE id = ?
        """, (student_code, user_id))

        user = connection.execute(
            "SELECT * FROM users WHERE id = ?",
            (user_id,)
        ).fetchone()

    return {
        "message": "Registration successful.",
        "token": create_token(user_id),
        "token_type": "bearer",
        "user": public_user(user)
    }


# LOGIN
@app.post("/api/auth/login")
def login(data: LoginRequest):
    email = data.email.strip().lower()

    with get_connection() as connection:
        user = connection.execute(
            "SELECT * FROM users WHERE email = ?",
            (email,)
        ).fetchone()

    if (
        not user
        or not verify_password(data.password, user["password_hash"])
        or user["role"] != data.role
    ):
        raise HTTPException(
            status_code=401,
            detail="Incorrect email, password or account type."
        )

    return {
        "message": "Login successful.",
        "token": create_token(user["id"]),
        "token_type": "bearer",
        "user": public_user(user)
    }


@app.get("/api/auth/me")
def get_my_account(current_user=Depends(get_current_user)):
    return {"user": public_user(current_user)}


# RECOMMENDATIONS
def create_recommendation(data):
    accuracy = round(
        data.correct_answers / data.total_questions * 100
    )

    tags = list(dict.fromkeys(
        tag.strip().lower()
        for tag in data.mistake_tags
        if tag.strip()
    ))

    prerequisite = None

    if "fraction" in data.topic.lower() and "multiplication" in tags:
        phase = "Learn"
        level = "Foundation"
        activity = "Revise multiplication before practising fractions"
        explanation = (
            "Review multiplication first, then return to fractions."
        )
        prerequisite = "Practise multiplication facts and equal groups."

    elif accuracy <= 40:
        phase = "Learn"
        level = "Foundation"
        activity = "Review the basics"
        explanation = "Review the lesson and work through simple examples."
        if tags:
            prerequisite = "Review: " + ", ".join(tags)

    elif accuracy <= 60:
        phase = "Solve"
        level = "Practice"
        activity = "Practise: " + ", ".join(tags) if tags else "Try guided practice"
        explanation = "Use hints and solve similar questions."
        if tags:
            prerequisite = "Focus on: " + ", ".join(tags)

    else:
        phase = "Test"
        level = "Challenge"
        activity = "Try a harder activity"
        explanation = "Your score suggests you may be ready for a harder question."
        if tags:
            prerequisite = "Review these areas: " + ", ".join(tags)

    return {
        "accuracy": accuracy,
        "learning_phase": phase,
        "recommended_level": level,
        "recommended_activity": activity,
        "explanation": explanation,
        "prerequisite_suggestion": prerequisite
    }


@app.post("/api/recommendation")
def get_recommendation(
    data: LearningRequest,
    current_user=Depends(require_student)
):
    result = create_recommendation(data)

    with get_connection() as connection:
        connection.execute("""
            INSERT INTO submissions (
                student_name, class_name, subject, topic,
                correct_answers, total_questions, accuracy,
                mistake_tags_json, learning_phase,
                recommended_level, recommended_activity,
                explanation, prerequisite_suggestion,
                created_at, student_id
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            current_user["name"],
            current_user["class_name"],
            data.subject,
            data.topic,
            data.correct_answers,
            data.total_questions,
            result["accuracy"],
            json.dumps(data.mistake_tags, ensure_ascii=False),
            result["learning_phase"],
            result["recommended_level"],
            result["recommended_activity"],
            result["explanation"],
            result["prerequisite_suggestion"],
            datetime.now().isoformat(timespec="seconds"),
            current_user["id"]
        ))

    return {
        "student_name": current_user["name"],
        "student_code": current_user["student_code"],
        "class": current_user["class_name"],
        "subject": data.subject,
        "topic": data.topic,
        **result
    }


# STUDENT PROGRESS
@app.get("/api/student/submissions")
def get_my_submissions(current_user=Depends(require_student)):
    with get_connection() as connection:
        rows = connection.execute("""
            SELECT id, student_name, class_name, subject, topic,
                   correct_answers, total_questions, accuracy,
                   learning_phase, recommended_level,
                   recommended_activity, created_at
            FROM submissions
            WHERE student_id = ?
            ORDER BY id DESC
            LIMIT 100
        """, (current_user["id"],)).fetchall()

    return {"submissions": [dict(row) for row in rows]}


# TEACHER SUBMISSIONS
@app.get("/api/teacher/submissions")
def get_teacher_submissions(current_user=Depends(require_faculty)):
    with get_connection() as connection:
        rows = connection.execute("""
            SELECT s.*, u.student_code
            FROM submissions s
            LEFT JOIN users u ON s.student_id = u.id
            ORDER BY s.id DESC
            LIMIT 100
        """).fetchall()

    submissions = []

    for row in rows:
        item = dict(row)
        item["mistake_tags"] = json.loads(
            item.pop("mistake_tags_json")
        )
        submissions.append(item)

    return {"submissions": submissions}


@app.get("/api/teacher/summary")
def get_teacher_summary(current_user=Depends(require_faculty)):
    with get_connection() as connection:
        row = connection.execute("""
            SELECT
                COUNT(*) AS total_submissions,
                AVG(accuracy) AS average_accuracy,
                SUM(CASE WHEN accuracy <= 40 THEN 1 ELSE 0 END)
                AS students_needing_support
            FROM submissions
        """).fetchone()

    return {
        "total_submissions": row["total_submissions"],
        "average_accuracy": round(row["average_accuracy"] or 0),
        "students_needing_support": row["students_needing_support"] or 0
    }


@app.post("/api/teacher/feedback")
def save_teacher_feedback(
    data: FeedbackRequest,
    current_user=Depends(require_faculty)
):
    feedback = data.feedback.strip()

    if not feedback:
        raise HTTPException(status_code=400, detail="Feedback cannot be empty.")

    with get_connection() as connection:
        existing = connection.execute(
            "SELECT id FROM submissions WHERE id = ?",
            (data.submission_id,)
        ).fetchone()

        if not existing:
            raise HTTPException(status_code=404, detail="Submission not found.")

        connection.execute("""
            UPDATE submissions SET teacher_feedback = ?
            WHERE id = ?
        """, (feedback, data.submission_id))

    return {"message": "Teacher feedback saved successfully."}


@app.post("/api/teacher/override")
def save_teacher_override(
    data: TeacherOverrideRequest,
    current_user=Depends(require_faculty)
):
    with get_connection() as connection:
        existing = connection.execute(
            "SELECT id FROM submissions WHERE id = ?",
            (data.submission_id,)
        ).fetchone()

        if not existing:
            raise HTTPException(status_code=404, detail="Submission not found.")

        connection.execute("""
            UPDATE submissions
            SET teacher_override_level = ?,
                teacher_override_activity = ?,
                teacher_override_reason = ?
            WHERE id = ?
        """, (
            data.override_level,
            data.override_activity.strip(),
            data.reason.strip(),
            data.submission_id
        ))

    return {"message": "Teacher override saved successfully."}


@app.delete("/api/teacher/override/{submission_id}")
def remove_teacher_override(
    submission_id: int,
    current_user=Depends(require_faculty)
):
    with get_connection() as connection:
        existing = connection.execute(
            "SELECT id FROM submissions WHERE id = ?",
            (submission_id,)
        ).fetchone()

        if not existing:
            raise HTTPException(status_code=404, detail="Submission not found.")

        connection.execute("""
            UPDATE submissions
            SET teacher_override_level = NULL,
                teacher_override_activity = NULL,
                teacher_override_reason = NULL
            WHERE id = ?
        """, (submission_id,))

    return {"message": "Teacher override removed successfully."}
