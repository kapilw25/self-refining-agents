# Self-Refining Code Agents — A Survey

A survey and **living catalog** of LLM agents that **write, execute, and self-refine code** — across software engineering, robotics, reinforcement learning, and scientific discovery — anchored on [ASPIRE](https://arxiv.org/abs/2607.00272).

🔗 **Live site:** `https://kapilw25.github.io/<repo-name>/`

## What's inside (`docs/`)

| Page | Contents |
|---|---|
| `index.html` | Landing — survey card + living-catalog card + figure index |
| `survey.html` | The survey: unifying template (Fig 1), **canonical taxonomy tree** (Fig 2, ~50 systems), paradigm-shift table, six-axis mechanism taxonomy, capability matrix, related-survey landscape |
| `catalog.html` | Sortable / filterable catalog of ~50 systems, tagged by domain × mechanism (**F** feedback · **S** search · **M** memory) × year × benchmark |

Everything is a **self-contained static site** — no build step, no server. Plain HTML/CSS/vanilla JS with light/dark themes.

## View locally

Open `docs/index.html` directly in a browser, or serve it:

```bash
cd docs && python3 -m http.server 8000   # → http://localhost:8000
```

## Publish on GitHub Pages

1. Push this repo to GitHub.
2. **Settings → Pages → Build and deployment → Source: Deploy from a branch.**
3. **Branch: `main`, Folder: `/docs`** → Save. Live in ~1 minute.

## Notes

- Citation counts are Semantic Scholar snapshots (drift daily; lower than Google Scholar).
- Catalog metadata is best-effort — unlinked rows fall back to a web search; **verify before citing**.
- The full text of source papers is **not** redistributed here; all systems link to their original sources.
