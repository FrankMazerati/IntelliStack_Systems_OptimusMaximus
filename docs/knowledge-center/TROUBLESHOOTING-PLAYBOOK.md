# Troubleshooting playbook

Use this runbook for a reproducible investigation. Prefer evidence and the smallest safe fix over guessing.

## Standard incident workflow

1. **Capture the symptom:** exact screen/action, expected result, actual result, first observed time/time zone, affected environment, and whether it affects one or many users.
2. **Classify severity:**
   - **Critical:** suspected data exposure, credential compromise, unauthorized access, destructive production behavior, or broad production outage. Stop changes and alert the owner/security contact immediately.
   - **High:** core workflow unavailable for multiple users or critical business activity blocked.
   - **Normal:** limited feature regression with a workaround.
   - **Low:** cosmetic issue, documentation gap, or minor usability defect.
3. **Reproduce safely:** use a development/preview environment and synthetic data. Do not repeat risky actions against production.
4. **Collect evidence:** redacted error text, browser/console output, request status codes, commit SHA, PR link, workflow run, and relevant timestamps. Remove tokens, cookies, email addresses, personal data, and request bodies containing sensitive records.
5. **Find the last known good state:** compare the failing branch/commit with the base commit and recent changes.
6. **Form a testable hypothesis:** identify the likely cause and one minimal change that could confirm it.
7. **Fix and validate:** run the narrowest relevant test, then the full available build/test suite. Record actual results.
8. **Review and hand off:** open/update a PR, document risks and rollback, and leave a concise handoff.

## Runbook: Vite/React build fails

1. Open the exact failed GitHub Actions run and identify the first compiler/build error; later errors may be consequences.
2. Note the commit SHA and branch tested. Do not assume a passing run on another SHA validates this commit.
3. Inspect the reported file and several lines before the error. JSX errors often originate from an unclosed tag, brace, quote, parenthesis, or conditional immediately before the highlighted token.
4. Reproduce with `npm ci` when a lockfile is present (otherwise use the repository's documented install command), then `npm run build`.
5. Make the smallest correction. Review the entire surrounding JSX/JS expression and the diff.
6. Re-run the build and ensure the workflow is green on the final PR head SHA.
7. If a build cannot be reproduced locally, state that limitation and do not claim validation.

## Runbook: workflow check fails

- Open the failing run, then the failed job and step.
- Read the first meaningful error plus enough surrounding log context to understand the cause.
- Separate dependency/install errors, lint/type/test errors, compiler errors, and infrastructure failures.
- Fix the cause rather than rerunning repeatedly without a code or environment change.
- Re-run only after a meaningful correction, or use the approved rerun action when the failure is clearly transient.
- Verify the latest run corresponds to the latest PR head SHA.

## Runbook: UI action appears broken

- Confirm the correct role, route, and screen are active.
- Check whether the control is disabled, hidden by responsive layout, covered by another element, or missing a handler.
- Test keyboard operation and a narrow viewport as well as desktop.
- Verify the action's success and error states; do not show success before the backend confirms it.
- Check whether the data is seeded, in localStorage, or loaded from a real API. Do not assume browser-local changes are shared between users/devices.
- Confirm navigation destinations exist and the user has access.

## Runbook: integration is offline or unverified

- Check configured endpoint, service status, credential expiry, network/CORS, response code, timeout, and server logs.
- Never print credentials or full authorization headers. Redact identifiers and payloads.
- Distinguish “configured”, “reachable”, “authenticated”, and “successfully processing data”; they are different health states.
- Do not change production secrets or billing settings without explicit authorization.
- Validate with a least-privilege test account and non-sensitive test record.
- Record the last successful check and the next retry/owner.

## Runbook: suspected secret exposure

1. Stop sharing or reproducing the secret; do not paste it into an issue or chat.
2. Notify the project owner/security contact immediately.
3. Revoke or rotate the exposed credential using the provider's approved process; remove excess access.
4. Check provider audit logs for use during the exposure window.
5. Remove the secret from current code and prevent recurrence. A commit that deletes a secret does not erase it from Git history.
6. If history cleanup is required, coordinate an approved rewrite and communicate the impact to all collaborators.
7. Document the incident without copying the secret itself.

## Runbook: local data missing or differs across devices

- Determine whether the feature uses localStorage, a server API, or a shared database.
- For localStorage-based demo features, data is browser-profile-specific and may be lost when site data is cleared.
- Do not promise cross-device persistence until authenticated server-side storage and authorization are verified.
- Never migrate or delete production data as a troubleshooting experiment.

## Runbook: deployment status unclear

- Identify the exact commit intended for release.
- Check the matching workflow run and its final result.
- Check the hosting provider for a deployment tied to that commit and inspect its state.
- Open the deployed URL and run a safe smoke test.
- Report CI status, deployment status, and runtime smoke-test status separately. A passing build alone does not prove production is deployed or healthy.
- Respect hosting plan limits; do not repeatedly trigger deployments if the provider reports a quota limit.
