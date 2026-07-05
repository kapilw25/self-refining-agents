# Baselines

Each baseline is a package exposing an `Agent` with:

| Method | Signature | Notes |
|---|---|---|
| `watch(clip)` | `-> None` | ingest a practice clip (may update `self.library`) |
| `solve(clip)` | `-> str` (code) | produce skill code for a held-out clip |
| `last_used_stored_skill` | `bool` attr | set by `solve` for reuse-rate |

| Baseline | §  | Behavior | Expected curve |
|---|---|---|---|
| `zero_shot_cap` | 3.1.1 | VLM caption → LLM code, **no memory** | ▬ flat |
| `self_repair` | 3.1.2 | + execution-feedback repair loop | ◹ small rise (sim) |
| `skill_library` | 3.1.3–5 | Voyager/ASPIRE-style, **compounds** | ◥ rising |

Reuse open code: [CaP](https://github.com/google-research/google-research/tree/master/code_as_policies) · [Voyager](https://github.com/MineDojo/Voyager) · [CaP-X](https://arxiv.org/abs/2603.22435).
