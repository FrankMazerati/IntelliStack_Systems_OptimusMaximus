# GitHub change and release workflow

## Before editing

- Confirm the repository, base branch, task issue, and current PR state.
- Read the README, system map, and relevant component/style files.
- Check whether another PR already changes the same files.
- Capture acceptance criteria and define how success will be verified.

## Branch and change

Use a focused branch name such as `fix/ticket-filter`, `feat/knowledge-center-search`, or `docs/runbook-update`.

- Keep one logical change per PR where practical.
- Avoid editing generated files or adding dependencies without a reason.
- Do not commit secrets, .env files, production data, private candidate information, or unredacted screenshots.
- Add tests for behavior changes when feasible; update the knowledge center for operational changes.

## Pull request description

Include:

1. **Purpose:** user problem and expected result.
2. **Changes:** key files/modules touched.
3. **Validation:** exact commands and outcomes; include the workflow link and tested SHA.
4. **Security/privacy:** data touched, permissions affected, and any sensitive boundary.
5. **Risks:** known limitations and untested scenarios.
6. **Rollback:** the safe way to revert or disable the change.
7. **Screenshots:** before/after images for meaningful UI changes, with synthetic data only.

## Review and merge gates

- Review the diff for unintended changes and secrets.
- Verify CI for the current PR head SHA.
- Verify required reviewers and acceptance criteria.
- Do not merge while required checks fail or a security concern remains unresolved.
- Do not deploy without the appropriate authorization.
- After merge, verify the deployed commit and run a smoke test before reporting success.

## Deployment status report format

- Commit/PR:
- CI: pass / fail / not run (link and SHA):
- Deployment: deployed / pending / failed / unknown (provider record):
- Smoke test: pass / fail / not run:
- Known limitations:
- Rollback:
- Owner / next action:

## Rollback principles

Prefer reverting the specific PR/commit through the repository's normal review process. Before any rollback that affects database schema, stored data, secrets, or external transactions, assess compatibility and coordinate with the system owner. Never delete production data as a shortcut.
