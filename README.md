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

Cadence uniformity is the headline. It is the pattern that survives longest across rewrites, and it is the one thing a writer can see instantly in a chart and never unsee.

### The em dash classifier

The point is that not every dash is a mistake. `—Tolkien` after a quotation is correct attribution. `"but I—"` is correct interrupted dialogue. Both are marked **correct as written** and offered no fix.

Paired dashes are handled **as a pair** — both marks transform together, so `The city — shrouded in fog — buzzed` becomes `The city (shrouded in fog) buzzed` and not a broken sentence. Naive find-and-replace gets this wrong every time.

## Flatness reading

A 0–100 score with four weighted components: sentence rhythm (40%), punctuation density (20%), structural tics (22%), vocabulary (18%).

**It is not an AI detector.** It does not evade AI detectors, and no number here predicts what any detection service will conclude about your text. Turnitin's detector weighs dozens of features and punctuation is a small contributor — stripping em dashes from a paper moves the score by a few points at most. Treat this the way you'd treat a readability score: a prompt to reread, not a verdict.

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
