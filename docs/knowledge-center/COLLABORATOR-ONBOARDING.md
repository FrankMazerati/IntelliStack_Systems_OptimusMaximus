# Collaborator onboarding

Use this checklist whenever a developer, tester, designer, support specialist, or technical writer joins the project.

## 1. Before access is granted

- [ ] Record the collaborator's name, role, task owner, start date, and expected end/review date.
- [ ] Define the exact task, expected outcome, and acceptance criteria.
- [ ] Grant the minimum required access; use individual accounts and MFA where available.
- [ ] Confirm whether the person may read, edit, review, merge, deploy, or access production. These are separate permissions.
- [ ] Provide approved links to the repository, assigned issue/PR, project preview, and relevant system documentation.
- [ ] Never send secrets in chat or onboarding documents. Share secrets only through an approved secret manager with scoped access.

## 2. First-hour orientation

1. Read the repository [README](../../README.md).
2. Read [System map and implementation status](SYSTEM-MAP.md).
3. Review the assigned issue and current pull request; read the full diff, not just the title.
4. Identify whether the task is UI-only, documentation, backend, security, data, or deployment work.
5. Ask the task owner before changing scope or touching production configuration.

## 3. Set up and validate locally

Requirements: Node.js 18+ (as stated in the repository README) and Git.

```bash
git clone https://github.com/FrankMazerati/IntelliStack_Systems_OptimusMaximus.git
cd IntelliStack_Systems_OptimusMaximus
npm install
npm run dev
```

For a production build:

```bash
npm run build
npm run preview
```

Record the Node/npm versions and command results in the handoff. Do not claim a test passed unless it actually ran successfully. Do not copy production secrets into local files. If an environment variable is required, request an approved development value and document its name without recording its value.

## 4. Working agreement

- Start from the correct base branch and create a task-specific branch.
- Keep the change focused; avoid mixing unrelated UI, backend, and infrastructure work.
- Check existing code and project conventions before adding dependencies.
- Never commit .env files, tokens, private keys, real employee/candidate data, or unredacted logs.
- Add or update tests and documentation where appropriate.
- Open a PR with a plain-language summary, screenshots for UI changes, validation results, risk, and rollback notes.
- Do not merge or deploy unless the assigned permission explicitly allows it and the required checks pass.

## 5. Completion checklist

- [ ] Acceptance criteria addressed or explicitly marked incomplete.
- [ ] Build/tests run; exact commands and outcomes recorded.
- [ ] No secrets or private data in the diff.
- [ ] Relevant documentation updated.
- [ ] PR/issue links and changed files listed.
- [ ] Risks, known bugs, follow-up work, and rollback steps documented.
- [ ] Owner knows what changed and what still needs a decision.

## 6. Stop and escalate if

- A change may affect production data, identity, permissions, payments, tax records, or customer/candidate privacy.
- A credential appears in code, logs, screenshots, or commit history.
- A build fails for reasons not understood, tests are skipped, or the deployment status is unclear.
- You cannot reproduce the issue or the fix would require broad, unrelated changes.
