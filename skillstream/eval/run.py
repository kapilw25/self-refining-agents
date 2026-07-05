#!/usr/bin/env python3
"""SkillStream streaming harness (skeleton).

Streams the `practice` split (sim tasks) one at a time; at each checkpoint evaluates
on the frozen `heldout` split and records held-out success. Produces the compounding
curve + AULC — the benchmark's signature (generalizes ASPIRE Fig 5b).

    python eval/run.py --agent baselines/skill_library --manifest data/sample_manifest.jsonl
"""
import argparse
import importlib
import json

from metrics import aulc, success_at_k, reuse_rate  # noqa: E402

CHECKPOINTS = [0, 25, 50, 100]  # # practice tasks at which to eval held-out


def load(path):
    with open(path) as f:
        return [json.loads(l) for l in f if l.strip()]


def load_agent(spec):
    """spec = 'baselines/skill_library' → import its Agent.
    An Agent implements: .watch(task) -> None ; .solve(task) -> policy ; .library (opt)."""
    mod = importlib.import_module(spec.replace("/", ".") + ".agent")
    return mod.Agent()


def evaluate_heldout(agent, heldout):
    """Run the agent's current library/policy over frozen held-out sim tasks.
    Returns (success_rate, reuse_rate_value). TODO: wire the sim executor."""
    succ, reused = [], []
    for task in heldout:
        policy = agent.solve(task)               # uses library if present
        ok = run_in_sim(policy, task)            # TODO: LIBERO/Robosuite/ManiSkill
        succ.append(ok)
        reused.append(getattr(agent, "last_used_stored_skill", False))
    return success_at_k(succ), reuse_rate(succ, reused)


def run_in_sim(policy, task):
    """TODO: execute `policy` against task['sim_task'] over task['seed_range'] and
    return success bool (per the suite's success predicate)."""
    raise NotImplementedError("wire sim executor (LIBERO / Robosuite / ManiSkill2)")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--agent", required=True)
    ap.add_argument("--manifest", required=True)
    args = ap.parse_args()

    data = load(args.manifest)
    practice = [t for t in data if t["split"] == "practice"]
    heldout = [t for t in data if t["split"] == "heldout"]
    agent = load_agent(args.agent)

    seen, curve = [], []
    for n in CHECKPOINTS:
        while len(seen) < n and len(seen) < len(practice):
            agent.watch(practice[len(seen)])     # refine library from this task
            seen.append(practice[len(seen)])
        sr, _ = evaluate_heldout(agent, heldout)
        curve.append(sr)
        print(f"[{args.agent}] tasks={len(seen):>4}  heldout_success={sr:.3f}")

    print(f"AULC = {aulc(CHECKPOINTS, curve):.3f}")


if __name__ == "__main__":
    main()
