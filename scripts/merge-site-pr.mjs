import { execFileSync } from "node:child_process";
import { setTimeout } from "node:timers/promises";

const repo = "VoshodnaVetke/-edem-website";
const [number] = process.argv.slice(2);

if (!/^[1-9]\d*$/.test(number ?? "") || process.argv.length !== 3) {
  throw new Error("Usage: npm run merge:site -- <pull-request-number>");
}

function gh(args, stdio = ["ignore", "pipe", "inherit"]) {
  return execFileSync("gh", [...args, "--repo", repo], {
    encoding: "utf8",
    stdio,
  });
}

function readPullRequest() {
  const fields =
    "baseRefName,headRefName,headRefOid,isCrossRepository,isDraft,mergeable,mergeStateStatus,reviewDecision,state";
  const pr = JSON.parse(gh(["pr", "view", number, "--json", fields]));
  if (
    pr.baseRefName !== "main" ||
    pr.isCrossRepository ||
    pr.isDraft ||
    pr.state !== "OPEN"
  ) {
    throw new Error(
      "Expected an open, ready-to-review PR from this repository into main.",
    );
  }
  if (pr.reviewDecision && pr.reviewDecision !== "APPROVED") {
    throw new Error(`PR #${number} requires review: ${pr.reviewDecision}.`);
  }
  return pr;
}

const initial = readPullRequest();
console.log(
  `Waiting for the React UI pull-request workflow for ${initial.headRefOid}.`,
);

let run;
for (let attempt = 0; attempt < 12; attempt += 1) {
  const runs = JSON.parse(
    gh([
      "run",
      "list",
      "--workflow",
      "react-ui.yml",
      "--event",
      "pull_request",
      "--branch",
      initial.headRefName,
      "--commit",
      initial.headRefOid,
      "--limit",
      "1",
      "--json",
      "databaseId",
    ]),
  );
  [run] = runs;
  if (run) break;
  await setTimeout(5_000);
}
if (!run)
  throw new Error(`GitHub did not start PR checks for ${initial.headRefOid}.`);

gh(["run", "watch", String(run.databaseId), "--exit-status"], "inherit");
gh(["pr", "checks", number, "--watch", "--fail-fast"], "inherit");

const verified = readPullRequest();
if (verified.headRefOid !== initial.headRefOid) {
  throw new Error(`PR #${number} changed while its checks were running.`);
}
if (
  verified.mergeable !== "MERGEABLE" ||
  verified.mergeStateStatus !== "CLEAN"
) {
  throw new Error(
    `PR #${number} is not ready to merge: ${verified.mergeable}, ${verified.mergeStateStatus}.`,
  );
}

gh(
  [
    "pr",
    "merge",
    number,
    "--squash",
    "--match-head-commit",
    verified.headRefOid,
  ],
  "inherit",
);
