import React, { useEffect, useState } from 'react'

const notificationsData = [
  {
    id: 1,
    title: 'New Desktop Update',
    message: 'Electron v2.1.0 installed successfully',
    icon: '🚀',
    time: '2 min ago',
  },
  {
    id: 2,
    title: 'Cloud Backup Completed',
    message: 'All project files synced securely',
    icon: '☁️',
    time: '10 min ago',
  },
  {
    id: 3,
    title: 'AI Optimization',
    message: 'Performance improved by 28%',
    icon: '🤖',
    time: '15 min ago',
  },
]

export default function FloatingNotificationCenter() {
  const [notifications, setNotifications] =
    useState(notificationsData)

  const [activeTab, setActiveTab] =
    useState('All')

  const [liveUsers, setLiveUsers] =
    useState(2847)

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveUsers((prev) => prev + 1)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const clearNotification = (id: number) => {
    setNotifications((prev) =>
      prev.filter((item) => item.id !== id)
    )
  }

  return (
    <div
      style={{
        width: '100%',
        marginTop: '40px',
        position: 'relative',
      }}
    >
      {/* BACKGROUND EFFECT */}
      <div
        style={{
          position: 'absolute',
          top: '-100px',
          left: '10%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background:
            'rgba(99,102,241,0.18)',
          filter: 'blur(80px)',
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          borderRadius: '38px',
          overflow: 'hidden',
          background:
            'linear-gradient(135deg,#020617,#0F172A,#1E293B)',
          border:
            '1px solid rgba(255,255,255,0.08)',
          boxShadow:
            '0 35px 80px rgba(0,0,0,0.45)',
        }}
      >
        {/* TOP SECTION */}
        <div
          style={{
            padding: '40px',
            borderBottom:
              '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            justifyContent:
              'space-between',
            gap: '30px',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 18px',
                borderRadius: '999px',
                background:
                  'rgba(255,255,255,0.08)',
                color: '#C4B5FD',
                fontWeight: 700,
                fontSize: '13px',
                marginBottom: '18px',
              }}
            >
              🔔 LIVE NOTIFICATION HUB
            </div>

            <div
              style={{
                fontSize: '46px',
                fontWeight: 900,
                color: '#fff',
                lineHeight: 1.2,
                marginBottom: '16px',
              }}
            >
              Smart Activity
              <br />
              Notification Center
            </div>

            <div
              style={{
                maxWidth: '700px',
                color: '#CBD5E1',
                fontSize: '16px',
                lineHeight: 1.9,
              }}
            >
              Monitor updates, project
              activities, cloud sync, and
              Electron events in one modern
              interactive dashboard.
            </div>
          </div>

          {/* LIVE CARD */}
          <div
            style={{
              minWidth: '320px',
              padding: '28px',
              borderRadius: '28px',
              background:
                'rgba(255,255,255,0.05)',
              border:
                '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(14px)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent:
                  'space-between',
                marginBottom: '20px',
              }}
            >
              <div>
                <div
                  style={{
                    color: '#94A3B8',
                    marginBottom: '8px',
                    fontSize: '14px',
                  }}
                >
                  LIVE USERS
                </div>

                <div
                  style={{
                    fontSize: '42px',
                    fontWeight: 900,
                    color: '#fff',
                  }}
                >
                  {liveUsers.toLocaleString()}
                </div>
              </div>

              <div
                style={{
                  width: '74px',
                  height: '74px',
                  borderRadius: '24px',
                  background:
                    'linear-gradient(135deg,#4F46E5,#EC4899)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '34px',
                }}
              >
                🌍
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: '#10B981',
                fontWeight: 700,
              }}
            >
              <span
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#10B981',
                  boxShadow:
                    '0 0 12px #10B981',
                }}
              />

              Active Monitoring Running
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div
          style={{
            padding: '40px',
            display: 'grid',
            gridTemplateColumns:
              '1.4fr 0.9fr',
            gap: '30px',
          }}
        >
          {/* LEFT SIDE */}
          <div>
            {/* TABS */}
            <div
              style={{
                display: 'flex',
                gap: '14px',
                flexWrap: 'wrap',
                marginBottom: '26px',
              }}
            >
              {['All', 'Updates', 'Cloud'].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() =>
                      setActiveTab(tab)
                    }
                    style={{
                      padding: '12px 22px',
                      borderRadius: '16px',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: 700,
                      fontSize: '14px',
                      transition: '0.3s',
                      background:
                        activeTab === tab
                          ? 'linear-gradient(135deg,#4F46E5,#8B5CF6,#EC4899)'
                          : 'rgba(255,255,255,0.05)',
                      color: '#fff',
                      boxShadow:
                        activeTab === tab
                          ? '0 14px 30px rgba(124,58,237,0.35)'
                          : 'none',
                    }}
                  >
                    {tab}
                  </button>
                )
              )}
            </div>

            {/* NOTIFICATIONS */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
              }}
            >
              {notifications.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    gap: '18px',
                    alignItems: 'center',
                    padding: '22px',
                    borderRadius: '26px',
                    background:
                      'rgba(255,255,255,0.04)',
                    border:
                      '1px solid rgba(255,255,255,0.06)',
                    transition: '0.3s',
                  }}
                >
                  <div
                    style={{
                      width: '72px',
                      height: '72px',
                      borderRadius: '22px',
                      background:
                        'linear-gradient(135deg,#4F46E5,#8B5CF6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '34px',
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent:
                          'space-between',
                        gap: '12px',
                        marginBottom: '10px',
                        flexWrap: 'wrap',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '18px',
                          fontWeight: 800,
                          color: '#fff',
                        }}
                      >
                        {item.title}
                      </div>

                      <div
                        style={{
                          color: '#94A3B8',
                          fontSize: '13px',
                        }}
                      >
                        {item.time}
                      </div>
                    </div>

                    <div
                      style={{
                        color: '#CBD5E1',
                        lineHeight: 1.8,
                        marginBottom: '16px',
                      }}
                    >
                      {item.message}
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        gap: '12px',
                        flexWrap: 'wrap',
                      }}
                    >
                      <button
                        style={{
                          padding:
                            '10px 18px',
                          borderRadius: '14px',
                          border: 'none',
                          cursor: 'pointer',
                          background:
                            'linear-gradient(135deg,#4F46E5,#7C3AED)',
                          color: '#fff',
                          fontWeight: 700,
                        }}
                      >
                        View Details
                      </button>

                      <button
                        onClick={() =>
                          clearNotification(
                            item.id
                          )
                        }
                        style={{
                          padding:
                            '10px 18px',
                          borderRadius: '14px',
                          border:
                            '1px solid rgba(255,255,255,0.08)',
                          cursor: 'pointer',
                          background:
                            'rgba(255,255,255,0.04)',
                          color: '#CBD5E1',
                          fontWeight: 700,
                        }}
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            {/* AI CARD */}
            <div
              style={{
                borderRadius: '30px',
                padding: '30px',
                background:
                  'linear-gradient(135deg,#4F46E5,#7C3AED,#EC4899)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  background:
                    'rgba(255,255,255,0.12)',
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
                    width: '78px',
                    height: '78px',
                    borderRadius: '24px',
                    background:
                      'rgba(255,255,255,0.18)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '38px',
                    marginBottom: '24px',
                  }}
                >
                  🤖
                </div>

                <div
                  style={{
                    fontSize: '34px',
                    fontWeight: 900,
                    color: '#fff',
                    marginBottom: '18px',
                  }}
                >
                  AI Assistant
                </div>

                <div
                  style={{
                    color:
                      'rgba(255,255,255,0.88)',
                    lineHeight: 1.9,
                    marginBottom: '28px',
                  }}
                >
                  Smart assistant helps manage
                  Electron updates, builds,
                  releases and app monitoring.
                </div>

                <button
                  onClick={() =>
                    alert(
                      '🤖 AI Assistant Started'
                    )
                  }
                  style={{
                    width: '100%',
                    height: '58px',
                    border: 'none',
                    borderRadius: '18px',
                    cursor: 'pointer',
                    background: '#fff',
                    color: '#111827',
                    fontWeight: 800,
                    fontSize: '15px',
                  }}
                >
                  Launch Assistant
                </button>
              </div>
            </div>

            {/* ANALYTICS */}
            <div
              style={{
                borderRadius: '30px',
                padding: '30px',
                background:
                  'rgba(255,255,255,0.04)',
                border:
                  '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div
                style={{
                  fontSize: '28px',
                  fontWeight: 900,
                  color: '#fff',
                  marginBottom: '26px',
                }}
              >
                Live Analytics
              </div>

              {[
                {
                  title: 'Build Success',
                  value: '98%',
                  icon: '⚡',
                },
                {
                  title: 'Cloud Sync',
                  value: '100%',
                  icon: '☁️',
                },
                {
                  title: 'Update Status',
                  value: 'Active',
                  icon: '🚀',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent:
                      'space-between',
                    padding: '18px 0',
                    borderBottom:
                      index !== 2
                        ? '1px solid rgba(255,255,255,0.06)'
                        : 'none',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                    }}
                  >
                    <div
                      style={{
                        width: '54px',
                        height: '54px',
                        borderRadius: '18px',
                        background:
                          'linear-gradient(135deg,#4F46E5,#8B5CF6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent:
                          'center',
                        fontSize: '24px',
                      }}
                    >
                      {item.icon}
                    </div>

                    <div
                      style={{
                        color: '#CBD5E1',
                        fontWeight: 700,
                      }}
                    >
                      {item.title}
                    </div>
                  </div>

                  <div
                    style={{
                      fontSize: '26px',
                      fontWeight: 900,
                      color: '#fff',
                    }}
                  >
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RESPONSIVE */}
        <style>
          {`
            @media (max-width: 950px) {
              div[style*="grid-template-columns: 1.4fr 0.9fr"] {
                grid-template-columns: 1fr !important;
              }
            }

            @media (max-width: 600px) {
              div[style*="font-size: 46px"] {
                font-size: 34px !important;
              }
            }
          `}
        </style>
      </div>
    </div>
  )
}