import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const appsRoot = path.resolve(import.meta.dirname, "..");

test("mission panel decoration does not override dialog fixed positioning", async () => {
  const stylesheet = await fs.readFile(
    path.join(appsRoot, "src", "app", "globals.css"),
    "utf8",
  );
  const missionPanelRule = stylesheet.match(/\.mission-panel\s*\{([^}]*)\}/)?.[1] ?? "";

  assert.doesNotMatch(
    missionPanelRule,
    /\bposition\s*:/,
    "mission-panel is also used by DialogContent and must not replace its fixed position",
  );

  assert.match(
    stylesheet,
    /\.mission-panel:not\(\[data-slot="dialog-content"\]\)\s*\{\s*position:\s*relative;/,
    "non-dialog mission panels still need a positioning context for their decorative layers",
  );

  const glassCardRule = stylesheet.match(/\.glass-card\s*\{([^}]*)\}/)?.[1] ?? "";
  assert.doesNotMatch(
    glassCardRule,
    /\bposition\s*:/,
    "glass-card is also used by DialogContent and must not replace its fixed position",
  );
  assert.match(
    stylesheet,
    /\.glass-card:not\(\[data-slot="dialog-content"\]\)\s*\{\s*position:\s*relative;/,
    "non-dialog glass cards still need a positioning context for their decorative layers",
  );

  assert.match(
    stylesheet,
    /\.mission-panel\s*>\s*\*:not\(\[data-slot="dialog-close"\]\)\s*\{\s*position:\s*relative;/,
    "mission panel content keeps its stacking context without overriding the dialog close button positioning",
  );
  assert.doesNotMatch(
    stylesheet,
    /\.mission-panel\s*>\s*\*\s*\{\s*position:\s*relative;/,
    "the dialog close button must retain its absolute top-right positioning",
  );
});
