// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { app, BrowserWindow, ipcMain, shell } from 'electron';
// import { autoUpdater } from 'electron-updater';
// import path from 'path';

// const isDev = !app.isPackaged;
// let mainWindow: BrowserWindow | null = null;

// // ─── Window ───────────────────────────────────────────────────────────────────
// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1280,
//     height: 800,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'),
//       contextIsolation: true,
//       nodeIntegration: false,
//     },
//   });

//   if (isDev) {
//     mainWindow.loadURL('http://localhost:3000');
//   } else {
//     mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
//   }

//   mainWindow.on('closed', () => {
//     mainWindow = null;
//   });
// }

// // ─── Helper ───────────────────────────────────────────────────────────────────
// function send(channel: string, payload?: any) {
//   if (mainWindow && !mainWindow.isDestroyed()) {
//     mainWindow.webContents.send(channel, payload);
//   }
// }

// // ─── Auto Updater ─────────────────────────────────────────────────────────────
// function setupAutoUpdater() {
//   if (isDev) return; // skip in dev — use checkManually via IPC instead

//   autoUpdater.autoDownload = false;
//   autoUpdater.autoInstallOnAppQuit = true;

//   // Check on startup after 3 seconds
//   setTimeout(() => {
//     autoUpdater.checkForUpdates().catch(console.error);
//   }, 3000);

//   // Re-check every 30 minutes
//   setInterval(() => {
//     autoUpdater.checkForUpdates().catch(console.error);
//   }, 30 * 60 * 1000);

//   autoUpdater.on('checking-for-update', () => {
//     send('update:checking');
//   });

//   autoUpdater.on('update-available', (info) => {
//     send('update:available', {
//       version: info.version,
//       releaseNotes: info.releaseNotes ?? null,
//       releaseDate: info.releaseDate ?? null,
//     });
//   });

//   autoUpdater.on('update-not-available', () => {
//     send('update:not-available');
//   });

//   autoUpdater.on('download-progress', (p) => {
//     send('update:download-progress', {
//       percent: Math.round(p.percent),
//       transferred: p.transferred,
//       total: p.total,
//       bytesPerSecond: p.bytesPerSecond,
//     });
//   });

//   autoUpdater.on('update-downloaded', (info) => {
//     send('update:downloaded', {
//       version: info.version,
//       releaseNotes: info.releaseNotes ?? null,
//     });
//   });

//   autoUpdater.on('error', (err) => {
//     send('update:error', { message: err.message });
//   });
// }

// // ─── IPC ──────────────────────────────────────────────────────────────────────
// // function setupIpc() {
// //   ipcMain.on('update:start-download', () => {
// //     autoUpdater.downloadUpdate().catch((err) => {
// //       send('update:error', { message: err.message });
// //     });
// //   });

// //   ipcMain.on('update:install-now', () => {
// //     autoUpdater.quitAndInstall(false, true);
// //   });

// //   ipcMain.on('update:dismiss', () => {
// //     // autoInstallOnAppQuit will handle it on next quit
// //   });

// //   ipcMain.on('update:open-url', (_e, url: string) => {
// //     shell.openExternal(url);
// //   });

// //   // DEV ONLY — triggers a simulated update popup for UI testing
// //   ipcMain.on('update:check-manually', () => {
// //     if (isDev) {
// //       setTimeout(() => {
// //         send('update:available', {
// //           version: '99.0.0',
// //           releaseNotes: 'Simulated update for development testing.',
// //           releaseDate: new Date().toISOString(),
// //         });
// //       }, 500);
// //     } else {
// //       autoUpdater.checkForUpdates().catch(console.error);
// //     }
// //   });
// // }
// function setupIpc() {
//   ipcMain.on('update:start-download', () => {
//     if (isDev) {
//       // ── Simulate download progress in dev ──────────────────────────────────
//       let percent = 0;
//       const interval = setInterval(() => {
//         percent += 10;
//         send('update:download-progress', {
//           percent,
//           transferred: percent * 1024 * 100,
//           total: 1024 * 1000,
//           bytesPerSecond: 1024 * 500,
//         });

