import { readdirSync, statSync, rmSync, existsSync } from "node:fs";
import { join } from "node:path";

const out = join(process.cwd(), "out");
if (!existsSync(out)) process.exit(0);

let removed = 0;
const walk = (dir) => {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) {
      walk(p);
    } else if (entry.endsWith(".txt") && entry !== "robots.txt") {
      rmSync(p, { force: true });
      console.log(`clean-export: removed ${p}`);
      removed += 1;
    }
  }
};
walk(out);
if (removed === 0) {
  console.log("clean-export: nothing to remove");
}