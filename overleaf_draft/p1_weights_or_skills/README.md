# Overleaf draft — *Weights or Skills?* survey

Modular LaTeX skeleton in **ACM Computing Surveys (CSUR)** format (`acmart`, `acmsmall`) — thin `main.tex` shell that `\input`s numbered section files. **Compile-verified locally: 7 pages, bibtex clean, 0 undefined citations.**

Three taxonomy figures are built with the LaTeX **`forest`** package in the exact Fig2 (prompt-engineering survey) style. Compiled `main.pdf` is committed (pages 2/6/7 hold the forests), and each forest is also exported to `figures/img/taxonomy_{main,3_1,3_4}_compiled.png` for quick eyeballing against the source `literature/papers_reference/taxonomy_*.png`.

## Structure

| Path | Role |
|---|---|
| `main.tex` | shell — class, packages, **shared forest style**, author block, `\input` order, bibliography |
| `refs.bib` | one bibliography (15 starter entries; all cited keys resolve) |
| `sections/0_abstract … 10_conclusion` | one file per section — **each co-author edits their own** |
| `figures/fig_taxonomy_main.tex` | `forest` — the main map (§3.1–§3.6) |
| `figures/fig_taxonomy_31.tex` | `forest` — §3.1 deep-dive funnel (13→6→5→3→3) |
| `figures/fig_taxonomy_34.tex` | `forest` — §3.4 skills pole |
| `figures/fig_architectures.tex` | `tikz` — the self-improvement loop (§3.1.5) |
| `figures/img/` | raster / pdf assets |
| `tables/tab_capability_matrix.tex` | one exemplar per camp |
| `tables/tab_related_surveys.tex` | related-surveys landscape |
| `references/` | the two **source** taxonomy figures we model on (P1, P2) + target PNGs |
| `styles/` | venue `.sty`/`.bst` — add once a venue is chosen |

## Use on Overleaf

1. Zip and upload the whole `p1_weights_or_skills/` folder (New Project → Upload Project).
2. Set **`main.tex`** as the main document, **Compiler → pdfLaTeX**.
3. Recompile — Overleaf runs the full `pdflatex → bibtex → pdflatex ×2` cycle automatically. 

## Conventions

- **Shared forest style** lives once in `main.tex` (`\forestset{default preamble={…}}`) — every taxonomy tree inherits `grow=east, reversed, forked edges` + the 6 domain colours (`dcode`, `dvla`, `dreward`, `dskill`, `dtransfer`, `dbench`).
- Forest leaves currently use plain-text `(Author, Year)` so figures are bib-independent; swap for `\citep{key}` as `refs.bib` fills in.
- Web ↔ paper mapping mirrors `docs/`: §2 skill-stack → `1_intro`, the map → `2_taxonomy`, §3.1 → `3_code_as_policy`, §3.4 → `6_skill_libraries`, §7 → `9_open_problems`.

## Venue (open decision)

Currently a neutral `article` class. Given the arXiv survey rule, target a real venue first (IEEE Access = fast; ACL/EMNLP = reuse the `acl.sty` the reference papers ship), then drop its `.sty`/`.bst` into `styles/` and switch `\documentclass`.
