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

## 🛡️ Security Enhancements

**Decision**: Ensure secure handling of user input and overall app behavior.  

**Context**:  
Security is critical, especially when handling dynamic input and rendering content based on user input.

**Measures Taken**:
- Used React’s built-in escaping mechanisms to prevent XSS attacks.
- Validated all user input at both client and server levels.
- Avoided using `dangerouslySetInnerHTML`.
- Secured API endpoints with proper access control.
- Avoided exposing sensitive data in the frontend.
- Applied linting and static analysis tools to catch unsafe code patterns.
- Kept third-party dependencies updated to avoid known vulnerabilities.

---

## ⚡ Performance Optimization

**Decision**: Optimize performance through rendering strategies, memoization, and resource management.

**Context**:  
Performance directly affects user experience and SEO, especially for interactive components.

**Techniques Used**:
- 🔄 **Caching**: Applied caching where applicable, including static assets and API responses.
- 🌐 **Rendering Strategy**:
  - Used SSR (Server-Side Rendering) for SEO-relevant content.
  - Used CSR (Client-Side Rendering) selectively for user-interactive components.
- 🧠 **Memoization**:
  - Memoized frequently re-rendered components using `React.memo`.(Didn't used for this)
  - Used `useCallback` and `useMemo` to prevent unnecessary re-renders.
- 📊 **Performance Audits**:
  - Verified performance using:
    - Chrome DevTools → Network tab to analyze resource load times.
    - Chrome DevTools → Performance tab for CPU and rendering traces.
    - Lighthouse reports to measure key metrics.
- 📈 **Core Web Vitals**:
  - Verified and improved key metrics:
    - **FCP (First Contentful Paint)** – reduced through minimal critical CSS and deferring non-essential JS.
    - **LCP (Largest Contentful Paint)** – improved by optimizing image size and lazy loading.
    - Reduced TBT (Total Blocking Time) and CLS (Cumulative Layout Shift).

**Outcome**:
- Page load speed improved significantly.
- Lower render times and improved interaction speed.
- Good Lighthouse scores across performance, accessibility, and best practices.

---

## 🎨 Why Tailwind CSS?

**Decision**: Use Tailwind CSS for component styling.  
**Context**: Required rapid UI development with utility-first design.

**Alternatives Considered**:
- Styled Components – more flexibility but slower development time.
- CSS Modules – scoped styling, but more verbose and repetitive.

**Consequences**:
- Faster prototyping.
- Tight integration with Next.js App Router.

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
