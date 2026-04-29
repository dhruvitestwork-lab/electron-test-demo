// // import React from 'react';
// // import { useAutoUpdater } from '../hooks/useAutoUpdater';

// // // ─── Tiny helpers ─────────────────────────────────────────────────────────────

// // function formatBytes(bytes: number): string {
// //   if (bytes < 1024) return `${bytes} B`;
// //   if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
// //   return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
// // }

// // function formatSpeed(bps: number): string {
// //   if (bps < 1024) return `${bps} B/s`;
// //   if (bps < 1024 * 1024) return `${(bps / 1024).toFixed(0)} KB/s`;
// //   return `${(bps / (1024 * 1024)).toFixed(1)} MB/s`;
// // }

// // // ─── Component ────────────────────────────────────────────────────────────────

// // const UpdateNotification: React.FC = () => {
// //   const { state, startDownload, installNow, dismiss } = useAutoUpdater();
// //   const { status, info, progress } = state;

// //   // Don't render anything when idle / not-available / checking silently
// //   const visible =
// //     status === 'available' ||
// //     status === 'downloading' ||
// //     status === 'downloaded' ||
// //     status === 'error';

// //   if (!visible) return null;

// //   return (
// //     <div
// //       style={{
// //         position: 'fixed',
// //         bottom: 24,
// //         right: 24,
// //         zIndex: 9999,
// //         width: 360,
// //         borderRadius: 12,
// //         boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
// //         background: '#fff',
// //         border: '1px solid #e5e7eb',
// //         overflow: 'hidden',
// //         fontFamily: 'system-ui, sans-serif',
// //       }}
// //     >
// //       {/* ── Coloured top bar ── */}
// //       <div
// //         style={{
// //           height: 4,
// //           background:
// //             status === 'error'
// //               ? '#ef4444'
// //               : status === 'downloaded'
// //               ? '#22c55e'
// //               : '#6366f1',
// //         }}
// //       />

// //       <div style={{ padding: '16px 18px' }}>
// //         {/* ── Header ── */}
// //         <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
// //           <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
// //             {/* Icon */}
// //             {status === 'error' ? (
// //               <span style={{ fontSize: 18 }}>⚠️</span>
// //             ) : status === 'downloaded' ? (
// //               <span style={{ fontSize: 18 }}>✅</span>
// //             ) : (
// //               <span style={{ fontSize: 18 }}>🔄</span>
// //             )}
// //             <div>
// //               <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: '#111827' }}>
// //                 {status === 'available' && `Update Available — v${info?.version}`}
// //                 {status === 'downloading' && 'Downloading Update…'}
// //                 {status === 'downloaded' && `Ready to Install — v${info?.version}`}
// //                 {status === 'error' && 'Update Error'}
// //               </p>
// //               {info?.releaseDate && status !== 'error' && (
// //                 <p style={{ margin: 0, fontSize: 11, color: '#9ca3af', marginTop: 2 }}>
// //                   Released {new Date(info.releaseDate).toLocaleDateString()}
// //                 </p>
// //               )}
// //             </div>
// //           </div>

// //           {/* Dismiss X */}
// //           {(status === 'available' || status === 'error' || status === 'downloaded') && (
// //             <button
// //               onClick={dismiss}
// //               style={{
// //                 background: 'none',
// //                 border: 'none',
// //                 cursor: 'pointer',
// //                 color: '#9ca3af',
// //                 fontSize: 18,
// //                 lineHeight: 1,
// //                 padding: 0,
// //                 marginLeft: 8,
// //               }}
// //               title="Dismiss"
// //             >
// //               ×
// //             </button>
// //           )}
// //         </div>

// //         {/* ── Body ── */}

// //         {/* Release notes snippet */}
// //         {status === 'available' && info?.releaseNotes && (
// //           <p
// //             style={{
// //               margin: '0 0 12px',
// //               fontSize: 12,
// //               color: '#6b7280',
// //               lineHeight: 1.5,
// //               maxHeight: 60,
// //               overflow: 'hidden',
// //               display: '-webkit-box',
// //               WebkitLineClamp: 3,
// //               WebkitBoxOrient: 'vertical',
// //             }}
// //           >
// //             {typeof info.releaseNotes === 'string'
// //               ? info.releaseNotes.replace(/<[^>]+>/g, '')  // strip HTML tags
// //               : 'New version available.'}
// //           </p>
// //         )}

