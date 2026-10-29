
const topics = {
  "Programming Basics": [
    {
      name: "Variables and Data Types",
      icon: "💻",
      lesson: "A variable stores a value. Common data types include integers, decimal numbers, characters, and strings.",
      example: "int age = 18; stores the integer 18 in a variable named age.",
      questions: [
        {
          q: "What is a variable used for?",
          options: ["Storing data", "Drawing pictures", "Playing music", "Deleting programs"],
          answer: 0,
          explanation: "A variable stores data that a program can use."
        },
        {
          q: "Which data type commonly stores whole numbers in C?",
          options: ["float", "int", "char", "void"],
          answer: 1,
          explanation: "The int data type commonly stores whole numbers."
        },
        {
          q: "Which data type stores a single character in C?",
          options: ["int", "float", "char", "double"],
          answer: 2,
          explanation: "The char data type stores a character."
        },
        {
          q: "Which of these is a string?",
          options: ["25", '"Hello"', "3.5", "true"],
          answer: 1,
          explanation: '"Hello" is text enclosed in quotation marks.'
        },
        {
          q: "Which is a valid variable name in C?",
          options: ["2age", "my-age", "my_age", "int"],
          answer: 2,
          explanation: "my_age is valid. A variable name cannot start with a digit or contain a hyphen."
        }
      ]
    },
    {
      name: "Operators and Conditions",
      icon: "🧩",
      lesson: "Operators perform calculations or comparisons. Conditions help a program make decisions using statements such as if and else.",
      example: "If marks >= 40, a program can display 'Pass'; otherwise, it can display 'Try again'.",
      questions: [
        {
          q: "What is 5 + 3?",
          options: ["2", "8", "15", "53"],
          answer: 1,
          explanation: "The + operator adds two numbers."
        },
        {
          q: "Which operator checks equality in C?",
          options: ["=", "==", "+", "*"],
          answer: 1,
          explanation: "The == operator compares two values for equality."
        },
        {
          q: "Which statement is used for decision-making?",
          options: ["if", "print", "include", "define"],
          answer: 0,
          explanation: "An if statement executes code when its condition is true."
        },
        {
          q: "What is the result of 10 > 5?",
          options: ["False", "True", "10", "5"],
          answer: 1,
          explanation: "10 is greater than 5, so the condition is true."
        },
        {
          q: "Which operator means logical AND in C?",
          options: ["||", "!", "&&", "=="],
          answer: 2,
          explanation: "The && operator represents logical AND."
        }
      ]
    }
  ],

  Mathematics: [
    {
      name: "Fractions",
      icon: "➗",
      lesson: "A fraction represents a part of a whole. The numerator is the top number, and the denominator is the bottom number.",
      example: "1/2 + 1/2 = 1. When denominators are equal, add the numerators and keep the denominator.",
      questions: [
        {
          q: "What is 1/2 + 1/2?",
          options: ["1/4", "1", "1/2", "2"],
          answer: 1,
          explanation: "Two halves make one whole."
        },
        {
          q: "Which fraction is equal to 1/2?",
          options: ["2/3", "3/4", "2/4", "1/3"],
          answer: 2,
          explanation: "2/4 simplifies to 1/2."
        },
        {
          q: "What is 1/4 + 2/4?",
          options: ["3/4", "3/8", "2/4", "1/2"],
          answer: 0,
          explanation: "Add the numerators and keep the denominator: 3/4."
        },
        {
          q: "What is 3/5 - 1/5?",
          options: ["4/5", "2/5", "2/10", "1/5"],
          answer: 1,
          explanation: "Subtract the numerators: 3 - 1 = 2."
        },
        {
          q: "What is 1/2 of 20?",
          options: ["5", "15", "10", "20"],
          answer: 2,
          explanation: "Half of 20 is 20 divided by 2, which is 10."
        }
      ]
    },
    {
      name: "Decimals",
      icon: "🔢",
      lesson: "Decimals represent parts of a whole using a decimal point. The first place after the point represents tenths.",
      example: "0.5 + 0.5 = 1.0. Line up decimal points when adding decimals.",
      questions: [
        {
          q: "What is 0.5 + 0.5?",
          options: ["0.10", "1.0", "0.5", "1.5"],
          answer: 1,
          explanation: "Five tenths plus five tenths equals one whole."
        },
        {
          q: "Which is the greatest?",
          options: ["0.25", "0.5", "0.35", "0.15"],
          answer: 1,
          explanation: "0.5 is greater than the other numbers."
        },
        {
          q: "What is 2.5 + 1.2?",
          options: ["3.7", "3.2", "4.7", "2.7"],
          answer: 0,
          explanation: "2.5 + 1.2 = 3.7."
        },
        {
          q: "What is 1 - 0.25?",
          options: ["0.25", "0.50", "0.75", "1.25"],
          answer: 2,
          explanation: "1.00 - 0.25 = 0.75."
        },
        {
          q: "What is 0.2 × 10?",
          options: ["0.02", "2", "20", "0.2"],
          answer: 1,
          explanation: "0.2 multiplied by 10 equals 2."
        }
      ]
    }
  ],

  English: [
    {
      name: "Grammar",
      icon: "📚",
      lesson: "Grammar helps us arrange words into meaningful sentences. Nouns name people, places, or things. Verbs describe actions or states.",
      example: "In 'The bird flies', bird is a noun and flies is a verb.",
      questions: [
        {
          q: "Identify the noun: 'The cat sleeps.'",
          options: ["The", "cat", "sleeps", "None"],
          answer: 1,
          explanation: "Cat names an animal, so it is a noun."
        },
        {
          q: "Choose the correct sentence.",
          options: [
            "She go to school.",
            "She going school.",
            "She goes to school.",
            "She gone school."
          ],
          answer: 2,
          explanation: "'She goes to school' uses the correct verb form."
        },
        {
          q: "Which word is an adjective?",
          options: ["Quickly", "Beautiful", "Run", "Yesterday"],
          answer: 1,
          explanation: "Beautiful describes a noun."
        },
        {
          q: "Choose the plural of 'child'.",
          options: ["Childs", "Childes", "Children", "Childrens"],
          answer: 2,
          explanation: "The plural of child is children."
        },
        {
          q: "Which word is a verb?",
          options: ["Happiness", "Jump", "Blue", "Table"],
          answer: 1,
          explanation: "Jump expresses an action."
        }
      ]
    },
    {
      name: "Vocabulary",
      icon: "📝",
      lesson: "Vocabulary is the collection of words we understand and use. Synonyms have similar meanings, while antonyms have opposite meanings.",
      example: "Happy and joyful are synonyms. Hot and cold are antonyms.",
      questions: [
        {
          q: "What is a synonym of 'happy'?",
          options: ["Sad", "Joyful", "Angry", "Tired"],
          answer: 1,
          explanation: "Joyful has a meaning similar to happy."
        },
        {
          q: "What is the opposite of 'ancient'?",
          options: ["Old", "Historic", "Modern", "Past"],
          answer: 2,
          explanation: "Modern is an antonym of ancient."
        },
        {
          q: "What does 'enormous' mean?",
          options: ["Tiny", "Very large", "Very quiet", "Very quick"],
          answer: 1,
          explanation: "Enormous means extremely large."
        },
        {
          q: "Choose a synonym for 'begin'.",
          options: ["Start", "Finish", "Stop", "Close"],
          answer: 0,
          explanation: "Start and begin have similar meanings."
        },
        {
          q: "What is the opposite of 'generous'?",
          options: ["Kind", "Helpful", "Selfish", "Friendly"],
          answer: 2,
          explanation: "Selfish describes someone unwilling to share or give."
        }
      ]
    }
  ]
};

