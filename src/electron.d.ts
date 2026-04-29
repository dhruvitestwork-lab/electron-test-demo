// src/electron.d.ts
interface Window {
  electronUpdater: {
    onChecking: (cb: () => void) => void;
    onAvailable: (cb: (info: any) => void) => void;
    onNotAvailable: (cb: () => void) => void;
    onDownloadProgress: (cb: (info: any) => void) => void;
    onDownloaded: (cb: (info: any) => void) => void;
    onError: (cb: (info: any) => void) => void;
    startDownload: () => void;
    installNow: () => void;
    dismiss: () => void;
    checkManually: () => void;
    openUrl: (url: string) => void;
    removeAllListeners: () => void;
  };
}