import { useEffect, useState } from 'react'

const activityData = [
  {
    title: 'Electron Build Completed',
    time: '2 min ago',
    status: 'success',
    icon: '🚀',
  },
  {
    title: 'Auto Update Published',
    time: '10 min ago',
    status: 'info',
    icon: '⚡',
  },
  {
    title: 'GitHub Release Created',
    time: '25 min ago',
    status: 'warning',
    icon: '📦',
  },
  {
    title: 'DMG Installer Generated',
    time: '1 hour ago',
    status: 'success',
    icon: '💻',
  },
]

export default function ActivityTimelineSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(72)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) =>
        prev === activityData.length - 1 ? 0 : prev + 1
      )
    }, 2500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top left,#111827,#020617)',
        padding: '70px 40px',
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
            background: 'rgba(99,102,241,0.12)',
            color: '#A5B4FC',
            padding: '10px 18px',
            borderRadius: '999px',
            marginBottom: '22px',
            fontWeight: 700,
          }}
        >
          ⚡ Real-Time Workflow
        </div>

        <h1
          style={{
            fontSize: '58px',
            fontWeight: 800,
            marginBottom: '18px',
            lineHeight: 1.2,
          }}
        >
          Smart Activity
          <span
            style={{
              background:
                'linear-gradient(90deg,#8B5CF6,#3B82F6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {' '}
            Timeline
          </span>
        </h1>

        <p
          style={{
            maxWidth: '760px',
            margin: '0 auto',
            color: '#94A3B8',
            lineHeight: 1.8,
            fontSize: '17px',
          }}
        >
          Track build progress, Electron releases,
          auto updates, and deployment activity with
          a modern interactive timeline experience.
        </p>
      </div>

      {/* Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            '1.2fr 0.8fr',
          gap: '32px',
        }}
      >
        {/* Left Timeline */}
        <div
          style={{
            background:
              'rgba(255,255,255,0.05)',
            border:
              '1px solid rgba(255,255,255,0.08)',
            borderRadius: '34px',
            padding: '40px',
            backdropFilter: 'blur(10px)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Glow */}
          <div
            style={{
              position: 'absolute',
              width: '260px',
              height: '260px',
              borderRadius: '50%',
              background:
                'rgba(99,102,241,0.12)',
              top: '-80px',
              right: '-80px',
            }}
          />

          <div
            style={{
              position: 'relative',
              zIndex: 2,
            }}
          >
            <div
              style={{
                fontSize: '30px',
                fontWeight: 800,
                marginBottom: '35px',
              }}
            >
              📋 Recent Activities
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
              }}
            >
              {activityData.map(
                (item, index) => {
                  const active =
                    activeIndex === index

                  return (
                    <div
                      key={index}
                      onMouseEnter={() =>
                        setActiveIndex(index)
                      }
                      style={{
                        display: 'flex',
                        gap: '18px',
                        padding: '22px',
                        borderRadius: '22px',
                        background: active
                          ? 'linear-gradient(135deg,#6366F1,#8B5CF6)'
                          : 'rgba(255,255,255,0.04)',
                        transition: '0.35s',
                        cursor: 'pointer',
                        transform: active
                          ? 'translateX(10px)'
                          : 'translateX(0)',
                        boxShadow: active
                          ? '0 18px 40px rgba(99,102,241,0.25)'
                          : 'none',
                      }}
                    >
                      {/* Icon */}
                      <div
                        style={{
                          width: '65px',
                          height: '65px',
                          borderRadius: '20px',
                          background: active
                            ? 'rgba(255,255,255,0.15)'
                            : 'rgba(255,255,255,0.06)',
                          display: 'flex',
                          alignItems:
                            'center',
                          justifyContent:
                            'center',
                          fontSize: '28px',
                          flexShrink: 0,
                        }}
                      >
                        {item.icon}
                      </div>

                      {/* Content */}
                      <div
                        style={{
                          flex: 1,
                        }}
                      >
                        <div
                          style={{
                            fontSize: '20px',
                            fontWeight: 700,
                            marginBottom: '8px',
                          }}
                        >
                          {item.title}
                        </div>

                        <div
                          style={{
                            color: active
                              ? 'rgba(255,255,255,0.8)'
                              : '#94A3B8',
                          }}
                        >
                          {item.time}
                        </div>
                      </div>

                      {/* Status */}
                      <div
                        style={{
                          alignSelf:
                            'center',
                        }}
                      >
                        <div
                          style={{
                            width: '14px',
                            height: '14px',
                            borderRadius:
                              '50%',
                            background:
                              item.status ===
                              'success'
                                ? '#10B981'
                                : item.status ===
                                  'info'
                                ? '#3B82F6'
                                : '#F59E0B',
                          }}
                        />
                      </div>
                    </div>
                  )
                }
              )}
            </div>
          </div>
        </div>

        {/* Right Stats */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '28px',
          }}
        >
          {/* Progress Card */}
          <div
            style={{
              background:
                'linear-gradient(135deg,#312E81,#1D4ED8)',
              borderRadius: '32px',
              padding: '35px',
              position: 'relative',
              overflow: 'hidden',
              boxShadow:
                '0 25px 55px rgba(59,130,246,0.25)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                width: '220px',
                height: '220px',
                borderRadius: '50%',
                background:
                  'rgba(255,255,255,0.08)',
                right: '-70px',
                top: '-70px',
              }}
            />

            <div
              style={{
                position: 'relative',
                zIndex: 2,
              }}
            >
              <div
                style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  marginBottom: '26px',
                }}
              >
                🚀 Build Progress
              </div>

              {/* Circle */}
              <div
                style={{
                  width: '180px',
                  height: '180px',
                  margin: '0 auto 25px',
                  borderRadius: '50%',
                  background: `conic-gradient(#fff ${progress}%, rgba(255,255,255,0.15) ${progress}%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    width: '140px',
                    height: '140px',
                    borderRadius: '50%',
                    background:
                      '#1E1B4B',
                    display: 'flex',
                    alignItems:
                      'center',
                    justifyContent:
                      'center',
                    flexDirection:
                      'column',
                  }}
                >
                  <div
                    style={{
                      fontSize: '42px',
                      fontWeight: 800,
                    }}
                  >
                    {progress}%
                  </div>

                  <div
                    style={{
                      opacity: 0.8,
                    }}
                  >
                    Completed
                  </div>
                </div>
              </div>

              <button
                onClick={() =>
                  setProgress(
                    progress >= 100
                      ? 0
                      : progress + 5
                  )
                }
                style={{
                  width: '100%',
                  padding: '16px',
                  border: 'none',
                  borderRadius: '16px',
                  background: '#fff',
                  color: '#111827',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Increase Progress
              </button>
            </div>
          </div>

          {/* Status Cards */}
          {[
            {
              title: 'Current Version',
              value: 'v2.1.0',
              icon: '📦',
            },
            {
              title: 'Live Users',
              value: '14.8K',
              icon: '👥',
            },
          ].map((item, index) => (
            <div
              key={index}
              style={{
                background:
                  'rgba(255,255,255,0.05)',
                border:
                  '1px solid rgba(255,255,255,0.08)',
                borderRadius: '28px',
                padding: '30px',
                backdropFilter:
                  'blur(10px)',
              }}
            >
              <div
                style={{
                  fontSize: '42px',
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
                  fontSize: '40px',
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