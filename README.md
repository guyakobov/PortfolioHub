# PortfolioHub

A personal portfolio site for public projects and private company case studies.

## Live Site

https://portfoliohub-kappa.vercel.app

## Run Locally

**Prerequisite:** Node.js

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the dev server:

   ```bash
   npm run dev
   ```

3. Build for production:

   ```bash
   npm run build
   ```

## Deploy These Hub Files Into Another Repo

Use this when you want to copy this portfolio into another GitHub repo.

### Safe option: push to a new branch

This does not overwrite the other repo's `main` branch.

```bash
git remote add target https://github.com/YOUR_USER/YOUR_REPO.git
git push target main:portfolio-hub
```

Then open GitHub and create a pull request from `portfolio-hub`.

Example:

```bash
git remote add target https://github.com/guyakobov/MamaLink.git
git push target main:portfolio-hub
```

### Replace the other repo's main branch

Only use this if you are sure you want the other repo to become this portfolio.

```bash
git push target main:main --force-with-lease
```

After the code is in the other repo, import that repo in Vercel or redeploy its existing Vercel project.

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Vercel
