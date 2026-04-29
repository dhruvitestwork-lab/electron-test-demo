// // import { app, BrowserWindow } from 'electron'
// // import path from 'path'

// // const isDev = !app.isPackaged

// // function createWindow() {
// //   const win = new BrowserWindow({
// //     width: 1200,
// //     height: 800,
// //      webPreferences: {
// //       preload: path.join(__dirname, 'preload.js'),
// //     },
// //   })

// //   const startUrl = isDev
// //     ? 'http://localhost:3000'
// //     : `file://${path.join(__dirname, '../dist/index.html')}`

// //   win.loadURL(startUrl)

// //   if (isDev) {
// //     win.webContents.openDevTools()
// //   }
// // }

// // app.whenReady().then(createWindow)

// import { app, BrowserWindow, ipcMain, shell } from 'electron';
// import { autoUpdater } from 'electron-updater';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

// const isDev = !app.isPackaged;

// let mainWindow: BrowserWindow | null = null;

// // ─── Auto Updater Config ─────────────────────────────────────────────────────

// function setupAutoUpdater() {
//   // Don't check for updates in development
//   if (isDev) return;

//   autoUpdater.autoDownload = false;        // ask user before downloading
//   autoUpdater.autoInstallOnAppQuit = true; // install on next quit

//   // Check for updates every 30 minutes
//   const CHECK_INTERVAL = 30 * 60 * 1000;
//   setInterval(() => autoUpdater.checkForUpdates(), CHECK_INTERVAL);

//   // Also check on startup (after 3s delay to let app settle)
//   setTimeout(() => autoUpdater.checkForUpdates(), 3000);

//   // ── Updater Events ──────────────────────────────────────────────────────────

//   autoUpdater.on('checking-for-update', () => {
//     sendToRenderer('update:checking');
//   });

//   autoUpdater.on('update-available', (info) => {
//     sendToRenderer('update:available', {
//       version: info.version,
//       releaseNotes: info.releaseNotes,
//       releaseDate: info.releaseDate,
//     });
//   });

//   autoUpdater.on('update-not-available', () => {
//     sendToRenderer('update:not-available');
//   });

//   autoUpdater.on('download-progress', (progress) => {
//     sendToRenderer('update:download-progress', {
//       percent: Math.round(progress.percent),
//       transferred: progress.transferred,
//       total: progress.total,
//       bytesPerSecond: progress.bytesPerSecond,
//     });
//   });

//   autoUpdater.on('update-downloaded', (info) => {
//     sendToRenderer('update:downloaded', {
//       version: info.version,
//       releaseNotes: info.releaseNotes,
//     });
//   });

//   autoUpdater.on('error', (err) => {
//     sendToRenderer('update:error', { message: err.message });
//   });
// }

// // ─── IPC Handlers ────────────────────────────────────────────────────────────

// function setupIpcHandlers() {
//   // Renderer asks to start download
//   ipcMain.on('update:start-download', () => {
//     autoUpdater.downloadUpdate();
//   });

//   // Renderer asks to install now and restart
//   ipcMain.on('update:install-now', () => {
//     autoUpdater.quitAndInstall(false, true);
//   });

//   // Renderer asks to dismiss / install later
//   ipcMain.on('update:dismiss', () => {
//     // Do nothing — autoInstallOnAppQuit will handle it
//   });

//   // Open release notes URL
//   ipcMain.on('update:open-release-notes', (_event, url: string) => {
//     shell.openExternal(url);
//   });

//   // Manual check triggered from renderer
//   ipcMain.on('update:check-manually', () => {
//     if (!isDev) {
//       autoUpdater.checkForUpdates();
//     } else {
//       // In dev, simulate an available update for testing
//       sendToRenderer('update:available', {
//         version: '9.9.9',
//         releaseNotes: 'Test update from dev mode.',
//         releaseDate: new Date().toISOString(),
//       });
//     }
//   });
// }

// // ─── Helpers ─────────────────────────────────────────────────────────────────

// function sendToRenderer(channel: string, data?: unknown) {
//   if (mainWindow && !mainWindow.isDestroyed()) {
//     mainWindow.webContents.send(channel, data);
//   }
// }

// // ─── Window ──────────────────────────────────────────────────────────────────

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1280,
//     height: 800,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.cjs'),
//       contextIsolation: true,
//       nodeIntegration: false,
//     },
//   });

