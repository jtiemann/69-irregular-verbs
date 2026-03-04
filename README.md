# 69 Irregular Verbs 🇩🇪

A sleek, responsive, single-page application built to help B1 German learners master the top 69 most common irregular verbs.

This project uses a clean architectural approach, managing state with RxJS and utilizing functional programming patterns with Ramda.

## Features

- **List View:** Browse all 69 verbs with their Infinitive, Präteritum (Simple Past), and Partizip II (Past Participle) forms. Includes a real-time search filter and the ability to toggle B1-level example sentences for context.
- **Learn View:** A digital flashcard deck. Flip cards to reveal the conjugations and their conversational examples. Includes navigation and shuffling.
- **Test Mode:** Test your knowledge! Generates a random 10-verb quiz.
  - **Voice Input:** Use the microphone icon to speak your answers using the Web Speech API (supported browsers only).
  - **Visual & Audial Feedback:** Enjoy satisfying CSS animations and Web Audio API chimes for correct and incorrect answers.
- **Review Tab:** At any point during or after a test, review your past answers to see exactly what you got wrong and the correct corrections.

## Tech Stack

This project is built purely with vanilla web technologies and lightweight CDN dependencies—no build steps or bundlers required.

- **HTML5 & CSS3:** Semantic structure with custom CSS variables, flexbox/grid layouts, and keyframe animations.
- **JavaScript (ES6+):** Core application logic.
- **[RxJS](https://rxjs.dev/):** Used for robust, reactive state management across different views (handling test scores, review histories, and UI state without full page reloads).
- **[Ramda](https://ramdajs.com/):** Used for clean data processing and functional composition (filtering, mapping, and piping).

## How to Run

Because this app uses ES6 Modules (or uses browser APIs that require a secure context like the Web Speech API), it is best run through a local HTTP server rather than opening the `index.html` file directly from your file system.

1. Clone the repository:
   ```bash
   git clone https://github.com/jtiemann/69-irregular-verbs.git
   ```
2. Navigate to the project directory:
   ```bash
   cd "69-irregular-verbs"
   ```
3. Start a local server. If you have Node.js installed, you can use `npx`:
   ```bash
   npx serve .
   ```
   Or, if you use Python:
   ```bash
   python -m http.server 3000
   ```
4. Open your browser and go to `http://localhost:3000`

## Disclaimer
The Web Speech API requires microphone permissions and relies on the browser's implementation. It works best in Chrome, Edge, and Safari.