// //         {/* Download progress bar */}
// //         {status === 'downloading' && progress && (
// //           <div style={{ marginBottom: 12 }}>
// //             <div
// //               style={{
// //                 height: 6,
// //                 background: '#e5e7eb',
// //                 borderRadius: 999,
// //                 overflow: 'hidden',
// //                 marginBottom: 6,
// //               }}
// //             >
// //               <div
// //                 style={{
// //                   height: '100%',
// //                   width: `${progress.percent}%`,
// //                   background: '#6366f1',
// //                   borderRadius: 999,
// //                   transition: 'width 0.3s ease',
// //                 }}
// //               />
// //             </div>
// //             <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#9ca3af' }}>
// //               <span>{progress.percent}%</span>
// //               <span>
// //                 {formatBytes(progress.transferred)} / {formatBytes(progress.total)}
// //                 {' · '}
// //                 {formatSpeed(progress.bytesPerSecond)}
// //               </span>
// //             </div>
// //           </div>
// //         )}

// //         {/* Downloaded — ready to restart */}
// //         {status === 'downloaded' && (
// //           <p style={{ margin: '0 0 12px', fontSize: 12, color: '#6b7280' }}>
// //             The update has been downloaded. Restart the app to apply it.
// //           </p>
// //         )}

// //         {/* Error message */}
// //         {status === 'error' && state.error && (
// //           <p style={{ margin: '0 0 12px', fontSize: 12, color: '#ef4444', wordBreak: 'break-word' }}>
// //             {state.error}
// //           </p>
// //         )}

// //         {/* ── Actions ── */}
// //         <div style={{ display: 'flex', gap: 8 }}>
// //           {status === 'available' && (
// //             <>
// //               <button
// //                 onClick={startDownload}
// //                 style={primaryBtn}
// //               >
// //                 Download Update
// //               </button>
// //               <button onClick={dismiss} style={ghostBtn}>
// //                 Later
// //               </button>
// //             </>
// //           )}

// //           {status === 'downloading' && (
// //             <button disabled style={{ ...primaryBtn, opacity: 0.6, cursor: 'not-allowed' }}>
// //               Downloading…
// //             </button>
// //           )}

// //           {status === 'downloaded' && (
// //             <>
// //               <button onClick={installNow} style={primaryBtn}>
// //                 Restart &amp; Install
// //               </button>
// //               <button onClick={dismiss} style={ghostBtn}>
// //                 Later
// //               </button>
// //             </>
// //           )}

// //           {status === 'error' && (
// //             <button onClick={dismiss} style={ghostBtn}>
// //               Dismiss
// //             </button>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // ─── Button styles ────────────────────────────────────────────────────────────

// // const primaryBtn: React.CSSProperties = {
// //   flex: 1,
// //   padding: '7px 14px',
// //   borderRadius: 8,
// //   border: 'none',
// //   background: '#111827',
// //   color: '#fff',
// //   fontWeight: 600,
// //   fontSize: 13,
// //   cursor: 'pointer',
// // };

// // const ghostBtn: React.CSSProperties = {
// //   padding: '7px 14px',
// //   borderRadius: 8,
// //   border: '1px solid #e5e7eb',
// //   background: '#fff',
// //   color: '#374151',
// //   fontWeight: 500,
// //   fontSize: 13,
// //   cursor: 'pointer',
// // };

// // export default UpdateNotification;


// import React from 'react';
// import { useAutoUpdater } from '../hooks/useAutoUpdater';

// // ─── Tiny helpers ─────────────────────────────────────────────────────────────

// function fmtBytes(b: number): string {
//   if (b < 1024) return `${b} B`;
//   if (b < 1024 ** 2) return `${(b / 1024).toFixed(1)} KB`;
//   return `${(b / 1024 ** 2).toFixed(1)} MB`;
// }

// function fmtSpeed(bps: number): string {
//   if (bps < 1024) return `${bps} B/s`;
//   if (bps < 1024 ** 2) return `${(bps / 1024).toFixed(0)} KB/s`;
//   return `${(bps / 1024 ** 2).toFixed(1)} MB/s`;
// }

// function stripHtml(s: string): string {
//   return s.replace(/<[^>]+>/g, '').trim();
// }

// // ─── Component ────────────────────────────────────────────────────────────────

// const UpdateNotification: React.FC = () => {
//   const { state, startDownload, installNow, dismiss } = useAutoUpdater();
//   const { status, info, progress, error } = state;

//   // Only show for these statuses
//   if (!['available', 'downloading', 'downloaded', 'error'].includes(status)) {
//     return null;
//   }

//   const accentColor =
//     status === 'error'      ? '#ef4444' :
//     status === 'downloaded' ? '#22c55e' : '#6366f1';

//   const icon =
//     status === 'error'      ? '⚠️' :
//     status === 'downloaded' ? '✅' :
//     status === 'downloading'? '⬇️' : '🔔';

//   const title =
//     status === 'available'   ? `Update Available — v${info?.version}` :
//     status === 'downloading' ? 'Downloading Update…' :
//     status === 'downloaded'  ? `Ready to Install — v${info?.version}` :
//                                'Update Error';

