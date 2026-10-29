# SAATHI — Adaptive Learning Prototype

**Your learning buddy — learn at your own pace.**

🔗 **Live Demo:** https://harshitha2866.github.io/SAATHI-Adaptive-Learning/

**GitHub Repository:** https://github.com/Harshitha2866/SAATHI-Adaptive-Learning

---

## About the Project

SAATHI is a simple, beginner-friendly adaptive learning prototype designed to help first-semester students learn concepts, practise questions, and understand their progress.

Students can choose a subject, read a short lesson, answer a quiz, and receive a learning recommendation based on their score.

The goal is to make learning simple, interactive, and personalised without making the application difficult to use.

## Subjects

SAATHI currently includes three subjects:

- **Programming Basics:** Variables, data types, operators, and conditions.
- **Mathematics:** Fractions and decimals.
- **English:** Grammar and vocabulary.

Each topic includes a simple explanation, an example, and multiple-choice questions.

## Features

- **Simple Navigation:** Separate screens for Home, Topics, Lesson, Quiz, Results, and My Progress.
- **Beginner-Friendly Lessons:** Short explanations with easy examples.
- **Interactive Quizzes:** Five multiple-choice questions per topic.
- **Adaptive Learning Recommendations:** Suggestions based on quiz performance.
- **Instant Feedback:** Students receive explanations after answering questions.
- **Progress Tracking:** Previous quiz scores and accuracy are saved in the browser.
- **Responsive Design:** The interface includes layouts intended for desktops, laptops, tablets, and mobile phones.
- **Online Access:** The website is hosted using GitHub Pages.

## How Adaptive Learning Works

SAATHI uses a simple score-based approach to recommend the next learning activity.

| Quiz Score | Recommended Level | Suggested Action |
|---|---|---|
| 0–2 out of 5 | Foundation | Review the basics and try again |
| 3 out of 5 | Practice | Practise similar questions |
| 4–5 out of 5 | Challenge | Try a slightly harder activity |

These recommendations are simple rules based on quiz scores. The current prototype does not use a machine-learning model.

## Technology Stack

- **HTML:** Structures the website and its screens.
- **CSS:** Styles the interface and supports responsive layouts.
- **JavaScript:** Handles navigation, quizzes, scoring, and recommendations.
- **LocalStorage:** Saves quiz history and the student's name in the current browser.
- **GitHub:** Stores the source code.
- **GitHub Pages:** Hosts the live website.

## How to Run the Project Locally

1. Clone or download this repository.
2. Open the project folder in Visual Studio Code.
3. Make sure `index.html`, `style.css`, and `script.js` are in the same folder.
4. Open `index.html` in a browser, or use the Live Server extension in VS Code.
5. Choose a subject and topic to begin learning.

No backend or database setup is required.

## Project Structure

```text
SAATHI-Adaptive-Learning/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Current Limitations

- The application uses sample learning content, not a complete first-semester syllabus.
- The learning recommendation is based on quiz scores and does not use AI.
- Quiz history is stored locally in the current browser.
- Progress does not automatically synchronise between devices.
- The prototype does not include student accounts, a backend, or a database.
- The responsive interface should be tested on different screen sizes and browsers.

## Future Improvements

- Add more first-semester topics and questions.
- Provide additional practice questions for topics students find difficult.
- Include more detailed progress summaries.
- Add teacher-reviewed learning content.

These improvements can be introduced gradually while keeping the application simple and easy to understand.

## Purpose

SAATHI demonstrates how basic web technologies can be used to build an interactive learning experience in which quiz performance guides the next suggested learning activity.

It is a learning prototype intended for demonstration and further development.

---

**SAATHI — Learn. Practise. Improve.**
