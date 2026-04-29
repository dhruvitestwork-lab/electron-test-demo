# Electron Auto-Updater — Complete Guide

---

## Quick Answers to Your Questions

### Q1: Do I need `rm -rf ~/Library/Caches/electron-demo-updater` every time?

**NO — only during testing/debugging.**

| Situation | Need to clear cache? |
|-----------|---------------------|
| Normal user installs and updates | ❌ Never |
| Testing same version repeatedly | ✅ Yes |
| Download got stuck/corrupted | ✅ Yes |
| Production release | ❌ Never |

---

### Q2: Dev vs Production — what's different?

| Feature | Dev `npm run start` | Production installed .dmg |
|---------|--------------------|-----------------------------|
| Update check | Simulated only | Real GitHub check every 30 min |
| Download | Fake progress bar | Real download from GitHub (~100MB) |
| Install | App just relaunches | Shell script replaces app in /Applications |
| Popup trigger | Click button manually | Auto after 3 seconds |
| Version shown | Always 99.0.0 | Real version from GitHub |

**In dev — everything is fake/simulated so you can test the UI safely.**
**In production — everything hits real GitHub Releases.**

---

### Q3: How to manage versions — release update workflow

**Simple rule: only change the version number in package.json, then publish.**

```
Current installed app: 1.0.7
You want to release update:
  → change "version": "1.0.7" to "version": "1.0.8" in package.json
  → npm run dist:publish
  → publish draft on GitHub
  → users see popup automatically ✅
```

You NEVER need to touch any other file. Just the version number.

---

## Version Number Rules

```
1.0.0  → First release
1.0.1  → Small bug fix
1.0.2  → Another bug fix
1.1.0  → New feature added
2.0.0  → Major redesign

Rules:
✅ Always go UP
✅ Never repeat a version
✅ Never go down
✅ Each publish must have unique version
```

---

## Every Time You Release an Update

```bash
# Step 1 — Change version in package.json
# "version": "1.0.8"  →  "version": "1.0.9"

# Step 2 — Publish to GitHub
npm run dist:publish

# Step 3 — Go to GitHub releases and publish the draft
# https://github.com/dhruvitestwork-lab/electron-test-demo/releases
# Click pencil icon → scroll down → click "Publish release"

# ✅ Done! Users with old version see popup within 3 minutes
```

---

## First Time Setup (one time only)

### 1. Set GH_TOKEN permanently
```bash
# Open profile file
nano ~/.zshrc

# Add this line at the very bottom
export GH_TOKEN=ghp_your_token_here

# Save: Ctrl+X → Y → Enter

# Apply
source ~/.zshrc

# Verify
echo $GH_TOKEN
```

### 2. Get GitHub Token
```
Go to: https://github.com/settings/tokens/new
Note:       electron-release
Expiration: No expiration
Check:      ✅ repo
Click:      Generate token
COPY IT — shown only once!
```

---

## All Run Commands

```bash
# Install packages (first time only)
npm install

# Development — test UI with fake updates
npm run start

# Build only — no publish (creates release/ folder)
npm run dist

# Build + publish to GitHub
npm run dist:publish
```

---

## Development Testing

```bash
npm run start
```

Then in the app — click **"Check for Update (Dev Test)"** button.
This simulates a fake v99.0.0 update so you can test the full popup flow without publishing anything.

---

## Production Flow

```
User has v1.0.7 installed
         │
         ▼ (3 seconds after opening)
Check GitHub → latest-mac.yml
         │
         ├── v1.0.8 found
         │        │
         │        ▼
         │   Popup: "v1.0.8 available"
         │        │
         │   User clicks "Download Update"
         │        │
         │        ▼
         │   Downloading... (progress bar)
         │   File saved to:
         │   ~/Library/Caches/electron-demo-updater/pending/
         │        │
         │   User clicks "Restart & Install"
         │        │
         │        ▼
         │   Script runs (/tmp/electron-install.sh):
         │     1. sleep 2 seconds
         │     2. unzip new app
         │     3. delete old /Applications/ElectronDemo.app
         │     4. copy new app to /Applications
         │     5. open new app
         │        │
         │        ▼
         │   Old app quits → new app opens ✅
         │
         └── no update → nothing shown, silent
```

---

## Project File Structure

```
electron-demo/
├── electron/
│   ├── main.ts                    ← Electron main process + updater
│   └── preload.ts                 ← Bridge electron ↔ react
├── src/
│   ├── components/
│   │   └── UpdateNotification.tsx ← Update popup UI
│   ├── hooks/
│   │   └── useAutoUpdater.ts      ← Update state hook
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json                   ← Change version here to release
├── electron-builder.json          ← Build config
├── tsconfig.electron.json
├── tsconfig.app.json
└── vite.config.ts
```

---

## Common Errors and Fixes

| Error | Fix |
|-------|-----|
| Popup not showing | Go to GitHub → release is Draft → click Publish release |
| `code signature` error | Normal for unsigned app — our script handles install manually |
| Update stuck at 0% | File is ~100MB — wait 1-2 minutes |
| `GH_TOKEN` not set | Run `export GH_TOKEN=xxx` in terminal |
| `main.cjs not found` | Run `npm run build:electron` first |
| `type: module` error | Remove `"type": "module"` from package.json |
| No popup after version bump | Check GitHub — release must be Published not Draft |
| sha512 mismatch | Run `rm -rf ~/Library/Caches/electron-demo-updater` and retry |

---

## GitHub Releases Page

After `npm run dist:publish`:
```
https://github.com/dhruvitestwork-lab/electron-test-demo/releases
```

You will see a **Draft** release — you MUST click **Publish release** for auto-updater to detect it.

Published release should contain:
```
✅ ElectronDemo-1.0.8.dmg
✅ ElectronDemo-1.0.8-arm64.dmg
✅ ElectronDemo-1.0.8-mac.zip
✅ ElectronDemo-1.0.8-arm64-mac.zip
✅ latest-mac.yml          ← auto-updater reads this
```

---

## Mac Type — Which DMG to Install

```bash
uname -m
# arm64  → M1 / M2 / M3 Mac → install ElectronDemo-X.X.X-arm64.dmg
# x86_64 → Intel Mac        → install ElectronDemo-X.X.X.dmg
```

---

## Cache Location (for debugging only)

```bash
# View cached downloads
ls ~/Library/Caches/electron-demo-updater/pending/

# Clear cache (only if stuck/corrupted)
rm -rf ~/Library/Caches/electron-demo-updater
```

---

## For Real Production App (future)

Currently the app is **unsigned** which is why install needs a shell script workaround. For a real production app with seamless 1-click updates:

1. Get **Apple Developer Account** ($99/year at developer.apple.com)
2. Get a **Developer ID Application** certificate
3. Add signing config to `electron-builder.json`
4. `quitAndInstall()` will work automatically — no shell script needed

For now the shell script method works perfectly for demos and internal tools.