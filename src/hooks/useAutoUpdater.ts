import { useCallback, useEffect, useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────
export type UpdateStatus =
  | 'idle'
  | 'checking'
  | 'available'
  | 'downloading'
  | 'downloaded'
  | 'not-available'
  | 'error';

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

// ─── Window type augmentation ─────────────────────────────────────────────────
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

// ─── Hook ─────────────────────────────────────────────────────────────────────
const IDLE: UpdateState = {
  status: 'idle',
  info: null,
  progress: null,
  error: null,
};

export function useAutoUpdater() {
  const [state, setState] = useState<UpdateState>(IDLE);
  const api = window.electronUpdater;

  useEffect(() => {
    if (!api) return;

    api.onChecking(() =>
      setState((s) => ({ ...s, status: 'checking', error: null }))
    );
    api.onAvailable((info) =>
      setState({ status: 'available', info, progress: null, error: null })
    );
    api.onNotAvailable(() =>
      setState((s) => ({ ...s, status: 'not-available' }))
    );
    api.onDownloadProgress((progress) =>
      setState((s) => ({ ...s, status: 'downloading', progress }))
    );
    api.onDownloaded((info) =>
      setState((s) => ({ ...s, status: 'downloaded', info: s.info ?? info, progress: null }))
    );
    api.onError((err) =>
      setState((s) => ({ ...s, status: 'error', error: err.message }))
    );

    return () => api.removeAllListeners();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const startDownload = useCallback(() => {
    setState((s) => ({ ...s, status: 'downloading', progress: null }));
    api?.startDownload();
  }, [api]);

  const installNow    = useCallback(() => api?.installNow(),   [api]);
  const dismiss       = useCallback(() => { api?.dismiss(); setState(IDLE); }, [api]);
  const checkManually = useCallback(() => api?.checkManually(), [api]);

  return { state, startDownload, installNow, dismiss, checkManually };
}