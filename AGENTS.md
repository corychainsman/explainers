# AGENTS.md — Instructions for AI Agents

This file describes exactly how to add a new interactive page to this repository. Follow these instructions precisely. Do not deviate from the patterns described here.

---

## What this repo is

A React single-page application. The home screen (`/`) displays a gallery of cards. Each card links to a separate interactive page. The goal is to keep adding new pages over time. The gallery updates automatically when you register a new page.

---

## How routing works

- The app uses **HashRouter** from React Router v6.
- URLs look like: `https://corychainsman.github.io/explainers/#/page-name`
- The `#` prefix is intentional — it avoids server-side routing issues on GitHub Pages.
- Routes are defined in `src/App.jsx`.

---

## How the gallery works

- The gallery is driven by a plain JavaScript array called `pages` in `src/pages/Home.jsx`.
- Each object in the array produces one card on the home screen.
- The `path` field in each object must exactly match the `path` prop on the corresponding `<Route>` in `src/App.jsx`.

---

## Checklist: adding a new page

Complete **all three steps** or the page will be unreachable or missing from the gallery.

### Step 1 of 3 — Add to the `pages` array

**File:** `src/pages/Home.jsx`

Add a new object to the `pages` array. Rules:
- `id` must be a unique integer (increment from the highest existing value).
- `title` is a short human-readable name shown on the card.
- `description` is one sentence describing what the page does.
- `path` must start with `/` and use kebab-case (e.g. `/my-page-name`).

```js
{
  id: <next integer>,
  title: '<Page Title>',
  description: '<One sentence description>',
  path: '/<kebab-case-path>',
},
```

### Step 2 of 3 — Create the page component

**File:** `src/pages/<PascalCaseName>.jsx`
(e.g. for path `/my-page-name` create `src/pages/MyPageName.jsx`)

Minimum valid component:

```jsx
function <PascalCaseName>() {
  return (
    <div>
      <h1><Page Title></h1>
    </div>
  )
}

export default <PascalCaseName>
```

Replace with actual interactive content. There are no required props or shared layout components — each page is fully self-contained.

### Step 3 of 3 — Register the route

**File:** `src/App.jsx`

1. Add an import at the top of the file (after existing imports):
   ```jsx
   import <PascalCaseName> from './pages/<PascalCaseName>.jsx'
   ```

2. Add a `<Route>` inside the existing `<Routes>` block:
   ```jsx
   <Route path="/<kebab-case-path>" element={<<PascalCaseName> />} />
   ```

   The `path` value here must exactly match the `path` value you added in Step 1.

---

## Naming conventions

| Thing | Convention | Example |
|---|---|---|
| `path` in `pages` array | kebab-case, starts with `/` | `/sorting-demo` |
| `<Route path=` | same as above | `/sorting-demo` |
| Component file name | PascalCase + `.jsx` | `SortingDemo.jsx` |
| Component function name | PascalCase | `SortingDemo` |
| `id` in `pages` array | Unique integer, increment from max | `7` |

---

## File map (canonical locations)

| Purpose | File |
|---|---|
| Gallery card registry | `src/pages/Home.jsx` — edit the `pages` array |
| Route definitions | `src/App.jsx` — add `import` and `<Route>` |
| New page component | `src/pages/<PascalCaseName>.jsx` — create this file |
| Global styles | `src/App.css` |
| Card component (do not modify) | `src/components/PageCard.jsx` |
| Build config | `vite.config.js` |

---

## Commands

```bash
bun install          # install dependencies (run once after cloning)
bun run dev          # local dev server at http://localhost:5173
bun run build        # production build → dist/
bun run deploy       # build + publish to GitHub Pages
```

---

## Constraints

- **Do not** change `vite.config.js` base path — it must remain `/explainers/` for GitHub Pages to work.
- **Do not** switch from `HashRouter` to `BrowserRouter` — GitHub Pages cannot handle BrowserRouter without additional server config.
- **Do not** modify `src/components/PageCard.jsx` or `src/components/PageCard.css` when adding a page — these are shared and stable.
- **Do not** reuse `id` values in the `pages` array — they must be unique.
- Each page component is self-contained. There is no shared layout wrapper to extend.
