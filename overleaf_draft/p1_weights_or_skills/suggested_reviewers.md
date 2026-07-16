# Suggested Reviewers: "Weights or Skills?" (ACM Computing Surveys)

> For the ScholarOne "suggested reviewers" field (CSUR recommends 4+). All candidates were
> web-verified against 2025-2026 affiliations and screened against the authors' institutions
> (UC Berkeley, Google, Google DeepMind). **Before entering into ScholarOne you must:**
> - [ ] Confirm each person's CURRENT affiliation and look up their email from their lab page
>       (affiliations in this field change often).
> - [ ] Confirm none is your advisor, recent co-author, or close collaborator (only you can check
>       this; it is the COI dimension the web scan cannot see).
> - [ ] Keep the final list spread across institutions to avoid a one-lab-network flag.

## Recommended slate (6, COI-clean and well spread)

This subset covers both poles and all six coverage areas, spans six institutions across three
regions, and deliberately **avoids the NVIDIA / GEAR and Physical Intelligence entanglements**
flagged below (important because the manuscript spotlights ASPIRE, an NVIDIA GEAR system).

| # | Name | Current affiliation | Reviews (coverage area) | Representative work | Link |
|---|------|---------------------|-------------------------|---------------------|------|
| 1 | **Xiaolong Wang** | UC San Diego | VLA / generalist policies (weights pole) | GenSim; generalist manipulation policies | https://xiaolonw.github.io/ |
| 2 | **Animesh Garg** | Georgia Tech | code-as-policy / LLM robotics (skills pole) | ProgPrompt (2022/23) | https://animesh.garg.tech/ |
| 3 | **Dinesh Jayaraman** | Univ. of Pennsylvania (GRASP) | LLM reward design / LLM+RL | Eureka (2024) | https://www.seas.upenn.edu/~dineshj/ |
| 4 | **Benjamin Eysenbach** | Princeton | unsupervised skill discovery / HRL | DIAYN (2019) | https://ben-eysenbach.github.io/ |
| 5 | **Jan Peters** | TU Darmstadt + DFKI (Germany) | hierarchical RL / skill libraries; senior gravitas | Reinforcement Learning in Robotics: A Survey (2013) | http://www.jan-peters.net/ |
| 6 | **Huazhe Xu** | Tsinghua (IIIS, China) | LLM-for-robot code / skill discovery | GenSim (ICLR 2024) | http://hxu.rocks/ |

**Regions:** US (UCSD, Georgia Tech, UPenn, Princeton), Europe (TU Darmstadt), Asia (Tsinghua).
**Poles covered:** weights (Wang), skills/code-as-policy (Garg, Xu), reward synthesis (Jayaraman),
skill discovery / HRL (Eysenbach, Peters).

## Strong but ENTANGLED with a surveyed system (use only after checking)

- **Jim (Linxi) Fan** (NVIDIA, co-lead GEAR / GR00T) covers the agentic/self-improving pole
  (Voyager). But **GEAR is the lab behind ASPIRE**, which your abstract spotlights as "the
  frontier." Suggesting the head of that lab to review a paper that praises its system is an
  independence problem. Recommend **not** listing him.
- **Yuke Zhu** (UT Austin + part-time NVIDIA) is the natural benchmark/LIBERO reviewer for the
  weights pole, but the NVIDIA appointment is the same GEAR/ASPIRE orbit. List only if you are
  comfortable with that tie; otherwise use Wang (already in the slate) for the weights pole.
- **Chelsea Finn** (Stanford; co-founder, Physical Intelligence) is a top VLA reviewer (Octo), but
  Physical Intelligence's pi0 is a surveyed method and she has RT-X co-authorships that may overlap
  your author set. Verify before listing.

## Clean alternates (swap in if you need more or hit a personal COI)

- **Deepak Pathak** (CMU) - cross-embodiment transfer + self-supervised skills.
- **Abhishek Gupta** (Univ. of Washington) - unsupervised skill discovery / RL.
- **Osbert Bastani** (UPenn) - program synthesis bridging code-as-policy and reward-code (use as a
  substitute for Jayaraman, not in addition; same institution).
- **Dorsa Sadigh** (Stanford) - VLA + human-robot interaction (verify: has an RT-H DeepMind tie).

## Explicitly EXCLUDED for conflict of interest (do not list)

- **Sergey Levine** (UC Berkeley) - author institution, and the most-entangled figure across
  RT-2 / Octo / OpenVLA / pi0.
- **Karol Hausman** (Physical Intelligence; ex-Google DeepMind) - direct author of surveyed methods
  (RT-1/RT-2/pi0).
- Any **Google DeepMind** authors of Code-as-Policies / RT-X (author-institution COI).

*Source: web-verified 2025-2026 affiliations; no email addresses are pre-filled (look them up from
the lab pages so you enter current, correct addresses).*
