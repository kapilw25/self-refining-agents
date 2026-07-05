"""SkillStream metrics. The signature one is `aulc` (self-improvement)."""
from typing import List, Sequence


def success_at_k(successes: Sequence[bool]) -> float:
    """Fraction of k rollouts that satisfied the sim success predicate."""
    return sum(bool(s) for s in successes) / max(len(successes), 1)


def aulc(clips_seen: Sequence[int], heldout_success: Sequence[float]) -> float:
    """⭐ Area Under the Learning Curve — normalized trapezoidal area of
    held-out success vs. #clips practiced. Flat curve → low; rising → high.

    clips_seen: checkpoints, e.g. [0, 25, 50, 100]
    heldout_success: held-out success rate at each checkpoint (0..1)
    """
    xs, ys = list(clips_seen), list(heldout_success)
    if len(xs) < 2:
        return float(ys[0]) if ys else 0.0
    area = 0.0
    for i in range(1, len(xs)):
        area += (xs[i] - xs[i - 1]) * (ys[i] + ys[i - 1]) / 2.0
    return area / (xs[-1] - xs[0])  # normalize to [0,1]


def reuse_rate(solved: Sequence[bool], used_stored_skill: Sequence[bool]) -> float:
    """% of solved tasks that reused a skill already in the library."""
    n = sum(bool(s) for s in solved)
    return sum(bool(s and u) for s, u in zip(solved, used_stored_skill)) / max(n, 1)


def tokens_to_first_success(token_log: List[int], successes: List[bool]) -> int:
    """Cumulative tokens spent up to (and including) the first success; -1 if none."""
    total = 0
    for tok, ok in zip(token_log, successes):
        total += tok
        if ok:
            return total
    return -1
