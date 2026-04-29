# Electron Auto-Updater — Complete Setup Guide

## Required Packages

```bash
npm install electron-updater
npm install --save-dev electron electron-builder concurrently wait-on typescript @types/node @types/react @types/react-dom @vitejs/plugin-react vite
```

---

## Project File Structure

```
electron-demo/
├── electron/
│   ├── main.ts                          ← Electron main process
│   └── preload.ts                       ← Bridge between electron & react
├── src/
│   ├── components/
│   │   └── UpdateNotification.tsx       ← Update popup UI
│   ├── hooks/
│   │   └── useAutoUpdater.ts            ← Update logic hook
│   ├── App.tsx                          ← Main React app
│   ├── App.css
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json                         ← Scripts & dependencies
├── electron-builder.json                ← Build & publish config
├── tsconfig.json
├── tsconfig.electron.json               ← TypeScript config for electron
├── tsconfig.app.json                    ← TypeScript config for react
└── vite.config.ts
```

---

## All Required Files Content

### package.json
```json
{
  "name": "electron-demo",
  "private": true,
  "version": "1.0.0",
  "main": "electron-dist/main.cjs",
  "scripts": {
    "dev": "vite",
    "electron": "electron .",
    "start": "concurrently \"vite\" \"wait-on http://localhost:3000 && electron .\"",
    "build": "tsc -b && vite build",
    "build:electron": "tsc -p tsconfig.electron.json && node -e \"require('fs').renameSync('electron-dist/main.js','electron-dist/main.cjs')\"",
    "dist": "npm run build && npm run build:electron && electron-builder",
    "dist:publish": "npm run build && npm run build:electron && electron-builder --publish always"
  },
  "dependencies": {
    "electron-updater": "^6.8.3",
    "react": "^19.2.5",
    "react-dom": "^19.2.5"
  },
  "devDependencies": {
    "@types/node": "^24.12.2",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.1",
    "concurrently": "^9.2.1",
    "electron": "^41.3.0",
    "electron-builder": "^26.8.1",
    "typescript": "~6.0.2",
    "vite": "^8.0.10",
    "wait-on": "^9.0.5"
  }
}
```
> ⚠️ NO "type": "module" — must not be in package.json

---

### electron-builder.json
```json
{
  "appId": "com.electron.demo",
  "productName": "ElectronDemo",
  "directories": {
    "output": "release"
  },
  "extraMetadata": {
    "main": "electron-dist/main.cjs"
  },
  "files": [
    "dist/**/*",
    "electron-dist/**/*",
    "package.json"
  ],
  "mac": {
    "category": "public.app-category.productivity",
    "target": [
      { "target": "dmg", "arch": ["x64", "arm64"] },
      { "target": "zip", "arch": ["x64", "arm64"] }
    ]
  },
  "win": {
    "target": [
      { "target": "nsis", "arch": ["x64"] }
    ]
  },
  "nsis": {
    "oneClick": false,
    "allowToChangeInstallationDirectory": true
  },
  "publish": {
    "provider": "github",
    "owner": "dhruvitestwork-lab",
    "repo": "electron-test-demo",
    "private": false
  }
}
```

---

### tsconfig.electron.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "moduleResolution": "node",
    "ignoreDeprecations": "6.0",
    "outDir": "electron-dist",
    "rootDir": "electron",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "ts-node": {
    "esm": false
  },
  "include": ["electron"]
}
```

---

### tsconfig.app.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true
  },
  "include": ["src"]
}
```

---

### tsconfig.json
```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.electron.json" }
  ]
}
```

---

### vite.config.ts
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    port: 3000,
  },
});
```

---

### electron/main.ts
```typescript
import { app, BrowserWindow, ipcMain, shell } from 'electron';
import { autoUpdater } from 'electron-updater';
import path from 'path';

const isDev = !app.isPackaged;
let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.on('closed', () => { mainWindow = null; });
}

function send(channel: string, payload?: any) {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send(channel, payload);
  }
}

