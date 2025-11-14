# Branching Strategy — ShutterPath

This document describes a simple, practical branching model for ShutterPath tailored to a solo developer who may later add collaborators. Keep branches short-lived, descriptive, and focused on a single task.

## Core branches

- `main` — Production-ready branch. Always reflects the latest release/deployed code. Only merge here from `dev` during a release or for urgent hotfixes.
- `dev` — Active development branch. All feature work is based off and merged back into `dev`.

## Short-lived branches

Use descriptive prefixes and include a short identifier or WBS number when helpful.

- `feature/*` — New features or screens (e.g. `feature/3.1-daily-prompt-ui`).
- `hotfix/*` — Urgent fixes applied directly to `main` (e.g. `hotfix/critical-android-crash`).
- `chore/*` — Non-functional work like dependency updates, tooling, or refactors (optional) (e.g. `chore/update-deps-2025-11`).

## Naming examples

- `feature/3.1-daily-prompt-ui`
- `feature/4.2-ai-critique-backend`
- `hotfix/ios-launch-fix`
- `chore/cleanup-unused-assets`

## Workflows (step-by-step)

### Start a new feature (from `dev`)

1. Ensure `dev` is up-to-date:
   - `git checkout dev`
   - `git pull origin dev`
2. Create a feature branch from `dev`:
   - `git checkout -b feature/<short-name>`
   - Example: `git checkout -b feature/3.1-daily-prompt-ui`
3. Work locally, commit often with clear messages:
   - `git add .` then `git commit -m "feat: add daily prompt screen UI"`
4. Push the branch to remote regularly:
   - `git push -u origin feature/<short-name>`

### Merge feature back into `dev`

1. Rebase or merge the latest `dev` into your feature branch to resolve conflicts early:
   - `git fetch origin`
   - `git checkout feature/<short-name>`
   - `git pull --rebase origin dev` (or `git merge origin/dev` depending on preference)
2. Run tests / smoke checks locally.
3. Push any final changes:
   - `git push origin feature/<short-name>`
4. Merge into `dev` (fast-forward or pull request where useful):
   - If working solo: `git checkout dev` → `git merge --no-ff feature/<short-name>` → `git push origin dev`
   - If using PRs: open a PR from `feature/<short-name>` → `dev`, review, then merge.
5. Delete the feature branch when merged:
   - `git branch -d feature/<short-name>` (local)
   - `git push origin --delete feature/<short-name>` (remote)

### Promote `dev` to `main` (release / milestone)

1. Ensure `dev` is stable and passes checks.
2. Create a release branch optionally (e.g. `release/v0.2.0`) or merge directly for small projects.
3. Merge `dev` into `main`:
   - `git checkout main`
   - `git pull origin main`
   - `git merge --no-ff dev`
   - `git tag -a vX.Y.Z -m "Release vX.Y.Z"` (optional)
   - `git push origin main --tags`
4. If you used a `release/*` branch, merge it back into `dev` if any final fixes were applied.

### Hotfix a production issue (on `main`)

1. Branch from `main`:
   - `git checkout main`
   - `git pull origin main`
   - `git checkout -b hotfix/<short-name>`
2. Implement fix, test, and commit.
3. Merge the hotfix into `main` and push:
   - `git checkout main`
   - `git merge --no-ff hotfix/<short-name>`
   - `git push origin main`
4. Also merge the hotfix back into `dev` to keep branches in sync:
   - `git checkout dev`
   - `git pull origin dev`
   - `git merge --no-ff hotfix/<short-name>`
   - `git push origin dev`
5. Delete the hotfix branch after merging.

## Tips for a solo developer

- Keep branches small and focused — this reduces merge friction.
- Use clear commit messages with conventional prefixes: `feat:`, `fix:`, `chore:`, `docs:`.
- If collaboration grows, add simple PR checks (CI, lint) before merging into `dev`.
- Use tags for releases so you can quickly roll back if needed.

## Minimal policy for merges

- `dev` should always be deployable to an integration/staging environment.
- `main` must always be production-ready.
- For critical hotfixes, fast-track `hotfix/*` branches and ensure the same fix is merged into `dev`.

---

This branching model is intentionally lightweight to keep workflow fast and predictable for the MVP stage. If you want, I can also add a short `git` command cheat-sheet or create a small GitHub Actions workflow to enforce PR checks next.
