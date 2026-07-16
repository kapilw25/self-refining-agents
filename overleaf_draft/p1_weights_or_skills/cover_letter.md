# Cover Letter: ACM Computing Surveys (CSUR)

> **This letter is editor-facing.** The Editor-in-Chief and handling editor see it; reviewers do
> not, so it names the authors even though the manuscript PDF is double-anonymized. It is **not**
> part of the Overleaf/LaTeX upload; paste it into ScholarOne Manuscript Central (or attach as PDF).
>
> **Before you send, fill in:**
> - [ ] Corresponding author name, affiliation, email
> - [ ] 4+ suggested reviewers (names, affiliations, emails), broad across both poles, no collaborators
> - [ ] Confirm the conflict-of-interest line (and that no author is on ASPIRE / ENPIRE / RoboClaw,
>       which the manuscript names as occupying the self-improving cell)

---

**Date:** July 2026
**To:** The Editor-in-Chief, ACM Computing Surveys
**Re:** Submission of *"Weights or Skills? A Survey of Robot-Learning Techniques: from Action-Predicting Weights to Robots that Write their Own Skills"*
**Article type:** Survey
**Corresponding author:** [Name, affiliation, email]

Dear Editor-in-Chief,

We submit *"Weights or Skills?"* for consideration as a Survey in ACM Computing Surveys. The manuscript organizes the fast-moving field of robot learning along a single original axis, **what a system ships**: a generalist policy can ship frozen neural-network **weights** that map observations directly to actions (the vision-language-action, or VLA, family), or it can ship executable **skills** as code that the robot writes, debugs, and improves from its own experience (the code-as-policy family). To our knowledge, no existing survey organizes the field by this weights-versus-skills contrast.

This structure is needed because the field is fragmenting into two research cultures that rarely cite each other, and recent surveys track only one pole at a time. Placing both poles on a common axis makes them directly comparable on what they ship, where they are evaluated, and whether they keep improving after deployment. On top of that axis the survey makes two contributions that, to our knowledge, no prior survey provides: (i) it arranges code-as-policy methods by **degree of self-improvement**, giving operational definitions of the feedback, memory, and search mechanisms with necessary-and-sufficient conditions for each rung, and it identifies the sparsely populated cell in which execution feedback, persistent skill memory, and evolutionary search combine into one open-ended loop, which only a few very recent systems occupy; and (ii) it connects the taxonomy to the emerging **robot skill economy**, in which skill marketplaces distribute one-tap skills across robots, surfacing open problems in adaptation, cross-embodiment portability, provenance, safety verification, and standardisation.

We have checked CSUR's recent volumes and the wider literature to position the work. The nearest CSUR surveys address adjacent but distinct territory: robot navigation via foundation language models (pipeline-stage scope, navigation only), embodied intelligence as a synergy of morphology, action, perception, and learning (morphology-centric), world models, and an earlier comprehensive survey of hierarchical reinforcement learning that predates the LLM code-as-policy shift. Beyond CSUR, the strongest incumbents each cover a single pole or a single sub-area: the vision-language-action survey treats only the weights pole; the recent self-evolving-agents surveys treat the self-improvement pole but are embodiment-agnostic rather than robot-specific; and surveys of LLM-enhanced reinforcement learning, cross-domain policy transfer, and generative robotic manipulation each own one of our supporting sub-sections. We cite these as the authorities for their sub-areas and frame our value as the cross-cutting synthesis plus the two novel contributions above, not as fresh coverage of any one topic. We found no survey, in CSUR or elsewhere, that organizes robot learning by weights versus skills, arranges code-as-policy by degree of self-improvement, or treats the robot skill economy.

The treatment is comprehensive. It draws on 311 references and 302 systems: 77 placed in the taxonomy and compared across six per-family tables, plus 225 further works catalogued in a landscape appendix, spanning January 2016 to July 2026 and assembled by a documented two-pass, PRISMA-style methodology with explicit inclusion and core-versus-appendix placement criteria. The package includes an original taxonomy figure in the introduction, a comparison table that organizes the surveyed literature, a family-by-six-axes spec matrix, and an open-problems agenda whose future directions are anchored on measurable quantities and named testbeds.

The manuscript is 40 pages in the `acmsmall` format and is prepared double-anonymous for review. The work is original, has not been published previously, and is not under consideration elsewhere. The authors declare no conflicts of interest [confirm before sending]. We suggest the following reviewers, chosen for breadth across both poles and free of collaboration conflicts: [list 4+ names, affiliations, emails]. Thank you for considering the manuscript.

Sincerely,
[Authors, on behalf of all co-authors]
