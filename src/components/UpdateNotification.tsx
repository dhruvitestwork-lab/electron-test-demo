import { useAutoUpdater } from '../hooks/useAutoUpdater';

export default function UpdateNotification() {
  const { state, startDownload, installNow, dismiss } = useAutoUpdater();
  const { status, info, progress, error } = state;

  if (status === 'idle' || status === 'not-available') return null;

  return (
    <div style={styles.banner}>

      {/* Header */}
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

      {/* Progress bar */}
      {status === 'downloading' && (
        <div style={styles.track}>
          <div style={{ ...styles.fill, width: `${progress?.percent ?? 0}%` }} />
        </div>
      )}

      {/* Release notes */}
      {status === 'available' && info?.releaseNotes && (
        <p style={styles.notes}>
          {String(info.releaseNotes).replace(/<[^>]+>/g, '').slice(0, 120)}…
        </p>
      )}

      {/* Error */}
      {status === 'error' && (
        <p style={styles.errorText}>{error}</p>
      )}

      {/* Buttons */}
      <div style={styles.row}>
        {status === 'available' && (
          <>
            <button style={styles.primary} onClick={startDownload}>
              Download Update
            </button>
            <button style={styles.secondary} onClick={dismiss}>
              Later
            </button>
          </>
        )}

        {status === 'downloaded' && (
          <>
            <button style={styles.primary} onClick={installNow}>
              🔄 Restart & Install
            </button>
            <button style={styles.secondary} onClick={dismiss}>
              On Next Quit
            </button>
          </>
        )}
      </div>

    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles: Record<string, React.CSSProperties> = {
  banner: {
    position:      'fixed',
    bottom:        24,
    right:         24,
    width:         340,
    background:    '#1a1a2e',
    color:         '#fff',
    borderRadius:  14,
    padding:       '16px 18px',
    boxShadow:     '0 8px 32px rgba(0,0,0,0.55)',
    zIndex:        9999,
    display:       'flex',
    flexDirection: 'column',
    gap:           10,
    fontFamily:    'system-ui, sans-serif',
  },
  header: {
    display:        'flex',
    justifyContent: 'space-between',
    alignItems:     'center',
  },
  title: {
    fontSize:   14,
    fontWeight: 600,
  },
  closeBtn: {
    background: 'transparent',
    border:     'none',
    color:      '#888',
    cursor:     'pointer',
    fontSize:   16,
    padding:    0,
  },
  notes: {
    margin:    0,
    fontSize:  12,
    color:     '#aaa',
    maxHeight: 60,
    overflow:  'hidden',
  },
  track: {
    background:   '#2e2e4a',
    borderRadius: 6,
    height:       6,
    overflow:     'hidden',
  },
  fill: {
    background: 'linear-gradient(90deg, #7c6fff, #a78bfa)',
    height:     '100%',
    transition: 'width 0.3s ease',
  },
  row: {
    display: 'flex',
    gap:     8,
  },
  primary: {
    flex:         1,
    padding:      '9px 12px',
    borderRadius: 8,
    border:       'none',
    background:   '#7c6fff',
    color:        '#fff',
    cursor:       'pointer',
    fontWeight:   600,
    fontSize:     13,
  },
  secondary: {
    flex:         1,
    padding:      '9px 12px',
    borderRadius: 8,
    border:       '1px solid #3a3a5a',
    background:   'transparent',
    color:        '#aaa',
    cursor:       'pointer',
    fontSize:     13,
  },
  errorText: {
    margin:   0,
    fontSize: 12,
    color:    '#ff6b6b',
  },
};