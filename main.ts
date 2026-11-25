import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one original line for the "One Line, Big Laugh" bounty.
// Setup: asking a smart speaker for motivation. Turn: it gives the
// classic IT fix, aimed at the speaker's owner — and both end up in therapy.
const ENTRY_LINE =
  "I told my smart speaker I needed motivation, so it said 'have you tried turning yourself off and on again' — now we're both in therapy.";

function validate(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(`Entry must be 1-200 characters, got ${line.length}.`);
  }
  if (line !== line.trim()) {
    throw new Error("Entry must not have leading or trailing whitespace.");
  }
  // Single line: no newline, carriage return, tab, or any control character.
  for (const ch of line) {
    const code = ch.charCodeAt(0);
    if (code < 0x20 || code === 0x7f) {
      throw new Error(
        `Entry must not contain control characters (found U+${code
          .toString(16)
          .padStart(4, "0")}).`,
      );
    }
  }
}

validate(ENTRY_LINE);

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY_LINE, "utf8");
console.log(`Wrote entry.txt (${ENTRY_LINE.length} characters).`);
