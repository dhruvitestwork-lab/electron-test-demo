/* eslint-disable @typescript-eslint/no-explicit-any */
import { app, BrowserWindow, ipcMain, shell } from 'electron';
import { autoUpdater } from 'electron-updater';
import path from 'path';

const isDev = !app.isPackaged;
let mainWindow: BrowserWindow | null = null;

// ─── Window ───────────────────────────────────────────────────────────────────
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

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// ─── Helper ───────────────────────────────────────────────────────────────────
function send(channel: string, payload?: any) {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send(channel, payload);
  }
}

// ─── Auto Updater ─────────────────────────────────────────────────────────────
function setupAutoUpdater() {
  if (isDev) return; // skip in dev — use checkManually via IPC instead

  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = true;

  // Check on startup after 3 seconds
  setTimeout(() => {
    autoUpdater.checkForUpdates().catch(console.error);
  }, 3000);

  // Re-check every 30 minutes
  setInterval(() => {
    autoUpdater.checkForUpdates().catch(console.error);
  }, 30 * 60 * 1000);

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
// function setupIpc() {
//   ipcMain.on('update:start-download', () => {
//     autoUpdater.downloadUpdate().catch((err) => {
//       send('update:error', { message: err.message });
//     });
//   });

//   ipcMain.on('update:install-now', () => {
//     autoUpdater.quitAndInstall(false, true);
//   });

//   ipcMain.on('update:dismiss', () => {
//     // autoInstallOnAppQuit will handle it on next quit
//   });

//   ipcMain.on('update:open-url', (_e, url: string) => {
//     shell.openExternal(url);
//   });

//   // DEV ONLY — triggers a simulated update popup for UI testing
//   ipcMain.on('update:check-manually', () => {
//     if (isDev) {
//       setTimeout(() => {
//         send('update:available', {
//           version: '99.0.0',
//           releaseNotes: 'Simulated update for development testing.',
//           releaseDate: new Date().toISOString(),
//         });
//       }, 500);
//     } else {
//       autoUpdater.checkForUpdates().catch(console.error);
//     }
//   });
// }
function setupIpc() {
  ipcMain.on('update:start-download', () => {
    if (isDev) {
      // ── Simulate download progress in dev ──────────────────────────────────
      let percent = 0;
      const interval = setInterval(() => {
        percent += 10;
        send('update:download-progress', {
          percent,
          transferred: percent * 1024 * 100,
          total: 1024 * 1000,
          bytesPerSecond: 1024 * 500,
        });

        if (percent >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            send('update:downloaded', {
              version: '99.0.0',
              releaseNotes: 'Simulated update for development testing.',
            });
          }, 300);
        }
      }, 400);
    } else {
      autoUpdater.downloadUpdate().catch((err) => {
        send('update:error', { message: err.message });
      });
    }
  });

  ipcMain.on('update:install-now', () => {
    if (!isDev) autoUpdater.quitAndInstall(false, true);
  });

  ipcMain.on('update:dismiss', () => {
    // autoInstallOnAppQuit will handle it on next quit
  });

  ipcMain.on('update:open-url', (_e, url: string) => {
    shell.openExternal(url);
  });

  ipcMain.on('update:check-manually', () => {
    if (isDev) {
      setTimeout(() => {
        send('update:available', {
          version: '99.0.0',
          releaseNotes: 'Simulated update for development testing.',
          releaseDate: new Date().toISOString(),
        });
      }, 500);
    } else {
      autoUpdater.checkForUpdates().catch(console.error);
    }
  });
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