
# SAATHI — Adaptive Learning for Classes 6–10

## About the Project

SAATHI is a teacher-guided adaptive-learning prototype designed to help students learn at their own pace.

The platform changes the recommended learning activity according to the student's quiz performance. It provides explanations, practice questions and a clear reason for each recommendation.

## Features

- Student name and class selection
- Class 7 Mathematics — Fractions demo
- Multiple-choice questions
- Explanations for correct and incorrect answers
- Three adaptive learning levels:
  - Foundation
  - Practice
  - Challenge
- Score and accuracy calculation
- Progress dashboard
- Browser-based progress storage
- Responsive design for mobile and desktop

## Technologies Used

- HTML
- CSS
- JavaScript
- Browser localStorage

## How Adaptivity Works

After five questions, the system selects a recommended learning level:

| Correct Answers | Recommended Level |
| --- | --- |
| 0–2 | Foundation |
| 3 | Practice |
| 4–5 | Challenge |

The system explains why the learning path was selected.

These are prototype rules that should be tested and improved with teacher feedback.

## How to Run

1. Download or clone this repository.
2. Open the project folder in VS Code.
3. Open `index.html` in a browser, or use the Live Server extension.
4. Enter a name and start learning.

No backend, database server, installation or API key is required.

## Project Files

- `index.html` — Website structure
- `style.css` — Website design and responsive layout
- `script.js` — Questions, scoring and adaptive logic
- `README.md` — Project documentation

## Current Limitations

The working question bank currently covers Class 7 Mathematics — Fractions. Other classes and subjects need additional content before they can be considered supported.

Progress is stored in the current browser and is not synchronised across devices.

## Future Improvements

- Add content for Classes 6–10.
- Include more subjects and topics.
- Add language options.
- Develop a teacher dashboard.
- Test recommendations with teachers and students.
- Improve offline access.

## Team

SAATHI — Code Kernel '26 Adaptive Learning Challenge.