// Page names
const pageIds = [
  "homePage",
  "topicsPage",
  "lessonPage",
  "quizPage",
  "resultPage",
  "progressPage"
];

// Current quiz information
let currentSubject = "Programming Basics";
let currentTopic = topics["Programming Basics"][0];
let currentQuestion = 0;
let selectedAnswer = null;
let score = 0;
let checked = false;

const HISTORY_KEY = "saathiQuizHistory";

// Short helper to find HTML elements
function $(id) {
  return document.getElementById(id);
}

// Read saved quiz history
function getHistory() {
  try {
    const history = JSON.parse(
      localStorage.getItem(HISTORY_KEY) || "[]"
    );

    return Array.isArray(history) ? history : [];
  } catch {
    return [];
  }
}

// Save quiz history
function saveHistory(history) {
  try {
    localStorage.setItem(
      HISTORY_KEY,
      JSON.stringify(history)
    );
  } catch {
    // The current quiz still works if browser storage is unavailable.
  }
}

// Navigate between pages
function showPage(pageId) {
  pageIds.forEach(id => {
    $(id).classList.toggle("hidden", id !== pageId);
  });

  document.querySelectorAll("[data-go]").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.go === pageId
    );
  });

  if (pageId === "progressPage") {
    renderProgress();
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Fill the topic dropdown for a selected subject
function populateTopics(subject, selectId) {
  const select = $(selectId);
  select.innerHTML = "";

  topics[subject].forEach(topic => {
    const option = document.createElement("option");
    option.value = topic.name;
    option.textContent = topic.name;
    select.appendChild(option);
  });
}

// Find a topic
function findTopic(subject, topicName) {
  return topics[subject].find(
    topic => topic.name === topicName
  );
}

// Open the lesson page
function openLesson(subject, topicName) {
  const topic = findTopic(subject, topicName);

  if (!topic) return;

  currentSubject = subject;
  currentTopic = topic;

  $("lessonTitle").textContent = topic.name;
  $("lessonText").textContent = topic.lesson;
  $("lessonExample").textContent = topic.example;
  $("levelBadge").textContent = "Foundation";

  showPage("lessonPage");
}

// Display topic cards
function renderTopics() {
  const subject = $("browseSubject").value;
  const container = $("topicCards");

  container.innerHTML = "";

  topics[subject].forEach(topic => {
    const card = document.createElement("article");
    card.className = "topic-card";

    const icon = document.createElement("div");
    icon.className = "topic-icon";
    icon.textContent = topic.icon;

    const heading = document.createElement("h3");
    heading.textContent = topic.name;

    const description = document.createElement("p");
    description.textContent = topic.lesson;

    const button = document.createElement("button");
    button.className = "primary";
    button.textContent = "Open Topic →";

    button.addEventListener("click", () => {
      openLesson(subject, topic.name);
    });

    card.append(icon, heading, description, button);
    container.appendChild(card);
  });
}

// Start a new quiz
function startQuiz() {
  currentQuestion = 0;
  selectedAnswer = null;
  score = 0;
  checked = false;

  $("quizTitle").textContent =
    currentTopic.name + " Practice";

  showPage("quizPage");
  renderQuestion();
}

// Display the current question
function renderQuestion() {
  const question = currentTopic.questions[currentQuestion];

  selectedAnswer = null;
  checked = false;

  $("questionCount").textContent =
    `Question ${currentQuestion + 1} of ${currentTopic.questions.length}`;

  $("progressBar").style.width =
    `${(currentQuestion / currentTopic.questions.length) * 100}%`;

  $("questionText").textContent = question.q;
  $("feedback").textContent = "";
  $("answerBtn").disabled = true;
  $("answerBtn").textContent = "Check Answer";

  const options = $("options");
  options.innerHTML = "";

  question.options.forEach((optionText, index) => {
    const label = document.createElement("label");
    label.className = "option";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "answer";
    radio.value = index;

    const text = document.createElement("span");
    text.textContent = optionText;

    radio.addEventListener("change", () => {
      if (checked) return;

      selectedAnswer = index;
      $("answerBtn").disabled = false;

      document.querySelectorAll(".option").forEach(item => {
        item.classList.remove("selected");
      });

      label.classList.add("selected");
    });

    label.append(radio, text);
    options.appendChild(label);
  });
}

// Check the selected answer or move to the next question
function checkAnswer() {
  const question = currentTopic.questions[currentQuestion];

  if (!checked) {
    if (selectedAnswer === null) return;

    checked = true;

    const correct = selectedAnswer === question.answer;

    if (correct) {
      score++;
    }

    document.querySelectorAll(".option").forEach((label, index) => {
      const radio = label.querySelector("input");
      radio.disabled = true;

      if (index === question.answer) {
        label.classList.add("correct");
      } else if (index === selectedAnswer && !correct) {
        label.classList.add("wrong");
      }
    });

    $("feedback").textContent =
      (correct ? "Correct! " : "Not quite. ") +
      question.explanation;

    $("feedback").style.color =
      correct ? "#16865c" : "#c44747";

    $("answerBtn").textContent =
      currentQuestion === currentTopic.questions.length - 1
        ? "View Results →"
        : "Next Question →";

    return;
  }

  if (currentQuestion < currentTopic.questions.length - 1) {
    currentQuestion++;
    renderQuestion();
  } else {
    finishQuiz();
  }
}

// Recommend a learning level based on the score
function getRecommendation(finalScore, total) {
  const ratio = finalScore / total;

  if (ratio <= 0.4) {
    return {
      level: "Foundation",
      title: "Let's revise the basics.",
      message: "Read the lesson again and try the questions once more.",
      reason: `You answered ${finalScore} out of ${total} correctly. Reviewing the basics may help you understand the topic better.`
    };
  }

  if (ratio <= 0.6) {
    return {
      level: "Practice",
      title: "Let's practise a little more.",
      message: "Review the explanations and practise similar questions.",
      reason: `You answered ${finalScore} out of ${total} correctly. More practice may help strengthen your understanding.`
    };
  }

  return {
    level: "Challenge",
    title: "Good work! Try something harder.",
    message: "You can try a slightly harder example or move to another topic.",
    reason: `You answered ${finalScore} out of ${total} correctly. Your score suggests you may be ready for a harder activity.`
  };
}

// Show results and save the attempt
function finishQuiz() {
  const total = currentTopic.questions.length;
  const accuracy = Math.round((score / total) * 100);

  const recommendation = getRecommendation(score, total);

  $("resultTitle").textContent =
    accuracy >= 80
      ? "Excellent work!"
      : accuracy >= 60
        ? "Good effort!"
        : "Keep practising!";

  $("resultMessage").textContent =
    `You completed ${currentTopic.name}. Here is your result.`;

  $("scoreValue").textContent = `${score}/${total}`;
  $("accuracyValue").textContent = `${accuracy}%`;

  $("recommendationTitle").textContent =
    recommendation.title;

  $("recommendationText").textContent =
    recommendation.message;

  $("reasonText").textContent =
    recommendation.reason;

  $("levelBadge").textContent = recommendation.level;

  const history = getHistory();

  history.unshift({
    subject: currentSubject,
    topic: currentTopic.name,
    score: score,
    total: total,
    accuracy: accuracy,
    level: recommendation.level,
    date: new Date().toLocaleString()
  });

  saveHistory(history.slice(0, 50));

  showPage("resultPage");
}

// Display previous quiz results
function renderProgress() {
  const history = getHistory();

  $("roundsValue").textContent = history.length;

  if (history.length === 0) {
    $("bestValue").textContent = "—";
    $("currentLevel").textContent = "Not started";
    $("historyList").textContent =
      "Complete a quiz to see your progress.";
    return;
  }

  const best = Math.max(
    ...history.map(item => item.accuracy)
  );

  $("bestValue").textContent = `${best}%`;
  $("currentLevel").textContent = history[0].level;

  const list = $("historyList");
  list.innerHTML = "";

  history.slice(0, 10).forEach(item => {
    const row = document.createElement("div");
    row.className = "history-item";

    const details = document.createElement("div");

    const title = document.createElement("strong");
    title.textContent = `${item.subject} · ${item.topic}`;

    const date = document.createElement("p");
    date.textContent =
      `${item.date} · Recommended: ${item.level}`;

    details.append(title, date);

    const result = document.createElement("span");
    result.className = "history-score";
    result.textContent =
      `${item.score}/${item.total} (${item.accuracy}%)`;

    row.append(details, result);
    list.appendChild(row);
  });
}

// Navigation buttons
document.querySelectorAll("[data-go]").forEach(button => {
  button.addEventListener("click", () => {
    const pageId = button.dataset.go;

    if (pageId === "topicsPage") {
      renderTopics();
    }

    showPage(pageId);
  });
});

// Update topics when the home subject changes
$("subjectSelect").addEventListener("change", () => {
  populateTopics(
    $("subjectSelect").value,
    "topicSelect"
  );
});

// Start learning from the home page
$("startBtn").addEventListener("click", () => {
  const name = $("studentName").value.trim();

  try {
    if (name) {
      localStorage.setItem("saathiStudentName", name);
    }
  } catch {
    // Name saving is optional.
  }

  openLesson(
    $("subjectSelect").value,
    $("topicSelect").value
  );
});

// Update topic cards when the subject changes
$("browseSubject").addEventListener("change", renderTopics);

// Quiz buttons
$("startQuizBtn").addEventListener("click", startQuiz);
$("answerBtn").addEventListener("click", checkAnswer);
$("restartBtn").addEventListener("click", startQuiz);

// Return to topics from the results page
$("resultTopicsBtn").addEventListener("click", () => {
  $("browseSubject").value = currentSubject;
  renderTopics();
  showPage("topicsPage");
});

// Load the saved name if available
try {
  const savedName = localStorage.getItem("saathiStudentName");

  if (savedName) {
    $("studentName").value = savedName;
  }
} catch {
  // The app works even if browser storage is unavailable.
}

// Initialise the application
populateTopics("Programming Basics", "topicSelect");
renderTopics();
renderProgress();
showPage("homePage");
