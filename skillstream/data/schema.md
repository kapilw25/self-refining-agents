# Task-stream manifest schema

One JSON object per line (`.jsonl`). A **stream of sim tasks** — no video. The agent
practices on `split=practice` in order, then is scored on the frozen `split=heldout`.

| Field | Type | Req | Notes |
|---|---|---|---|
| `task_id` | str | ✓ | stable id, e.g. `ss_lib_000123` |
| `suite` | enum | ✓ | `LIBERO` \| `Robosuite` \| `BEHAVIOR-1K` \| `MetaWorld` \| `ManiSkill2` |
| `sim_task` | str | ✓ | env id, e.g. `libero_pour_v0` |
| `embodiment` | str | ✓ | `franka` \| `ur5` \| `bimanual` |
| `lang` | str | ✓ | instruction, e.g. `"pour water into the cup"` |
| `split` | enum | ✓ | `practice` \| `heldout` |
| `seed_range` | [int,int] | ✓ | eval seeds, e.g. `[1, 50]` |
| `comp_id` | str | — | verb×object combo id — for the **compositional** held-out split |
| `ref_skill` | path | — | reference program (optional), e.g. `refs/pour.py` |

Splits are **disjoint by task instance**; `heldout` is frozen and never seen during the
practice stream. Held-out is partitioned into: in-distribution, **compositional** (novel
verb×object), and **cross-suite** (practiced on one suite, tested on another).