//   return (
//     <div style={styles.wrapper}>
//       {/* Coloured top stripe */}
//       <div style={{ ...styles.stripe, background: accentColor }} />

//       <div style={styles.body}>
//         {/* ── Header ── */}
//         <div style={styles.header}>
//           <div style={styles.headerLeft}>
//             <span style={styles.icon}>{icon}</span>
//             <div>
//               <p style={styles.title}>{title}</p>
//               {info?.releaseDate && status !== 'error' && (
//                 <p style={styles.subtitle}>
//                   Released {new Date(info.releaseDate).toLocaleDateString()}
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* Dismiss button */}
//           {status !== 'downloading' && (
//             <button onClick={dismiss} style={styles.closeBtn} title="Dismiss">
//               ✕
//             </button>
//           )}
//         </div>

//         {/* ── Release notes ── */}
//         {status === 'available' && info?.releaseNotes && (
//           <p style={styles.notes}>
//             {typeof info.releaseNotes === 'string'
//               ? stripHtml(info.releaseNotes).slice(0, 180) + (info.releaseNotes.length > 180 ? '…' : '')
//               : 'New version available.'}
//           </p>
//         )}

//         {/* ── Download progress ── */}
//         {status === 'downloading' && (
//           <div style={{ marginBottom: 12 }}>
//             <div style={styles.progressTrack}>
//               <div
//                 style={{
//                   ...styles.progressFill,
//                   width: `${progress?.percent ?? 0}%`,
//                   background: accentColor,
//                 }}
//               />
//             </div>
//             <div style={styles.progressMeta}>
//               <span>{progress?.percent ?? 0}%</span>
//               {progress && (
//                 <span>
//                   {fmtBytes(progress.transferred)} / {fmtBytes(progress.total)}
//                   {' · '}{fmtSpeed(progress.bytesPerSecond)}
//                 </span>
//               )}
//             </div>
//           </div>
//         )}

//         {/* ── Downloaded message ── */}
//         {status === 'downloaded' && (
//           <p style={styles.notes}>
//             The update has been downloaded. Restart now to apply it, or it will be installed on next quit.
//           </p>
//         )}

//         {/* ── Error message ── */}
//         {status === 'error' && error && (
//           <p style={{ ...styles.notes, color: '#ef4444' }}>{error}</p>
//         )}

//         {/* ── Action buttons ── */}
//         <div style={styles.actions}>
//           {status === 'available' && (
//             <>
//               <button onClick={startDownload} style={styles.primaryBtn}>
//                 ⬇ Download Update
//               </button>
//               <button onClick={dismiss} style={styles.ghostBtn}>
//                 Later
//               </button>
//             </>
//           )}

//           {status === 'downloading' && (
//             <button disabled style={{ ...styles.primaryBtn, opacity: 0.55, cursor: 'not-allowed' }}>
//               Downloading…
//             </button>
//           )}

//           {status === 'downloaded' && (
//             <>
//               <button onClick={installNow} style={{ ...styles.primaryBtn, background: '#16a34a' }}>
//                 🔄 Restart &amp; Install
//               </button>
//               <button onClick={dismiss} style={styles.ghostBtn}>
//                 Later
//               </button>
//             </>
//           )}

//           {status === 'error' && (
//             <button onClick={dismiss} style={styles.ghostBtn}>
//               Dismiss
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// // ─── Styles ───────────────────────────────────────────────────────────────────

