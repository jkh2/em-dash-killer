# ⚡ EM DASH KILLER

**Find the patterns that make writing read as machine-generated, and fix the ones worth fixing.**

[**Open the tool →**](https://jkh2.github.io/em-dash-killer/)

Everything runs in your browser. No account, no upload, no server, no tracking. Close the tab and your text is gone.

---

## Why this exists, and why v2 is different

Em Dash Killer started in August 2025, when someone on X offered $100 for a tool that would strip em dashes out of ChatGPT output. We built it free instead.

The premise has since inverted. *The Economist* compared 55,940 sentences across its own articles, the NYT, the Washington Post, novels published between 1950 and 2022, and generated versions from ChatGPT, Claude, Gemini and Grok. Two findings changed what this tool should be:

- **Of the major models tested, only Claude used em dashes more often than human writers.** ChatGPT, once the worst offender, now uses them *less* than any other model and far less than humans do.
- **A lack of punctuation is the better indicator.** Models use fewer commas, semicolons and parentheses than humans, and write overly long sentences with "and" as their most overused word.

So the old approach didn't just stop helping — it actively pushed text *toward* the current profile. Every dash converted to a period flattened sentence-length variety. Every dash converted to a comma built a longer, looser sentence. Both directions move toward the 2026 signature.

Worse, a punctuation swap can't fix the sentence underneath. A dash in *"the city buzzed with a strange energy—one that couldn't quite be placed"* is introducing an appositive. Swap in a comma and you get a comma splice. Regex can find a character; it cannot restructure a clause.

**v2 measures instead of mangles.** It shows you what a reader notices and lets you decide. That is what an editor does.

## What it checks

| Layer | What it finds | Auto-fix? |
|---|---|---|
| **Invisible characters** | Non-breaking and narrow spaces, zero-width spaces, joiners, BOMs, stray arrows and check marks, mixed quote styles | ✅ Always safe |
| **Em dashes** | Each one classified by the job it's doing: paired parenthetical, appositive, clause join, number range, attribution, interrupted dialogue | ⚠️ Your choice |
| **Sentence cadence** | Length of every sentence, charted. Standard deviation, coefficient of variation, longest uniform run, runs inside the 18–24 word band | 📊 Measured only |
| **Structure** | "It's not X, it's Y" frames, rule-of-three lists, long sentences chained with "and", punctuation density | 📊 Flagged only |
| **Word choice** | Wordy constructions with clean substitutions, worn stock phrasing, abstract-noun load | ⚠️ Mixed |
| **Provenance** | Which sentences were typed in the box vs pasted in, this session | 📊 Observed |

Cadence uniformity is the headline. It is the pattern that survives longest across rewrites, and it is the one thing a writer can see instantly in a chart and never unsee.

### The em dash classifier

The point is that not every dash is a mistake. `—Tolkien` after a quotation is correct attribution. `"but I—"` is correct interrupted dialogue. Both are marked **correct as written** and offered no fix.

Paired dashes are handled **as a pair** — both marks transform together, so `The city — shrouded in fog — buzzed` becomes `The city (shrouded in fog) buzzed` and not a broken sentence. Naive find-and-replace gets this wrong every time.

### Import

Drop a `.docx` on the draft box, or use **Import .docx**. A Word file is a zip of XML, and the browser unzips it with `DecompressionStream` — so there's still no library, no upload, and no server. Tracked changes come in as accepted, with a count of what was there. Comments are counted but their text is not imported. `.txt` and `.md` work too.

### Provenance

The tool records which characters arrived by keystroke and which by paste, then shades the cadence chart accordingly. This is a fact about the current browser window, not a guess about authorship — and it's worth being blunt about the limit: **paste a finished draft in and it reads 100% pasted, which is expected and is not a judgement.** It earns its keep when you draft or revise in the box.

### Rewrite brief

The findings that need a writer, packaged as a prompt you can paste into any assistant. Only the flagged sentences go in, never the whole document, and the panel tells you exactly what share of your draft that is. The prompt tells the model to preserve your meaning and voice, cites your actual cadence numbers so it knows what to vary, and explicitly instructs it not to optimise against AI detectors or introduce errors to look human.

### Cadence drill-down

Click any bar to jump to that sentence. It gets selected in the draft box, with its length, its distance from your average, and whether you typed or pasted it.

## Flatness reading

A 0–100 score with four weighted components: sentence rhythm (40%), punctuation density (20%), structural tics (22%), vocabulary (18%).

**It is not an AI detector.** It does not evade AI detectors, and no number here predicts what any detection service will conclude about your text. Turnitin's detector weighs dozens of features and punctuation is a small contributor — stripping em dashes from a paper moves the score by a few points at most. Treat this the way you'd treat a readability score: a prompt to reread, not a verdict.

### Calibration

The thresholds aren't guesses. They're measured against a corpus of human-written prose — ten public-domain literary works plus contemporary expository writing — segmented into paste-sized passages.

The key finding is that **contemporary expository prose is markedly more uniform than literary prose**: median coefficient of variation 0.395 against 0.535. An early draft of this tool used thresholds that would have flagged the median contemporary academic as suspicious. That's the failure mode that would make it useless for the people it's built for, so the numbers now come from the corpus:

| cv over 10-sentence windows | p05 | p10 | p25 | p50 |
|---|---|---|---|---|
| human baseline (n=2,587 windows) | 0.310 | 0.353 | 0.429 | 0.524 |

Validated end to end on 1,283 human-written passages:

| | median score | flagged "leaning flat" (≥45) | flagged "flat" (≥65) |
|---|---|---|---|
| **human-written prose** | **9** | **1.0%** | **0.0%** |
| synthetic uniform text (~200w) | 70 | — | — |

The flat-run detector (5+ consecutive sentences within a 4-word window) was tuned the same way: at the original ±6 / 4+ it fired on 19–27% of human passages, which is useless. It now fires on about 3%.

Reproduce it with `calib2.js` and `validate.js` in the repo.

**Corpus caveat:** the literary half is pre-1930 and the contemporary half is encyclopedic. Neither is a perfect stand-in for a modern journal article or a blog post. The baseline is a real measurement, not a universal constant.

## The case for the tool

When a PhD publishes, the paper passes through co-authors, reviewers, a copy editor and a proofreader. Nobody footnotes the proofreader. The standard has never been that writing must be unassisted — it's that the author takes responsibility for every claim in it.

A writer working with an AI partner has no editorial staff. This is a stand-in for one: it finds the flat spots and hands the decision back to the writer.

If your institution or publisher requires disclosure of AI assistance, **disclose it.** This tool is for making prose better, not for hiding how it was made.

## Running it

Open `index.html`. That's the whole install — one file, no build step, no dependencies, no network calls.

```bash
git clone https://github.com/jkh2/em-dash-killer.git
cd em-dash-killer
open index.html
```

To deploy your own: push to a repo, enable GitHub Pages on the `main` branch.

**Browser support:** Chrome, Firefox, Safari and Edge, current versions. No ES6+ syntax that needs transpiling.

## Versions

- **`index.html`** — v2, the scanner. Current.
- **`v1.html`** — the original August 2025 dash-replacer, kept for reference. Retired, not maintained.

### Added after launch
- Rewrite brief — flagged sentences only, packaged as a prompt
- Paste-vs-typed provenance tracking, shaded onto the cadence chart
- `.docx` import with tracked changes and comment detection, no library
- Click-a-bar drill-down from the chart to the sentence
- Recalibrated every cadence threshold against a measured human corpus

### Changed in v2
- Rebuilt from auto-rewriter to scanner with assisted edits
- Added invisible-character detection (12 classes)
- Added em dash classification with correct paired-dash handling
- Added the cadence chart and burstiness statistics
- Added structural and lexical pattern detection
- Removed the fabricated "Credibility Boost" metric — it was an invented number
- Removed the MetaMask panel, which had no business on a writing tool
- **Fixed:** the v1 DOCX export produced a corrupt file. It wrote JSON with a Word MIME type, so Word refused to open it. v2 exports `.txt`, `.md` and `.rtf`, and RTF opens natively in Word.
- Replaced the D3 dependency with inline SVG — no CDN, works offline

## Support

Free, always. Donations cover hosting and development: [Cash App](https://cash.app/$Americanadventurer)

## Credits

Built by [James Keith Harwood II](https://www.jameskeithharwood.com). v2 engine developed in partnership with Claude (Anthropic).

## License

See [License.md](License.md). © 2025–2026 James Keith Harwood II.

---

## Sources

- [The Economist, "How to spot AI writing" (July 2026)](https://www.economist.com/culture/2026/07/30/how-to-spot-ai-writing) — via [Fast Company's summary](https://www.fastcompany.com/91584243/how-to-identify-ai-generated-writing-viral-report-has-surprising-new-clues-economist)
- [The Em-Dash Myth: What Actually Gives Away AI Writing](https://www.duey.ai/post/em-dash-ai-writing) — cadence uniformity, Turnitin weighting
- [The New Em-Dash: 9 Signs of AI Writing](https://pasqualepillitteri.it/en/news/11195/new-em-dash-9-ai-writing-tells)