//         if (percent >= 100) {
//           clearInterval(interval);
//           setTimeout(() => {
//             send('update:downloaded', {
//               version: '99.0.0',
//               releaseNotes: 'Simulated update for development testing.',
//             });
//           }, 300);
//         }
//       }, 400);
//     } else {
//       autoUpdater.downloadUpdate().catch((err) => {
//         send('update:error', { message: err.message });
//       });
//     }
//   });

//   ipcMain.on('update:install-now', () => {
//     if (!isDev) autoUpdater.quitAndInstall(false, true);
//   });

//   ipcMain.on('update:dismiss', () => {
//     // autoInstallOnAppQuit will handle it on next quit
//   });

//   ipcMain.on('update:open-url', (_e, url: string) => {
//     shell.openExternal(url);
//   });

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

// // ─── Lifecycle ────────────────────────────────────────────────────────────────
// app.whenReady().then(() => {
//   createWindow();
//   setupIpc();
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
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import os from 'os';

const isDev = !app.isPackaged;
let mainWindow: BrowserWindow | null = null;
let updateDownloaded = false;
let downloadedVersion = '';

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
  mainWindow.on('closed', () => { mainWindow = null; });
}

// ─── Helper ───────────────────────────────────────────────────────────────────
function send(channel: string, payload?: any) {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send(channel, payload);
  }
}

// ─── Find cached ZIP ──────────────────────────────────────────────────────────
function findCachedZip(version: string): string | null {
  const cacheDir = path.join(
    os.homedir(), 'Library', 'Caches',
    'electron-demo-updater', 'pending'
  );

  console.log('[updater] looking in cache dir:', cacheDir);

  if (!fs.existsSync(cacheDir)) {
    console.log('[updater] cache dir not found');
    return null;
  }

  const files = fs.readdirSync(cacheDir);
  console.log('[updater] files in cache:', files);

  // Check specific names first
  const candidates = [
    `ElectronDemo-${version}-mac.zip`,
    `ElectronDemo-${version}-arm64-mac.zip`,
  ];

  for (const name of candidates) {
    const full = path.join(cacheDir, name);
    if (fs.existsSync(full)) {
      console.log('[updater] found:', full);
      return full;
    }
  }

  // Fallback — any zip with this version
  const found = files.find(f => f.includes(version) && f.endsWith('.zip'));
  if (found) {
    const full = path.join(cacheDir, found);
    console.log('[updater] fallback found:', full);
    return full;
  }

  console.log('[updater] no zip found for version:', version);
  return null;
}

// ─── Install via shell script ─────────────────────────────────────────────────
function installViaScript(zipPath: string) {
  const extractDir = path.join(os.tmpdir(), 'electron-update-' + Date.now());
  const appDest = '/Applications/ElectronDemo.app';
  const scriptPath = path.join(os.tmpdir(), 'electron-install.sh');

  const script = [
    '#!/bin/bash',
    'sleep 2',                                          // wait for app to quit
    `rm -rf "${extractDir}"`,
    `mkdir -p "${extractDir}"`,
    `unzip -o "${zipPath}" -d "${extractDir}"`,         // extract zip
    `rm -rf "${appDest}"`,                              // remove old app
    `cp -R "${extractDir}/ElectronDemo.app" "/Applications/"`, // install new
    `rm -rf "${extractDir}"`,                           // cleanup
    `open "${appDest}"`,                                // launch new app
  ].join('\n');

  fs.writeFileSync(scriptPath, script, { mode: 0o755 });
  console.log('[updater] install script:', scriptPath);
  console.log('[updater] zip path:', zipPath);

  const child = spawn('bash', [scriptPath], {
    detached: true,
    stdio: 'ignore',
  });
  child.unref();

  // Quit current app after 500ms
  setTimeout(() => app.exit(0), 500);
}