function setupAutoUpdater() {
  if (isDev) return;

  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = true;

  setTimeout(() => autoUpdater.checkForUpdates().catch(console.error), 3000);
  setInterval(() => autoUpdater.checkForUpdates().catch(console.error), 30 * 60 * 1000);

  autoUpdater.on('checking-for-update', () => send('update:checking'));
  autoUpdater.on('update-available', (info) => send('update:available', {
    version: info.version,
    releaseNotes: info.releaseNotes ?? null,
    releaseDate: info.releaseDate ?? null,
  }));
  autoUpdater.on('update-not-available', () => send('update:not-available'));
  autoUpdater.on('download-progress', (p) => send('update:download-progress', {
    percent: Math.round(p.percent),
    transferred: p.transferred,
    total: p.total,
    bytesPerSecond: p.bytesPerSecond,
  }));
  autoUpdater.on('update-downloaded', (info) => send('update:downloaded', {
    version: info.version,
    releaseNotes: info.releaseNotes ?? null,
  }));
  autoUpdater.on('error', (err) => send('update:error', { message: err.message }));
}

function setupIpc() {
  ipcMain.on('update:start-download', () => {
    autoUpdater.downloadUpdate().catch((err) => send('update:error', { message: err.message }));
  });
  ipcMain.on('update:install-now', () => autoUpdater.quitAndInstall(false, true));
  ipcMain.on('update:dismiss', () => {});
  ipcMain.on('update:open-url', (_e, url: string) => shell.openExternal(url));
  ipcMain.on('update:check-manually', () => {
    if (isDev) {
      setTimeout(() => send('update:available', {
        version: '99.0.0',
        releaseNotes: 'Simulated update for dev testing.',
        releaseDate: new Date().toISOString(),
      }), 500);
    } else {
      autoUpdater.checkForUpdates().catch(console.error);
    }
  });
}

