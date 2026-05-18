import React, { useEffect, useMemo, useState } from 'react'

type Server = {
  id: number
  name: string
  cpu: number
  memory: number
  status: 'Online' | 'Warning' | 'Offline'
}

export default function SmartServerMonitor() {
  const [servers, setServers] = useState<Server[]>([
    {
      id: 1,
      name: 'Production Server',
      cpu: 42,
      memory: 65,
      status: 'Online',
    },
    {
      id: 2,
      name: 'Electron Update API',
      cpu: 74,
      memory: 82,
      status: 'Warning',
    },
    {
      id: 3,
      name: 'Cloud Storage',
      cpu: 18,
      memory: 34,
      status: 'Online',
    },
  ])

  const [darkMode, setDarkMode] =
    useState(true)

  const [liveTraffic, setLiveTraffic] =
    useState(2847)

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveTraffic(
        (prev) =>
          prev +
          Math.floor(Math.random() * 12)
      )

      setServers((prev) =>
        prev.map((server) => ({
          ...server,
          cpu: Math.max(
            10,
            Math.min(
              95,
              server.cpu +
                Math.floor(
                  Math.random() * 10 - 5
                )
            )
          ),
        }))
      )
    }, 2500)

    return () => clearInterval(interval)
  }, [])

  const totalUsage = useMemo(() => {
    const total = servers.reduce(
      (acc, server) =>
        acc + server.cpu,
      0
    )

    return Math.round(total / servers.length)
  }, [servers])

  const addNewServer = () => {
    const newServer: Server = {
      id: Date.now(),
      name: `Node Server ${servers.length + 1}`,
      cpu: Math.floor(
        Math.random() * 80
      ),
      memory: Math.floor(
        Math.random() * 90
      ),
      status: 'Online',
    }

    setServers((prev) => [
      newServer,
      ...prev,
    ])
  }

  const removeServer = (id: number) => {
    setServers((prev) =>
      prev.filter(
        (server) => server.id !== id
      )
    )
  }

  const getStatusColor = (
    status: Server['status']
  ) => {
    switch (status) {
      case 'Online':
        return '#10B981'
      case 'Warning':
        return '#F59E0B'
      case 'Offline':
        return '#EF4444'
      default:
        return '#fff'
    }
  }

  return (
    <div
      style={{
        width: '100%',
        marginTop: '40px',
        borderRadius: '40px',
        overflow: 'hidden',
        background: darkMode
          ? 'linear-gradient(135deg,#020617,#0F172A,#111827)'
          : 'linear-gradient(135deg,#F8FAFC,#E2E8F0,#CBD5E1)',
        border:
          '1px solid rgba(255,255,255,0.08)',
        boxShadow:
          '0 35px 80px rgba(0,0,0,0.35)',
        transition: '0.4s',
      }}
    >
      {/* HEADER */}
      <div
        style={{
          padding: '40px',
          borderBottom:
            '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          justifyContent:
            'space-between',
          gap: '20px',
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
                'rgba(99,102,241,0.15)',
              color: darkMode
                ? '#C4B5FD'
                : '#4F46E5',
              fontWeight: 700,
              marginBottom: '18px',
              fontSize: '13px',
            }}
          >
            ⚡ LIVE SERVER MONITOR
          </div>

          <div
            style={{
              fontSize: '48px',
              fontWeight: 900,
              color: darkMode
                ? '#fff'
                : '#0F172A',
              lineHeight: 1.2,
              marginBottom: '14px',
            }}
          >
            Smart Infrastructure
            Dashboard
          </div>

          <div
            style={{
              color: darkMode
                ? '#CBD5E1'
                : '#334155',
              maxWidth: '700px',
              lineHeight: 1.9,
              fontSize: '16px',
            }}
          >
            Monitor Electron services,
            server performance, CPU load,
            cloud sync and real-time
            analytics with interactive live
            monitoring.
          </div>
        </div>

        {/* RIGHT */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={addNewServer}
            style={{
              height: '58px',
              padding: '0 24px',
              border: 'none',
              borderRadius: '18px',
              cursor: 'pointer',
              color: '#fff',
              fontWeight: 800,
              fontSize: '15px',
              background:
                'linear-gradient(135deg,#4F46E5,#7C3AED,#EC4899)',
              boxShadow:
                '0 16px 35px rgba(124,58,237,0.35)',
            }}
          >
            + Add Server
          </button>

          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
            style={{
              width: '58px',
              height: '58px',
              borderRadius: '18px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '24px',
              background:
                'rgba(255,255,255,0.08)',
              color: darkMode
                ? '#fff'
                : '#111827',
            }}
          >
            {darkMode ? '🌙' : '☀️'}
          </button>
        </div>
      </div>

      {/* ANALYTICS */}
      <div
        style={{
          padding: '40px',
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit,minmax(250px,1fr))',
          gap: '24px',
        }}
      >
        {[
          {
            title: 'LIVE USERS',
            value:
              liveTraffic.toLocaleString(),
            icon: '🌍',
          },
          {
            title: 'AVG CPU LOAD',
            value: `${totalUsage}%`,
            icon: '⚡',
          },
          {
            title: 'ACTIVE SERVERS',
            value: servers.length,
            icon: '🖥️',
          },
        ].map((card, index) => (
          <div
            key={index}
            style={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '30px',
              padding: '28px',
              background:
                'rgba(255,255,255,0.05)',
              border:
                '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                width: '160px',
                height: '160px',
                borderRadius: '50%',
                background:
                  'rgba(99,102,241,0.12)',
                top: '-60px',
                right: '-60px',
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
                  width: '72px',
                  height: '72px',
                  borderRadius: '24px',
                  background:
                    'linear-gradient(135deg,#4F46E5,#8B5CF6,#EC4899)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '34px',
                  marginBottom: '24px',
                }}
              >
                {card.icon}
              </div>

              <div
                style={{
                  color: darkMode
                    ? '#94A3B8'
                    : '#475569',
                  fontSize: '14px',
                  marginBottom: '12px',
                }}
              >
                {card.title}
              </div>

              <div
                style={{
                  fontSize: '40px',
                  fontWeight: 900,
                  color: darkMode
                    ? '#fff'
                    : '#0F172A',
                }}
              >
                {card.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SERVER LIST */}
      <div
        style={{
          padding: '0 40px 40px',
        }}
      >
        <div
          style={{
            borderRadius: '32px',
            overflow: 'hidden',
            background:
              'rgba(255,255,255,0.04)',
            border:
              '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* TABLE HEADER */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                '2fr 1fr 1fr 1fr 100px',
              gap: '16px',
              padding: '22px 24px',
              background:
                'rgba(255,255,255,0.05)',
              fontWeight: 800,
              color: darkMode
                ? '#fff'
                : '#111827',
              fontSize: '14px',
            }}
          >
            <div>SERVER</div>
            <div>CPU</div>
            <div>MEMORY</div>
            <div>STATUS</div>
            <div>ACTION</div>
          </div>

          {/* TABLE BODY */}
          {servers.map((server) => (
            <div
              key={server.id}
              style={{
                display: 'grid',
                gridTemplateColumns:
                  '2fr 1fr 1fr 1fr 100px',
                gap: '16px',
                alignItems: 'center',
                padding: '24px',
                borderTop:
                  '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {/* SERVER */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                }}
              >
                <div
                  style={{
                    width: '58px',
                    height: '58px',
                    borderRadius: '18px',
                    background:
                      'linear-gradient(135deg,#4F46E5,#7C3AED)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent:
                      'center',
                    fontSize: '26px',
                  }}
                >
                  🖥️
                </div>

                <div>
                  <div
                    style={{
                      fontWeight: 800,
                      color: darkMode
                        ? '#fff'
                        : '#111827',
                      marginBottom: '6px',
                    }}
                  >
                    {server.name}
                  </div>

                  <div
                    style={{
                      color: darkMode
                        ? '#94A3B8'
                        : '#64748B',
                      fontSize: '13px',
                    }}
                  >
                    Connected Securely
                  </div>
                </div>
              </div>

              {/* CPU */}
              <div>
                <div
                  style={{
                    color: darkMode
                      ? '#fff'
                      : '#111827',
                    fontWeight: 800,
                    marginBottom: '10px',
                  }}
                >
                  {server.cpu}%
                </div>

                <div
                  style={{
                    width: '100%',
                    height: '10px',
                    borderRadius: '999px',
                    background:
                      'rgba(255,255,255,0.08)',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${server.cpu}%`,
                      height: '100%',
                      borderRadius: '999px',
                      background:
                        'linear-gradient(90deg,#4F46E5,#EC4899)',
                    }}
                  />
                </div>
              </div>

              {/* MEMORY */}
              <div
                style={{
                  fontWeight: 800,
                  color: darkMode
                    ? '#fff'
                    : '#111827',
                }}
              >
                {server.memory}%
              </div>

              {/* STATUS */}
              <div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 18px',
                    borderRadius: '999px',
                    background: `${getStatusColor(
                      server.status
                    )}20`,
                    color: getStatusColor(
                      server.status
                    ),
                    fontWeight: 700,
                    fontSize: '13px',
                  }}
                >
                  <span
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background:
                        getStatusColor(
                          server.status
                        ),
                    }}
                  />
                  {server.status}
                </div>
              </div>

              {/* ACTION */}
              <button
                onClick={() =>
                  removeServer(server.id)
                }
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '16px',
                  border: 'none',
                  cursor: 'pointer',
                  background:
                    'rgba(239,68,68,0.15)',
                  color: '#EF4444',
                  fontSize: '20px',
                  fontWeight: 800,
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* RESPONSIVE */}
      <style>
        {`
          @media (max-width: 900px) {
            div[style*="grid-template-columns: 2fr 1fr 1fr 1fr 100px"] {
              grid-template-columns: 1fr !important;
            }
          }

          @media (max-width: 600px) {
            div[style*="font-size: 48px"] {
              font-size: 34px !important;
            }
          }
        `}
      </style>
    </div>
  )
}