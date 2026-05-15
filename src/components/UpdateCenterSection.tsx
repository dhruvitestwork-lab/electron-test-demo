import { useState } from 'react'

export default function UpdateCenterSection() {
  const [updating, setUpdating] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleUpdate = () => {
    setUpdating(true)

    let value = 0

    const interval = setInterval(() => {
      value += 10
      setProgress(value)

      if (value >= 100) {
        clearInterval(interval)

        setTimeout(() => {
          setUpdating(false)
          setProgress(0)
          alert('Application Updated Successfully 🚀')
        }, 500)
      }
    }, 300)
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top, #1E1B4B, #020617)',
        padding: '60px 40px',
        fontFamily: 'sans-serif',
        color: '#fff',
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '60px',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            background: 'rgba(99,102,241,0.15)',
            color: '#C4B5FD',
            padding: '10px 20px',
            borderRadius: '999px',
            marginBottom: '22px',
            fontWeight: 600,
          }}
        >
          ⚡ Smart Desktop Updater
        </div>

        <h1
          style={{
            fontSize: '54px',
            marginBottom: '18px',
            fontWeight: 800,
          }}
        >
          Seamless App Updates
        </h1>

        <p
          style={{
            maxWidth: '750px',
            margin: '0 auto',
            color: '#94A3B8',
            lineHeight: 1.8,
            fontSize: '17px',
          }}
        >
          Keep your Electron application updated automatically with
          real-time version tracking, smooth downloads, and one-click
          installation.
        </p>
      </div>

      {/* Main Section */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '30px',
          alignItems: 'center',
        }}
      >
        {/* Left Content */}
        <div
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '32px',
            padding: '40px',
            backdropFilter: 'blur(12px)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Glow */}
          <div
            style={{
              position: 'absolute',
              width: '250px',
              height: '250px',
              background: 'rgba(99,102,241,0.15)',
              borderRadius: '50%',
              top: '-80px',
              right: '-80px',
            }}
          />

          <div style={{ position: 'relative', zIndex: 2 }}>
            <div
              style={{
                width: '85px',
                height: '85px',
                borderRadius: '24px',
                background:
                  'linear-gradient(135deg,#6366F1,#8B5CF6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '42px',
                marginBottom: '30px',
                boxShadow:
                  '0 20px 40px rgba(99,102,241,0.35)',
              }}
            >
              🚀
            </div>

            <h2
              style={{
                fontSize: '38px',
                marginBottom: '18px',
                fontWeight: 800,
              }}
            >
              New Version Available
            </h2>

            <p
              style={{
                color: '#CBD5E1',
                lineHeight: 1.9,
                marginBottom: '30px',
                fontSize: '16px',
              }}
            >
              Version 2.1.0 introduces performance improvements,
              modern UI upgrades, bug fixes, and enhanced Electron
              auto-update support.
            </p>

            {/* Features */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                marginBottom: '35px',
              }}
            >
              {[
                '⚡ Faster startup performance',
                '🎨 Improved dashboard design',
                '🔒 Better security & update system',
                '📦 Optimized installer package',
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    background: 'rgba(255,255,255,0.04)',
                    padding: '14px 18px',
                    borderRadius: '16px',
                  }}
                >
                  {item}
                </div>
              ))}
            </div>

            {/* Progress */}
            {updating && (
              <div
                style={{
                  marginBottom: '28px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '10px',
                  }}
                >
                  <span>Downloading Update...</span>
                  <span>{progress}%</span>
                </div>

                <div
                  style={{
                    width: '100%',
                    height: '14px',
                    background: '#1E293B',
                    borderRadius: '999px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${progress}%`,
                      height: '100%',
                      background:
                        'linear-gradient(90deg,#6366F1,#8B5CF6)',
                      transition: '0.3s',
                    }}
                  />
                </div>
              </div>
            )}

            {/* Button */}
            <button
              onClick={handleUpdate}
              disabled={updating}
              style={{
                padding: '18px 30px',
                border: 'none',
                borderRadius: '18px',
                background:
                  'linear-gradient(135deg,#6366F1,#8B5CF6)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '16px',
                cursor: 'pointer',
                width: '100%',
                boxShadow:
                  '0 18px 40px rgba(99,102,241,0.35)',
                transition: '0.3s',
                opacity: updating ? 0.7 : 1,
              }}
            >
              {updating
                ? 'Updating Application...'
                : 'Update Now'}
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          {[
            {
              title: 'Current Version',
              value: 'v2.0.4',
              icon: '📦',
            },
            {
              title: 'Latest Version',
              value: 'v2.1.0',
              icon: '🚀',
            },
            {
              title: 'Update Size',
              value: '48 MB',
              icon: '💾',
            },
          ].map((item, index) => (
            <div
              key={index}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '24px',
                padding: '28px',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div
                style={{
                  fontSize: '40px',
                  marginBottom: '18px',
                }}
              >
                {item.icon}
              </div>

              <div
                style={{
                  color: '#94A3B8',
                  marginBottom: '10px',
                }}
              >
                {item.title}
              </div>

              <div
                style={{
                  fontSize: '30px',
                  fontWeight: 800,
                }}
              >
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}