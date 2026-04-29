"use strict";
// import { contextBridge } from 'electron'
Object.defineProperty(exports, "__esModule", { value: true });
// contextBridge.exposeInMainWorld('api', {
//   ping: () => 'Hello from Electron TS 👋',
// })
const electron_1 = require("electron");
const on = (channel, cb) => {
    electron_1.ipcRenderer.on(channel, (_event, ...args) => cb(...args));
};
electron_1.contextBridge.exposeInMainWorld('electronUpdater', {
    // ── Listeners (main → renderer) ─────────────────────────────────────────────
    onChecking: (cb) => on('update:checking', cb),
    onAvailable: (cb) => on('update:available', cb),
    onNotAvailable: (cb) => on('update:not-available', cb),
    onDownloadProgress: (cb) => on('update:download-progress', cb),
    onDownloaded: (cb) => on('update:downloaded', cb),
    onError: (cb) => on('update:error', cb),
    // ── Senders (renderer → main) ────────────────────────────────────────────────
    startDownload: () => electron_1.ipcRenderer.send('update:start-download'),
    installNow: () => electron_1.ipcRenderer.send('update:install-now'),
    dismiss: () => electron_1.ipcRenderer.send('update:dismiss'),
    checkManually: () => electron_1.ipcRenderer.send('update:check-manually'),
    openUrl: (url) => electron_1.ipcRenderer.send('update:open-url', url),
    // ── Cleanup ──────────────────────────────────────────────────────────────────
    removeAllListeners: () => {
        [
            'update:checking',
            'update:available',
            'update:not-available',
            'update:download-progress',
            'update:downloaded',
            'update:error',
        ].forEach((ch) => electron_1.ipcRenderer.removeAllListeners(ch));
    },
});
