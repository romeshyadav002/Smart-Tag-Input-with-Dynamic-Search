# 🧪 Test Plan: Smart Tag Input Component

## 🔍 Objective
The goal of this test plan is to validate the functionality, usability, and accessibility of the `SmartTagInput` component. The component allows users to search, select, and manage tags with a dynamic autocomplete dropdown and supports keyboard and mouse interactions.

---

## ✅ Scope of Testing

- **Functionality Testing**
- **UI and UX Behavior**
- **Keyboard Accessibility**
- **Edge Case Handling**
- **API Interaction (mocked)**

---

## 🧪 Tools Used

- [Vitest](https://vitest.dev/) - Unit and integration testing framework.
- [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/) - For simulating user interaction and testing component behavior.

---

## 🧬 Test Cases Covered

| Test Case Description | Covered |
|------------------------|---------|
| Render input field and placeholder | ✅ |
| Fetch suggestions on typing | ✅ |
| Display suggestions | ✅ |
| Select tag on click | ✅ |
| Remove selected tag by clicking 'x' | ✅ |
| Select tag using keyboard navigation (Arrow keys + Enter) | ✅ |
| Remove last tag using Backspace key when input is empty | ✅ |
| Hide suggestions when pressing Escape | ✅ |
| Prevent duplicate tag selection | ✅ |
| Show loading state while fetching | ✅ |
| Show error message if API fails | ✅ |
| No suggestions shown if API returns an empty list | ✅ |
| Highlighted suggestion wraps correctly on key press | ✅ |

---

## 🧑‍💻 How to Run Tests

### 🏗️ Step 1: Install Dependencies
```bash
npm install
# or
yarn
```

### 🧪 Step 2: Run Tests using Vitest
```bash
npx vitest run
# or for interactive UI
npx vitest
```

---

## 📝 Notes

- The tests use a mocked `fetchTags` API to simulate network behavior.
- Timeout, empty results, and tag selection states are all covered.
- Integration between parent and child components (`SmartTagInput`, `TagItem`, and `SuggestionsList`) is validated.

---

## 📚 References

- [React Testing Library Docs](https://testing-library.com/docs/)
- [Vitest Docs](https://vitest.dev/)
- [JSDOM Environment](https://github.com/jsdom/jsdom)