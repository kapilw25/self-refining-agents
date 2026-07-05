# How Robots Learn — A Survey of Robot-Learning Techniques

A survey and **living catalog** of robot-learning techniques for **Physical AI** — vision-language-action policies, code-as-policy, reward synthesis, self-evolving skill libraries, and cross-embodiment transfer — anchored on [ASPIRE](https://arxiv.org/abs/2607.00272) (NVIDIA GEAR, 2026).

The thesis: two ways to build a generalist robot — **ship weights** (end-to-end VLA) vs **ship code + skills**. ASPIRE is the frontier of the second camp, the one system that writes, debugs, and *compounds* its own skills.

🔗 **Live site:** `https://kapilw25.github.io/self-refining-agents/`

## What's inside (`docs/`)

| Page | Contents |
|---|---|
| `index.html` | **The survey** — opens with the canonical **taxonomy tree** (~47 physical-AI systems in 6 branches §3.1–§3.6, the hero figure), then the loop, the ship-weights-vs-code thesis table, mechanism taxonomy, a capability matrix (one exemplar per camp), and the related-survey landscape |
| `catalog.html` | Sortable / filterable catalog of ~47 systems, tagged by domain × mechanism (**F** feedback · **S** search · **M** memory) × year × benchmark |

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