// const styles: Record<string, React.CSSProperties> = {
//   wrapper: {
//     position: 'fixed',
//     bottom: 24,
//     right: 24,
//     zIndex: 99999,
//     width: 360,
//     borderRadius: 14,
//     boxShadow: '0 12px 40px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.08)',
//     background: '#ffffff',
//     border: '1px solid #e5e7eb',
//     overflow: 'hidden',
//     fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
//   },
//   stripe: {
//     height: 4,
//   },
//   body: {
//     padding: '14px 16px 16px',
//   },
//   header: {
//     display: 'flex',
//     alignItems: 'flex-start',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//     gap: 8,
//   },
//   headerLeft: {
//     display: 'flex',
//     alignItems: 'flex-start',
//     gap: 10,
//     flex: 1,
//   },
//   icon: {
//     fontSize: 20,
//     lineHeight: 1,
//     marginTop: 1,
//     flexShrink: 0,
//   },
//   title: {
//     margin: 0,
//     fontWeight: 700,
//     fontSize: 13.5,
//     color: '#111827',
//     lineHeight: 1.3,
//   },
//   subtitle: {
//     margin: '3px 0 0',
//     fontSize: 11,
//     color: '#9ca3af',
//   },
//   closeBtn: {
//     background: 'none',
//     border: 'none',
//     cursor: 'pointer',
//     color: '#9ca3af',
//     fontSize: 15,
//     padding: '2px 4px',
//     borderRadius: 4,
//     lineHeight: 1,
//     flexShrink: 0,
//     transition: 'color 0.15s',
//   },
//   notes: {
//     margin: '0 0 12px',
//     fontSize: 12,
//     color: '#6b7280',
//     lineHeight: 1.55,
//   },
//   progressTrack: {
//     height: 6,
//     background: '#f3f4f6',
//     borderRadius: 999,
//     overflow: 'hidden',
//     marginBottom: 5,
//   },
//   progressFill: {
//     height: '100%',
//     borderRadius: 999,
//     transition: 'width 0.3s ease',
//   },
//   progressMeta: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     fontSize: 11,
//     color: '#9ca3af',
//   },
//   actions: {
//     display: 'flex',
//     gap: 8,
//     marginTop: 4,
//   },
//   primaryBtn: {
//     flex: 1,
//     padding: '8px 14px',
//     borderRadius: 8,
//     border: 'none',
//     background: '#111827',
//     color: '#fff',
//     fontWeight: 600,
//     fontSize: 13,
//     cursor: 'pointer',
//     transition: 'background 0.15s',
//   },
//   ghostBtn: {
//     padding: '8px 14px',
//     borderRadius: 8,
//     border: '1px solid #e5e7eb',
//     background: '#fff',
//     color: '#374151',
//     fontWeight: 500,
//     fontSize: 13,
//     cursor: 'pointer',
//     transition: 'background 0.15s',
//   },
// };

// export default UpdateNotification;

// src/components/UpdateNotification.tsx
import { useEffect, useState } from 'react';

type Stage =
  | 'idle'
  | 'checking'
  | 'available'
  | 'not-available'
  | 'downloading'
  | 'downloaded'
  | 'error';

interface UpdateInfo {
  version?: string;
  releaseNotes?: string;
  releaseDate?: string;
  percent?: number;
  message?: string;
}

export default function UpdateNotification() {
  const [stage, setStage] = useState<Stage>('idle');
  const [info, setInfo] = useState<UpdateInfo>({});

  useEffect(() => {
    const u = window.electronUpdater;
    if (!u) return;

    u.onChecking(() => setStage('checking'));

    u.onAvailable((data: UpdateInfo) => {
      setStage('available');
      setInfo(data);
    });

    u.onNotAvailable(() => {
      setStage('not-available');
      // Auto-hide after 3s
      setTimeout(() => setStage('idle'), 3000);
    });

    u.onDownloadProgress((data: UpdateInfo) => {
      setStage('downloading');
      setInfo((prev) => ({ ...prev, percent: data.percent }));
    });

    u.onDownloaded((data: UpdateInfo) => {
      setStage('downloaded');
      setInfo((prev) => ({ ...prev, ...data }));
    });

    u.onError((data: UpdateInfo) => {
      setStage('error');
      setInfo(data);
      setTimeout(() => setStage('idle'), 5000);
    });

    return () => u.removeAllListeners();
  }, []);

  if (stage === 'idle') return null;

  return (
    <div style={styles.banner}>
      {stage === 'checking' && <p>🔍 Checking for updates…</p>}

      {stage === 'not-available' && <p>✅ You're on the latest version.</p>}

      {stage === 'available' && (
        <>
          <p>🆕 Version <strong>{info.version}</strong> is available!</p>
          <button onClick={() => {
            window.electronUpdater.startDownload();
            setStage('downloading');
          }}>
            Download Update
          </button>
          <button onClick={() => {
            window.electronUpdater.dismiss();
            setStage('idle');
          }}>
            Later
          </button>
        </>
      )}

      {stage === 'downloading' && (
        <>
          <p>⬇️ Downloading… {info.percent ?? 0}%</p>
          <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: `${info.percent ?? 0}%` }} />
          </div>
        </>
      )}

      {stage === 'downloaded' && (
        <>
          <p>✅ Version <strong>{info.version}</strong> ready to install!</p>
          <button onClick={() => window.electronUpdater.installNow()}>
            🔄 Restart & Install Now
          </button>
          <button onClick={() => setStage('idle')}>
            Install on Next Quit
          </button>
        </>
      )}

      {stage === 'error' && (
        <p>❌ Update error: {info.message}</p>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  banner: {
    position: 'fixed', bottom: 20, right: 20,
    background: '#1e1e2e', color: '#fff',
    padding: '16px 20px', borderRadius: 10,
    boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
    zIndex: 9999, maxWidth: 340,
    display: 'flex', flexDirection: 'column', gap: 8,
  },
  progressBar: {
    background: '#333', borderRadius: 4, height: 6, overflow: 'hidden',
  },
  progressFill: {
    background: '#7c6fff', height: '100%',
    transition: 'width 0.3s ease',
  },
};