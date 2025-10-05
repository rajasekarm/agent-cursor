# Publishing Guide

This guide explains how to publish the `agent-cursor` package to npm using GitHub Actions.

## One-Time Setup

### 1. Create npm Access Token

1. Go to [npmjs.com](https://www.npmjs.com/) and log in
2. Click your profile picture → **Access Tokens**
3. Click **Generate New Token** → **Classic Token**
4. Select **Automation** type
5. Copy the token (you won't see it again!)

### 2. Add npm Token to GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `NPM_TOKEN`
5. Value: Paste your npm token
6. Click **Add secret**

### 3. Ensure GitHub Actions Has Write Permissions

1. Go to **Settings** → **Actions** → **General**
2. Scroll to **Workflow permissions**
3. Select **Read and write permissions**
4. Check **Allow GitHub Actions to create and approve pull requests**
5. Click **Save**

---

## Publishing a New Version

### Using GitHub Actions (Recommended)

1. Go to your repository on GitHub
2. Click the **Actions** tab
3. Select **Publish to npm** workflow from the left sidebar
4. Click **Run workflow** button (top right)
5. Select version bump type:
   - **patch** - Bug fixes (1.0.0 → 1.0.1)
   - **minor** - New features (1.0.0 → 1.1.0)
   - **major** - Breaking changes (1.0.0 → 2.0.0)
6. Click **Run workflow**

The workflow will:

- ✅ Bump the version in `package.json`
- ✅ Build the package
- ✅ Publish to npm
- ✅ Create a git tag
- ✅ Push changes to GitHub
- ✅ Create a GitHub Release

---

## Manual Publishing (Alternative)

If you prefer to publish manually:

```bash
# 1. Bump version
npm version patch  # or minor, or major

# 2. Build
npm run build

# 3. Publish
npm publish

# 4. Push changes
git push
git push --tags
```

---

## Version Guidelines

Follow [Semantic Versioning](https://semver.org/):

- **MAJOR** (1.0.0 → 2.0.0): Breaking changes
  - Changed API
  - Removed features
  - Incompatible updates

- **MINOR** (1.0.0 → 1.1.0): New features (backwards compatible)
  - New methods
  - New options
  - Enhanced functionality

- **PATCH** (1.0.0 → 1.0.1): Bug fixes
  - Bug fixes
  - Performance improvements
  - Documentation updates

---

## Troubleshooting

### "npm publish failed"

- Check that `NPM_TOKEN` secret is set correctly
- Verify you have publish rights for the package
- Check if the version already exists on npm

### "Permission denied"

- Ensure GitHub Actions has write permissions
- Check that your npm token has automation permissions

### "Version already exists"

- The version in `package.json` already exists on npm
- Manually bump version or select different bump type

---

## After Publishing

Your package will be available at:

- npm: `https://www.npmjs.com/package/agent-cursor`
- Install: `npm install agent-cursor`

Check the GitHub Release for the changelog and download links.
