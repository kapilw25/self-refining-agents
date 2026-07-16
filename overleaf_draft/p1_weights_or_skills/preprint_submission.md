# Preprint submission kit (for a citable DOI while arXiv is closed to CS surveys)

> arXiv CS now blocks un-peer-reviewed surveys, so until a journal/conference accepts the paper,
> use a preprint server that still takes reviews. **I cannot submit this for you** (it needs your
> account and your agreement to the server's terms), so this file has everything ready to paste.
> **Upload file:** `weights-or-skills.pdf` (the 300 dpi, 1.3 MB named version; also live on the site).

## Which server (ranked for a robotics/ML survey)

1. **TechRxiv (IEEE):** best fit. Free, issues a Crossref DOI, IEEE-run so it is reputable and
   topically aligned with robotics, and it accepts reviews/surveys. Light scope/plagiarism screen,
   not peer review. → https://www.techrxiv.org/
2. **Zenodo (CERN)** or **OSF Preprints:** instant DOI, no content gate, any field. Lower ML-community
   discoverability than TechRxiv, but the fastest guaranteed DOI and good for a permanent timestamp.
   → https://zenodo.org/ · https://osf.io/preprints/
3. **Preprints.org (MDPI):** fast DOI, accepts surveys, but the MDPI association carries a mild
   prestige caveat. → https://www.preprints.org/
4. **SSRN (Elsevier):** works, but weaker fit (social-science/econ heavy) for a robotics survey.

**Recommended:** post to **TechRxiv** (DOI + reach + fit). Optionally also mint a **Zenodo** DOI for a
permanent archive. Both can coexist with a later journal publication.

## Copy-paste metadata

**Title:** Weights or Skills? A Survey of Robot-Learning Techniques: from Action-Predicting Weights to Robots that Write their Own Skills

**Authors (name, affiliation):**
1. Gaytri Jena, UC Berkeley, USA
2. Kapil Wanaskar, Canva Research, USA
3. Vinija Jain, Google, USA
4. Aman Chadha, Google DeepMind, USA
5. Vasu Sharma, PocketFM, USA
6. Amitava Das, Pragya Lab, BITS Pilani Goa, India

(Set the corresponding author + email during upload; confirm the author order.)

**Subject / category:** Robotics; Machine Learning; Artificial Intelligence.

**Keywords:** robot learning, code-as-policy, self-improvement, vision-language-action models, skill libraries, physical AI, survey

**License (choose at upload):** CC BY 4.0 is the common preprint default and keeps you compatible with
most later journals; if unsure, CC BY 4.0.

**Abstract:**
Robot learning is splitting into two bets: policies that bake competence into frozen weights (vision-language-action, or VLA, models), and agents that write and refine their own executable skills as code. This survey organises the field around that axis of weights versus skills. Its central analytical contribution is a deep-dive that arranges code-as-policy methods by their degree of self-improvement, from zero-shot program synthesis, through closed-loop self-repair and persistent skill memory, to the sparsely populated cell in which execution feedback, skill memory, and evolutionary search combine into one open-ended loop; only a few very recent systems (for example ASPIRE, ENPIRE, and RoboClaw) occupy that cell. We map the complementary "skills" pole, from unsupervised reinforcement-learning skill discovery to large-language-model skill libraries, and show that the word "skill" is used in at least five distinct senses, of which only the code sense self-improves without gradient updates. We then connect the taxonomy to the emerging skill economy: commercial robot-skill marketplaces now distribute one-tap skills across robots but ship only static playback, which surfaces open problems of adaptation, cross-embodiment portability, provenance, safety verification, composition, and standardisation. This is a deliberately focused survey. Rather than cataloguing the field exhaustively, it examines 77 representative systems across six technique families through one taxonomy and a set of contrast tables, and it supplies operational definitions of the self-improvement mechanisms together with a statement of what each family cannot do.

## Steps (TechRxiv)

1. Create/sign in to a TechRxiv account (IEEE account works).
2. New submission, type = **Preprint**, article type **Review/Survey**.
3. Upload `weights-or-skills.pdf`.
4. Paste the Title, Authors + affiliations, Abstract, Keywords, and Category above; set corresponding author + email.
5. Pick the license (CC BY 4.0).
6. Submit. After the light scope/plagiarism screen (usually a few days), you get a **DOI** you can cite everywhere.

## One caution before you post publicly

A **named, public preprint can compromise a double-anonymous review.** TMLR and most conferences are
double-anonymous. Posting to a preprint server is generally allowed there (reviewers are told not to
actively search), but it de-anonymizes if a reviewer finds it. CSUR is single-anonymous, so it is a
non-issue there. Decide your target venue's blind model first; if you are going double-anonymous and
want to be strict, hold the public preprint until after submission or acceptance.