//   if (isDev) {
//     mainWindow.loadURL('http://localhost:3000');
//     mainWindow.webContents.openDevTools();
//   } else {
//     mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
//   }

//   mainWindow.on('closed', () => {
//     mainWindow = null;
//   });
// }

// // ─── App Lifecycle ───────────────────────────────────────────────────────────

// app.whenReady().then(() => {
//   createWindow();
//   setupIpcHandlers();
//   setupAutoUpdater();

//   app.on('activate', () => {
//     if (BrowserWindow.getAllWindows().length === 0) createWindow();
//   });
// });

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit();
// });

import { app, BrowserWindow, ipcMain, shell } from 'electron';
import { autoUpdater } from 'electron-updater';
import path from 'path';

// ── CommonJS compatible __dirname (works with "module": "CommonJS") ──────────
// Do NOT use import.meta.url here — tsconfig.electron.json targets CommonJS
const isDev = !app.isPackaged;

let mainWindow: BrowserWindow | null = null;

// ─── Window ───────────────────────────────────────────────────────────────────

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      // __dirname works because tsc compiles to CJS and preserves it
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
    // mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// ─── Auto Updater ─────────────────────────────────────────────────────────────

function setupAutoUpdater() {
  // Skip real update checks in dev — use manual trigger instead
  if (isDev) {
    // Allow renderer to trigger a simulated update in dev
    return;
  }

  autoUpdater.autoDownload = false;        // user must confirm download
  autoUpdater.autoInstallOnAppQuit = true; // install silently on next quit

  // Check on startup after 3 s
  setTimeout(() => {
    autoUpdater.checkForUpdates().catch((err) => {
      console.error('[updater] checkForUpdates error:', err);
    });
  }, 3000);

  // Re-check every 30 minutes
  setInterval(() => {
    autoUpdater.checkForUpdates().catch((err) => {
      console.error('[updater] periodic check error:', err);
    });
  }, 30 * 60 * 1000);

  // ── Events ──────────────────────────────────────────────────────────────────

  autoUpdater.on('checking-for-update', () => {
    send('update:checking');
  });

  autoUpdater.on('update-available', (info) => {
    send('update:available', {
      version: info.version,
      releaseNotes: info.releaseNotes ?? null,
      releaseDate: info.releaseDate ?? null,
    });
  });

  autoUpdater.on('update-not-available', () => {
    send('update:not-available');
  });

  autoUpdater.on('download-progress', (p) => {
    send('update:download-progress', {
      percent: Math.round(p.percent),
      transferred: p.transferred,
      total: p.total,
      bytesPerSecond: p.bytesPerSecond,
    });
  });

  autoUpdater.on('update-downloaded', (info) => {
    send('update:downloaded', {
      version: info.version,
      releaseNotes: info.releaseNotes ?? null,
    });
  });

  autoUpdater.on('error', (err) => {
    send('update:error', { message: err.message });
  });
}

// ─── IPC ──────────────────────────────────────────────────────────────────────

function setupIpc() {
  // Start downloading the update
  ipcMain.on('update:start-download', () => {
    autoUpdater.downloadUpdate().catch((err) => {
      send('update:error', { message: err.message });
    });
  });

  // Quit and install immediately
  ipcMain.on('update:install-now', () => {
    autoUpdater.quitAndInstall(false, true);
  });

  // Dismiss — autoInstallOnAppQuit handles it later
  ipcMain.on('update:dismiss', () => {
    /* intentionally empty */
  });

  // Open a URL in the system browser (e.g. release notes)
  ipcMain.on('update:open-url', (_e, url: string) => {
    shell.openExternal(url);
  });

  // Manual check — in dev sends a fake event so you can test UI
  ipcMain.on('update:check-manually', () => {
    if (isDev) {
      // Simulate an available update after 500 ms
      setTimeout(() => {
        send('update:available', {
          version: '99.0.0',
          releaseNotes: 'This is a simulated update for development testing.',
          releaseDate: new Date().toISOString(),
        });
      }, 500);
    } else {
      autoUpdater.checkForUpdates().catch((err) => {
        send('update:error', { message: err.message });
      });
    }
  });
}

// ─── Helper ───────────────────────────────────────────────────────────────────

function send(channel: string, payload?: unknown) {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send(channel, payload);
  }
}

// ─── Lifecycle ────────────────────────────────────────────────────────────────

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