// ─── Auto Updater ─────────────────────────────────────────────────────────────
function setupAutoUpdater() {
  if (isDev) return;

  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = false;

// Auto-clear cache on every startup so update modal always shows
  const cacheDir = path.join(
    os.homedir(), 'Library', 'Caches',
    'electron-demo-updater'
  );
  if (fs.existsSync(cacheDir)) {
    fs.rmSync(cacheDir, { recursive: true, force: true });
    console.log('[updater] cache cleared on startup');
  }

  setTimeout(() => autoUpdater.checkForUpdates().catch(console.error), 3000);
  setInterval(() => autoUpdater.checkForUpdates().catch(console.error), 30 * 60 * 1000);

  autoUpdater.on('checking-for-update', () => {
    console.log('[updater] checking...');
    send('update:checking');
  });

  autoUpdater.on('update-available', (info) => {
    console.log('[updater] update available:', info.version);
    updateDownloaded = false;
    downloadedVersion = '';
    send('update:available', {
      version: info.version,
      releaseNotes: info.releaseNotes ?? null,
      releaseDate: info.releaseDate ?? null,
    });
  });

  autoUpdater.on('update-not-available', () => {
    console.log('[updater] up to date');
    send('update:not-available');
  });

  autoUpdater.on('download-progress', (p) => {
    console.log('[updater] progress:', Math.round(p.percent) + '%');
    send('update:download-progress', {
      percent: Math.round(p.percent),
      transferred: p.transferred,
      total: p.total,
      bytesPerSecond: p.bytesPerSecond,
    });
  });

  autoUpdater.on('update-downloaded', (info) => {
    console.log('[updater] downloaded version:', info.version);
    updateDownloaded = true;
    downloadedVersion = info.version;
    send('update:downloaded', {
      version: info.version,
      releaseNotes: info.releaseNotes ?? null,
    });
  });

  // IMPORTANT: ignore code signature error — we handle install ourselves
  autoUpdater.on('error', (err) => {
    console.error('[updater] error:', err.message);
    if (
      err.message.includes('code signature') ||
      err.message.includes('Could not get code')
    ) {
      console.log('[updater] ignoring signature error, using manual install');
      return; // do NOT send to renderer
    }
    send('update:error', { message: err.message });
  });
}

// ─── IPC ──────────────────────────────────────────────────────────────────────
function setupIpc() {
  ipcMain.on('update:start-download', () => {
    if (isDev) {
      let percent = 0;
      const iv = setInterval(() => {
        percent += 10;
        send('update:download-progress', {
          percent,
          transferred: percent * 1024 * 100,
          total: 1024 * 1000,
          bytesPerSecond: 1024 * 500,
        });
        if (percent >= 100) {
          clearInterval(iv);
          setTimeout(() => {
            updateDownloaded = true;
            downloadedVersion = '99.0.0';
            send('update:downloaded', { version: '99.0.0', releaseNotes: null });
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
    console.log('[updater] install-now received, downloaded:', updateDownloaded, 'version:', downloadedVersion);

    if (isDev) {
      send('update:relaunch-soon');
      setTimeout(() => { app.relaunch(); app.quit(); }, 500);
      return;
    }

    if (!updateDownloaded || !downloadedVersion) {
      send('update:error', { message: 'Update not ready. Please wait.' });
      return;
    }

    const zipPath = findCachedZip(downloadedVersion);
    console.log('[updater] zip path found:', zipPath);

    if (zipPath && fs.existsSync(zipPath)) {
      send('update:relaunch-soon');
      installViaScript(zipPath);
    } 
    else {
      // Last resort — open GitHub releases page
      console.log('[updater] zip not found, opening GitHub');
      shell.openExternal(
        'https://github.com/dhruvitestwork-lab/electron-test-demo/releases/latest'
      );
      send('update:manual-install', { path: null });
    }
  });

  ipcMain.on('update:dismiss', () => {});

  ipcMain.on('update:open-url', (_e, url: string) => {
    shell.openExternal(url);
  });

  ipcMain.on('update:check-manually', () => {
    if (isDev) {
      setTimeout(() => {
        send('update:available', {
          version: '99.0.0',
          releaseNotes: 'Simulated update.',
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