app.whenReady().then(() => {
  createWindow();
  setupIpc();
  setupAutoUpdater();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
```

---

### electron/preload.ts
```typescript
import { contextBridge, ipcRenderer } from 'electron';

type Cb = (...args: any[]) => void;
const on = (channel: string, cb: Cb) => {
  ipcRenderer.on(channel, (_event, ...args) => cb(...args));
};

contextBridge.exposeInMainWorld('electronUpdater', {
  onChecking:         (cb: Cb) => on('update:checking', cb),
  onAvailable:        (cb: Cb) => on('update:available', cb),
  onNotAvailable:     (cb: Cb) => on('update:not-available', cb),
  onDownloadProgress: (cb: Cb) => on('update:download-progress', cb),
  onDownloaded:       (cb: Cb) => on('update:downloaded', cb),
  onError:            (cb: Cb) => on('update:error', cb),
  startDownload:      () => ipcRenderer.send('update:start-download'),
  installNow:         () => ipcRenderer.send('update:install-now'),
  dismiss:            () => ipcRenderer.send('update:dismiss'),
  checkManually:      () => ipcRenderer.send('update:check-manually'),
  openUrl:  (url: string) => ipcRenderer.send('update:open-url', url),
  removeAllListeners: () => {
    ['update:checking','update:available','update:not-available',
     'update:download-progress','update:downloaded','update:error']
      .forEach((ch) => ipcRenderer.removeAllListeners(ch));
  },
});
```

---

### src/hooks/useAutoUpdater.ts
```typescript
import { useCallback, useEffect, useState } from 'react';

export type UpdateStatus =
  | 'idle' | 'checking' | 'available'
  | 'downloading' | 'downloaded' | 'not-available' | 'error';

export interface UpdateInfo {
  version: string;
  releaseNotes?: string | null;
  releaseDate?: string | null;
}

export interface DownloadProgress {
  percent: number;
  transferred: number;
  total: number;
  bytesPerSecond: number;
}

export interface UpdateState {
  status: UpdateStatus;
  info: UpdateInfo | null;
  progress: DownloadProgress | null;
  error: string | null;
}

declare global {
  interface Window {
    electronUpdater?: {
      onChecking:         (cb: () => void) => void;
      onAvailable:        (cb: (info: UpdateInfo) => void) => void;
      onNotAvailable:     (cb: () => void) => void;
      onDownloadProgress: (cb: (p: DownloadProgress) => void) => void;
      onDownloaded:       (cb: (info: UpdateInfo) => void) => void;
      onError:            (cb: (err: { message: string }) => void) => void;
      startDownload:      () => void;
      installNow:         () => void;
      dismiss:            () => void;
      checkManually:      () => void;
      openUrl:            (url: string) => void;
      removeAllListeners: () => void;
    };
  }
}

const IDLE: UpdateState = { status: 'idle', info: null, progress: null, error: null };

export function useAutoUpdater() {
  const [state, setState] = useState<UpdateState>(IDLE);
  const api = window.electronUpdater;

  useEffect(() => {
    if (!api) return;
    api.onChecking(() => setState((s) => ({ ...s, status: 'checking', error: null })));
    api.onAvailable((info) => setState({ status: 'available', info, progress: null, error: null }));
    api.onNotAvailable(() => setState((s) => ({ ...s, status: 'not-available' })));
    api.onDownloadProgress((progress) => setState((s) => ({ ...s, status: 'downloading', progress })));
    api.onDownloaded((info) => setState((s) => ({ ...s, status: 'downloaded', info: s.info ?? info, progress: null })));
    api.onError((err) => setState((s) => ({ ...s, status: 'error', error: err.message })));
    return () => api.removeAllListeners();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const startDownload  = useCallback(() => { setState((s) => ({ ...s, status: 'downloading', progress: null })); api?.startDownload(); }, [api]);
  const installNow     = useCallback(() => api?.installNow(), [api]);
  const dismiss        = useCallback(() => { api?.dismiss(); setState(IDLE); }, [api]);
  const checkManually  = useCallback(() => api?.checkManually(), [api]);

  return { state, startDownload, installNow, dismiss, checkManually };
}
```

---

### src/components/UpdateNotification.tsx
```tsx
import { useAutoUpdater } from '../hooks/useAutoUpdater';

export default function UpdateNotification() {
  const { state, startDownload, installNow, dismiss } = useAutoUpdater();
  const { status, info, progress, error } = state;

  if (status === 'idle' || status === 'not-available') return null;

  return (
    <div style={styles.banner}>
      <div style={styles.header}>
        <span style={styles.title}>
          {status === 'checking'    && '🔍 Checking for updates…'}
          {status === 'available'   && `🆕 Version ${info?.version} available`}
          {status === 'downloading' && `⬇️ Downloading ${progress?.percent ?? 0}%`}
          {status === 'downloaded'  && `✅ v${info?.version} ready to install`}
          {status === 'error'       && '❌ Update failed'}
        </span>
        {status !== 'downloading' && (
          <button style={styles.closeBtn} onClick={dismiss}>✕</button>
        )}
      </div>

      {status === 'downloading' && (
        <div style={styles.track}>
          <div style={{ ...styles.fill, width: `${progress?.percent ?? 0}%` }} />
        </div>
      )}

      {status === 'available' && info?.releaseNotes && (
        <p style={styles.notes}>
          {String(info.releaseNotes).replace(/<[^>]+>/g, '').slice(0, 120)}…
        </p>
      )}

      {status === 'error' && <p style={styles.errorText}>{error}</p>}

      <div style={styles.row}>
        {status === 'available' && (
          <>
            <button style={styles.primary} onClick={startDownload}>Download Update</button>
            <button style={styles.secondary} onClick={dismiss}>Later</button>
          </>
        )}
        {status === 'downloaded' && (
          <>
            <button style={styles.primary} onClick={installNow}>🔄 Restart & Install</button>
            <button style={styles.secondary} onClick={dismiss}>On Next Quit</button>
          </>
        )}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  banner: {
    position: 'fixed', bottom: 24, right: 24, width: 340,
    background: '#1a1a2e', color: '#fff', borderRadius: 14,
    padding: '16px 18px', boxShadow: '0 8px 32px rgba(0,0,0,0.55)',
    zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 10,
    fontFamily: 'system-ui, sans-serif',
  },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 14, fontWeight: 600 },
  closeBtn: { background: 'transparent', border: 'none', color: '#888', cursor: 'pointer', fontSize: 16, padding: 0 },
  notes: { margin: 0, fontSize: 12, color: '#aaa', maxHeight: 60, overflow: 'hidden' },
  track: { background: '#2e2e4a', borderRadius: 6, height: 6, overflow: 'hidden' },
  fill: { background: 'linear-gradient(90deg, #7c6fff, #a78bfa)', height: '100%', transition: 'width 0.3s ease' },
  row: { display: 'flex', gap: 8 },
  primary: { flex: 1, padding: '9px 12px', borderRadius: 8, border: 'none', background: '#7c6fff', color: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: 13 },
  secondary: { flex: 1, padding: '9px 12px', borderRadius: 8, border: '1px solid #3a3a5a', background: 'transparent', color: '#aaa', cursor: 'pointer', fontSize: 13 },
  errorText: { margin: 0, fontSize: 12, color: '#ff6b6b' },
};
```

---

### src/App.tsx
```tsx
import './App.css';
import UpdateNotification from './components/UpdateNotification';

function App() {
  return (
    <div className="app">
      <h1>Electron Demo</h1>

      {/* DEV ONLY — remove this button in production */}
      <button onClick={() => window.electronUpdater?.checkManually()}>
        Test Update Popup (Dev Only)
      </button>

      <UpdateNotification />
    </div>
  );
}

export default App;
```

---

## GH_TOKEN — Where to Put It

### Option 1 — Terminal (temporary, only works in same terminal window)
```bash
export GH_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
```

### Option 2 — .zshrc (permanent, works everywhere — RECOMMENDED)
```bash
# Open .zshrc file
nano ~/.zshrc

# Add this line at the very bottom
export GH_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx

# Save: press Ctrl+X → Y → Enter

# Apply changes
source ~/.zshrc

# Verify
echo $GH_TOKEN
```

### Option 3 — .env file in project (good for team projects)
```
# .env  (create this file in project root)
GH_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
```
Add to .gitignore:
```
.env
```

---

## How to Get GH_TOKEN

```
1. Go to: https://github.com/settings/tokens/new
2. Note:       electron-release
3. Expiration: No expiration
4. Check:      ✅ repo  (full control of private repositories)
5. Click:      Generate token
6. COPY IT IMMEDIATELY — shown only once!
```

---

## Run Commands — Step by Step

### Every time you change code (fresh start)
```bash
npm install
```

### Development — test your UI
```bash
npm run start
```
Then test update popup — in DevTools Console type:
```javascript
window.electronUpdater.checkManually()
```

### Build only (no publish)
```bash
npm run dist
```
DMG files appear in `release/` folder.

### First time — Publish v1.0.0 to GitHub
```bash
# Step 1 — make sure version is "1.0.0" in package.json

# Step 2 — set token (if using Option 1)
export GH_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx

# Step 3 — build + publish
npm run dist:publish
```

### Publish a new update — v1.0.1
```bash
# Step 1 — change version in package.json to "1.0.1"

# Step 2 — publish
npm run dist:publish
```

### Install your app (Mac)
```bash
open release/
# Double click:
# M1/M2/M3 Mac → ElectronDemo-1.0.0-arm64.dmg
# Intel Mac    → ElectronDemo-1.0.0.dmg
```

Check your Mac type:
```bash
uname -m
# arm64  = M1/M2/M3
# x86_64 = Intel
```

---

## Full Update Flow

```
1. Build & publish v1.0.0 → npm run dist:publish
         ↓
2. Install v1.0.0 DMG from release/ folder
         ↓
3. Change version to "1.0.1" in package.json
         ↓
4. Build & publish v1.0.1 → npm run dist:publish
         ↓
5. Open installed v1.0.0 app
         ↓
6. Wait 3 seconds (auto check runs)
         ↓
7. ✅ Popup appears → "Version 1.0.1 available"
         ↓
8. Click "Download Update" → progress bar 0→100%
         ↓
9. Click "Restart & Install"
         ↓
10. App restarts as v1.0.1 ✅
```

---

## Common Errors & Fixes

| Error | Fix |
|-------|-----|
| `main.cjs not found` | Run `npm run build:electron` first |
| `GH_TOKEN not set` | Run `export GH_TOKEN=xxx` in same terminal |
| `type: module error` | Remove `"type": "module"` from package.json |
| `moduleResolution deprecated` | Add `"ignoreDeprecations": "6.0"` in tsconfig.electron.json |
| `unknown property 'main'` | Remove `"main"` from electron-builder.json root, use `extraMetadata` |
| `electronUpdater declared twice` | Remove from electron.d.ts, keep only in useAutoUpdater.ts |
| Update not detected | Make sure `latest-mac.yml` uploaded to GitHub Releases |

---

## GitHub Releases Check

After `npm run dist:publish`, go to:
```
https://github.com/dhruvitestwork-lab/electron-test-demo/releases
```

You should see:
```
✅ v1.0.0
   ElectronDemo-1.0.0.dmg
   ElectronDemo-1.0.0-arm64.dmg
   ElectronDemo-1.0.0-mac.zip
   ElectronDemo-1.0.0-arm64-mac.zip
   latest-mac.yml          ← this is what auto-updater reads
```
