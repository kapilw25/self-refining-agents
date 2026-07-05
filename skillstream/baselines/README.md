# Baselines

Each baseline is a package exposing an `Agent` with:

| Member | Signature | Notes |
|---|---|---|
| `watch(task)` | `-> None` | ingest a practice task (may update `self.library`) |
| `solve(task)` | `-> policy` | produce a policy for a held-out task (code / weights) |
| `last_used_stored_skill` | `bool` attr | set by `solve`, for reuse-rate |

## Core track (code-as-policy)

| Baseline | § | Behavior | Expected curve |
|---|---|---|---|
| `zero_shot_cap` | 3.1.1 | LLM writes code, **no memory** | ▬ flat |
| `self_repair` | 3.1.2 | + execution-feedback repair loop | ◹ small rise |
| `skill_library` | 3.1.3–5 | Voyager/**ASPIRE**-style, **compounds** | ◥ rising (reference top) |

## Cross-paradigm track (what ASPIRE didn't compare)

| Baseline | § | Paradigm |
|---|---|---|
| `eureka` | 3.3 | LLM reward synthesis → RL |
| `diayn` | 3.4.1 | unsupervised skill discovery (RL) |
| `openvla` | 3.2 | end-to-end VLA weights (foil) |

Reuse open code: [CaP](https://github.com/google-research/google-research/tree/master/code_as_policies) · [Voyager](https://github.com/MineDojo/Voyager) · [CaP-X](https://arxiv.org/abs/2603.22435) · [Eureka](https://github.com/eureka-research/Eureka).
