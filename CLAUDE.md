# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the app

Open `index.html` directly in a browser — no server or build step needed. An internet connection is required for the RxJS and Ramda CDN scripts.

## Architecture

Three files, no modules:

- **`index.html`** — static shell + four `<template>` elements (`tpl-list`, `tpl-learn`, `tpl-test`, `tpl-review`). The `<main id="app-root">` is empty at load; views are cloned into it dynamically.
- **`app.js`** — all application logic, loaded as a plain `<script>` tag. RxJS and Ramda are pulled from CDN and exposed as `rxjs` and `R` globals.
- **`style.css`** — all styles, including CSS custom properties, animations, and responsive layout.

### State model

Module-level `BehaviorSubject`s hold shared state that persists across tab switches:

| Subject | Purpose |
|---|---|
| `activeTab$` | Which of the four tabs is active |
| `verbsList$` | The full 69-verb dataset (never mutated) |
| `reviewHistory$` | Accumulates answered test questions |
| `testDeck$` / `currentTestIndex$` / `score$` / `answered$` / `testComplete$` | Test session state |

View-local `BehaviorSubject`s (e.g. `deck$`, `currentIndex$`, `flipped$` in Learn) are created inside each `init*View()` call and discarded on tab change.

### Tab switching

`activeTab$` drives everything. On each emission:
1. `clearSubscriptions()` unsubscribes all entries in `viewSubscriptions[]`
2. `#app-root` is cleared and the matching `<template>` is cloned into it
3. The corresponding `init*View()` function wires up RxJS streams and pushes new subscriptions into `viewSubscriptions[]`

This means any state local to a view (card position, flip state, search term) resets on tab switch. Only the module-level subjects persist.

### Data

All 69 verbs are hardcoded as `irregularVerbs` at the top of `app.js`. Each entry has: `inf`, `praet`, `part`, `exInf`, `exPraet`, `exPart`.

### External dependencies (CDN only)

- **RxJS 7.8.1** — operators are destructured from `rxjs.operators`; `fromEvent`, `BehaviorSubject`, `combineLatest`, `merge` from `rxjs`
- **Ramda 0.29.1** — available as `R`

### Gotchas

- `subRestart` referenced in `initTestView`'s `viewSubscriptions.push(...)` is not declared in that function — it appears to be a bug (missing local `fromEvent(btnRestartTest, 'click')` subscription that calls `restartTest()`).
- Voice input (Web Speech API) only works in Chrome, Edge, and Safari. Microphone buttons are hidden automatically in unsupported browsers.
- `testDeck$` and `reviewHistory$` are module-level, so restarting a test resets them via `restartTest()`, but navigating away and back to the Test tab does not restart the test — it resumes mid-session.
