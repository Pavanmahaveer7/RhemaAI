# GitHub repo setup

The git root is **`church-ai-stack`** (not your home folder). Render should use this folder (or set Blueprint path to `church-ai-stack/render.yaml` if the repo root is the parent).

## 1. Log in to GitHub (one time)

In PowerShell:

```powershell
gh auth login -h github.com
```

Choose: **GitHub.com** → **HTTPS** → **Login with a web browser** (or paste a token).  
Confirm:

```powershell
gh auth status
```

Account should show **Logged in** (e.g. `Pavanmahaveer7`).

## 2. Create the repo and push (from `church-ai-stack`)

After your work is committed on `main`:

```powershell
cd C:\Users\pavan.singara\Downloads\church-ai-platform-repo\church-ai-stack

# Or create a new repo (change name if taken):
gh repo create RhemaAI --public --source=. --remote=origin --description "Rhema AI — contract API, Next UI, Render blueprint"

git push -u origin main
```

Private repo: add `--private` instead of `--public`.

If the repo **already exists** on GitHub (current):

```powershell
git remote add origin https://github.com/Pavanmahaveer7/RhemaAI.git
git push -u origin main
```

## 3. Link Render to GitHub

1. [Render Dashboard](https://dashboard.render.com) → **Account Settings** → connect **GitHub**.
2. **New** → **Blueprint** → select **[RhemaAI](https://github.com/Pavanmahaveer7/RhemaAI)**.
3. Blueprint path: `render.yaml` (repo root = `church-ai-stack`).
4. Follow **`docs/render-deploy.md`** for secrets.

## 4. Safety

- Never commit `.env` (ignored). Only `.env.example` is tracked.
- Rotate `DEMO_SIGNIN_PASSWORD` and encryption keys on Render; do not reuse `dev-only-change-me` in production.
