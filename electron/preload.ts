// import { contextBridge } from 'electron'

// contextBridge.exposeInMainWorld('api', {
//   ping: () => 'Hello from Electron TS 👋',
// })

import { contextBridge, ipcRenderer } from 'electron';

type Cb = (...args: any[]) => void;

const on = (channel: string, cb: Cb) => {
  ipcRenderer.on(channel, (_event, ...args) => cb(...args));
};

contextBridge.exposeInMainWorld('electronUpdater', {
  // ── Listeners (main → renderer) ─────────────────────────────────────────────
  onChecking:         (cb: Cb) => on('update:checking', cb),
  onAvailable:        (cb: Cb) => on('update:available', cb),
  onNotAvailable:     (cb: Cb) => on('update:not-available', cb),
  onDownloadProgress: (cb: Cb) => on('update:download-progress', cb),
  onDownloaded:       (cb: Cb) => on('update:downloaded', cb),
  onError:            (cb: Cb) => on('update:error', cb),

  // ── Senders (renderer → main) ────────────────────────────────────────────────
  startDownload:   () => ipcRenderer.send('update:start-download'),
  installNow:      () => ipcRenderer.send('update:install-now'),
  dismiss:         () => ipcRenderer.send('update:dismiss'),
  checkManually:   () => ipcRenderer.send('update:check-manually'),
  openUrl:         (url: string) => ipcRenderer.send('update:open-url', url),

  // ── Cleanup ──────────────────────────────────────────────────────────────────
  removeAllListeners: () => {
    [
      'update:checking',
      'update:available',
      'update:not-available',
      'update:download-progress',
      'update:downloaded',
      'update:error',
    ].forEach((ch) => ipcRenderer.removeAllListeners(ch));
  },
});