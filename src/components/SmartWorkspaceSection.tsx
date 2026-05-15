import { useEffect, useState } from 'react'

const notifications = [
  '🚀 New Electron update available',
  '✅ Backup completed successfully',
  '📦 Build generated successfully',
  '⚡ Performance improved by 32%',
]

export default function SmartWorkspaceSection() {
  const [activeNotification, setActiveNotification] = useState(0)
  const [darkMode, setDarkMode] = useState(true)
  const [tasks, setTasks] = useState([
    {
      title: 'Update Electron Version',
      completed: true,
    },
    {
      title: 'Push Release to GitHub',
      completed: false,
    },
    {
      title: 'Generate DMG Installer',
      completed: false,
    },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNotification((prev) =>
        prev === notifications.length - 1 ? 0 : prev + 1
      )
    }, 2500)

    return () => clearInterval(interval)
  }, [])

  const toggleTask = (index: number) => {
    const updated = [...tasks]

    updated[index].completed =
      !updated[index].completed

    setTasks(updated)
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: darkMode
          ? 'linear-gradient(135deg,#020617,#111827,#1E1B4B)'
          : '#F8FAFC',
        color: darkMode ? '#fff' : '#111827',
        padding: '60px 40px',
        fontFamily: 'sans-serif',
        transition: '0.4s',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          marginBottom: '50px',
        }}
      >
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: darkMode
                ? 'rgba(99,102,241,0.12)'
                : '#E0E7FF',
              color: '#6366F1',
              padding: '10px 18px',
              borderRadius: '999px',
              marginBottom: '20px',
              fontWeight: 700,
            }}
          >
            ⚡ Smart Workspace
          </div>

          <h1
            style={{
              fontSize: '56px',
              lineHeight: 1.2,
              marginBottom: '15px',
              fontWeight: 800,
            }}
          >
            Modern Productivity
            <span
              style={{
                background:
                  'linear-gradient(90deg,#8B5CF6,#3B82F6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {' '}
              Dashboard
            </span>
          </h1>

          <p
            style={{
              maxWidth: '700px',
              color: darkMode
                ? '#94A3B8'
                : '#475569',
              lineHeight: 1.8,
            }}
          >
            Manage Electron updates, releases,
            notifications, builds, and workflow tasks
            with a beautiful smart dashboard experience.
          </p>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            padding: '16px 24px',
            border: 'none',
            borderRadius: '18px',
            background:
              'linear-gradient(135deg,#6366F1,#8B5CF6)',
            color: '#fff',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow:
              '0 15px 35px rgba(99,102,241,0.35)',
          }}
        >
          {darkMode
            ? '☀️ Light Mode'
            : '🌙 Dark Mode'}
        </button>
      </div>

      {/* Main Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            '1.3fr 0.7fr',
          gap: '30px',
        }}
      >
        {/* Left */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '30px',
          }}
        >
          {/* Notification Card */}
          <div
            style={{
              background: darkMode
                ? 'rgba(255,255,255,0.05)'
                : '#fff',
              border: darkMode
                ? '1px solid rgba(255,255,255,0.08)'
                : '1px solid #E2E8F0',
              borderRadius: '30px',
              padding: '35px',
              backdropFilter: 'blur(10px)',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                width: '220px',
                height: '220px',
                borderRadius: '50%',
                background:
                  'rgba(99,102,241,0.12)',
                right: '-80px',
                top: '-80px',
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
                  fontSize: '22px',
                  marginBottom: '22px',
                  fontWeight: 700,
                }}
              >
                🔔 Live Notifications
              </div>

              <div
                style={{
                  background:
                    'linear-gradient(135deg,#6366F1,#8B5CF6)',
                  padding: '22px',
                  borderRadius: '22px',
                  fontSize: '18px',
                  fontWeight: 600,
                  transition: '0.4s',
                  boxShadow:
                    '0 18px 40px rgba(99,102,241,0.25)',
                }}
              >
                {
                  notifications[
                    activeNotification
                  ]
                }
              </div>
            </div>
          </div>

          {/* Tasks */}
          <div
            style={{
              background: darkMode
                ? 'rgba(255,255,255,0.05)'
                : '#fff',
              border: darkMode
                ? '1px solid rgba(255,255,255,0.08)'
                : '1px solid #E2E8F0',
              borderRadius: '30px',
              padding: '35px',
            }}
          >
            <div
              style={{
                fontSize: '24px',
                marginBottom: '28px',
                fontWeight: 700,
              }}
            >
              ✅ Workflow Tasks
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
              }}
            >
              {tasks.map((task, index) => (
                <div
                  key={index}
                  onClick={() =>
                    toggleTask(index)
                  }
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent:
                      'space-between',
                    padding: '18px 22px',
                    borderRadius: '18px',
                    background: task.completed
                      ? 'linear-gradient(135deg,#10B981,#14B8A6)'
                      : darkMode
                      ? 'rgba(255,255,255,0.04)'
                      : '#F1F5F9',
                    cursor: 'pointer',
                    transition: '0.3s',
                  }}
                >
                  <span
                    style={{
                      textDecoration:
                        task.completed
                          ? 'line-through'
                          : 'none',
                      opacity:
                        task.completed
                          ? 0.9
                          : 1,
                    }}
                  >
                    {task.title}
                  </span>

                  <div
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      background:
                        'rgba(255,255,255,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {task.completed
                      ? '✔'
                      : '+'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '25px',
          }}
        >
          {/* Profile */}
          <div
            style={{
              background:
                'linear-gradient(135deg,#6366F1,#8B5CF6)',
              borderRadius: '30px',
              padding: '35px',
              textAlign: 'center',
              boxShadow:
                '0 20px 45px rgba(99,102,241,0.35)',
            }}
          >
            <div
              style={{
                width: '95px',
                height: '95px',
                borderRadius: '50%',
                background:
                  'rgba(255,255,255,0.18)',
                margin: '0 auto 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '38px',
                fontWeight: 700,
              }}
            >
              D
            </div>

            <h2
              style={{
                marginBottom: '10px',
                fontSize: '28px',
              }}
            >
              Dhruvi
            </h2>

            <p
              style={{
                opacity: 0.9,
                marginBottom: '24px',
              }}
            >
              Electron Developer
            </p>

            <button
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
              View Profile
            </button>
          </div>

          {/* Stats */}
          {[
            {
              title: 'Build Success',
              value: '98%',
              icon: '🚀',
            },
            {
              title: 'Auto Updates',
              value: '24',
              icon: '⚡',
            },
          ].map((item, index) => (
            <div
              key={index}
              style={{
                background: darkMode
                  ? 'rgba(255,255,255,0.05)'
                  : '#fff',
                border: darkMode
                  ? '1px solid rgba(255,255,255,0.08)'
                  : '1px solid #E2E8F0',
                borderRadius: '28px',
                padding: '28px',
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
                  color: darkMode
                    ? '#94A3B8'
                    : '#64748B',
                  marginBottom: '10px',
                }}
              >
                {item.title}
              </div>

              <div
                style={{
                  fontSize: '42px',
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