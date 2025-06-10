# 🧠 Decision Log

## ✅ Framework: **Next.js (App Router with TypeScript)**

**Reason for choosing Next.js**:
- 🔁 **Server-Side Rendering (SSR)** & **Static Site Generation (SSG)** out of the box.
- 🧱 **App Router architecture** improves routing and layout composition.
- 🗂️ **Built-in file-system-based routing**, layouts, and loading/error boundaries.
- ⚙️ Excellent **TypeScript** support and automatic code splitting.
- 🚀 Optimized for **performance**, **SEO**, and **developer experience**.

**References**:
- [Next.js Documentation](https://nextjs.org/docs)
- [App Router Intro](https://nextjs.org/docs/app/building-your-application/routing)

---

## ✅ Library: **React**

**Reason for choosing React**:
- 🧠 Component-based architecture encourages reusable UI.
- ⚛️ **Virtual DOM** for efficient rendering.
- 🔒 **Security**: React escapes inputs by default to prevent XSS (Cross-Site Scripting).
- ⏱️ **Defer scripts** naturally in its hydration and bundling process when used with Next.js.
- 📚 Large ecosystem, community support, and strong integration with modern tooling.

**References**:
- [React Docs – Security](https://react.dev/learn/security)
- [React Docs](https://react.dev/)

---

## 🎨 Styling: **Tailwind CSS**

**Why Tailwind**:
- 🎨 Utility-first classes make it quick to prototype and scale.
- 🧩 Customizable theme and responsive design built-in.
- 🏎️ Small final bundle due to tree-shaking of unused classes.
- 💨 Seamless integration with Next.js + React.

**References**:
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

## 🔌 API Layer: **Mocked API with Timeout**

**Why mocking the API**:
- 🧪 Isolates UI development and avoids backend dependency.
- ⏱️ Introduces artificial delay to simulate realistic async behavior (UX testing).
- 🔁 Easy to swap with a real backend once available.

**Example**:
```ts
export async function fetchTags(query: string): Promise<Tag[]> {
  return new Promise(resolve =>
    setTimeout(() => {
      resolve([{ id: 1, name: 'Electronics' }, { id: 2, name: 'Home Goods' }]);
    }, 500)
  );
}
```

---

## ✅ Test Framework: **Vitest + React Testing Library**

- 🧪 Fast and modern test runner built for Vite.
- 🔍 DOM-based testing approach with RTL encourages accessibility-first testing.
- ✅ Great TypeScript support.

**References**:
- [Vitest Docs](https://vitest.dev/)
- [Testing Library Docs](https://testing-library.com/docs/)
