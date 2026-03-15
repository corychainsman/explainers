# Explainers

A React gallery app that serves as a jumping-off point for multiple interactive pages. The home screen shows a grid of cards — one per page — and clicking a card navigates to that page. New pages are added incrementally; placeholders hold the spot until they're built out.

**Live site:** https://corychainsman.github.io/explainers/

---

## Stack

| Tool | Role |
|---|---|
| [Bun](https://bun.sh) | Runtime & package manager |
| [Vite](https://vitejs.dev) | Dev server & bundler |
| [React 18](https://react.dev) | UI framework |
| [React Router v6](https://reactrouter.com) | Client-side routing (HashRouter) |
| [gh-pages](https://github.com/tschaub/gh-pages) | GitHub Pages deployment |

HashRouter is used (URLs like `/#/page-name`) so GitHub Pages works without any server config.

---

## Local development

```bash
bun install      # install dependencies
bun run dev      # start dev server at http://localhost:5173
bun run build    # production build → dist/
bun run deploy   # build + push to gh-pages branch (publishes to GitHub Pages)
```

---

## How to add a new page

Adding a page is a three-step process:

### Step 1 — Register the card in the gallery

Open `src/pages/Home.jsx` and add an entry to the `pages` array:

```js
const pages = [
  // existing entries...
  {
    id: 7,                        // must be unique
    title: 'My New Page',         // displayed as the card heading
    description: 'What it does',  // one-line description shown on the card
    path: '/my-new-page',         // URL hash path (must start with /)
  },
]
```

### Step 2 — Create the page component

Create a new file at `src/pages/MyNewPage.jsx`:

```jsx
function MyNewPage() {
  return (
    <div>
      <h1>My New Page</h1>
      {/* your interactive content here */}
    </div>
  )
}

export default MyNewPage
```

### Step 3 — Add a route

Open `src/App.jsx` and import your component, then add a `<Route>`:

```jsx
import MyNewPage from './pages/MyNewPage.jsx'

// inside <Routes>:
<Route path="/my-new-page" element={<MyNewPage />} />
```

That's it. The card on the home screen will now navigate to your new page.

---

## Project structure

```
explainers/
├── index.html                  # HTML entry point
├── vite.config.js              # Vite config (sets base path for GitHub Pages)
├── package.json                # Scripts and dependencies
└── src/
    ├── main.jsx                # React root mount
    ├── App.jsx                 # Router setup — add new <Route> entries here
    ├── App.css                 # Global reset/base styles
    ├── pages/
    │   ├── Home.jsx            # Gallery grid — add new page entries here
    │   ├── Home.css            # Gallery layout styles
    │   └── [YourPage].jsx      # One file per interactive page
    └── components/
        ├── PageCard.jsx        # Individual gallery card (title, description, button)
        └── PageCard.css        # Card styles
```

---

## Deployment

The site is hosted on GitHub Pages from the `gh-pages` branch. To publish:

```bash
bun run deploy
```

This runs `vite build` then pushes the `dist/` folder to the `gh-pages` branch. GitHub Pages serves that branch automatically. The `base: '/explainers/'` setting in `vite.config.js` ensures all asset paths are correct under the `/explainers/` subpath.

---

## For AI agents

See [AGENTS.md](./AGENTS.md) for a precise, machine-readable description of how to add pages to this repo.
