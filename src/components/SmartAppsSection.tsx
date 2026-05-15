import  { useMemo, useState } from 'react'

const appsData = [
  {
    name: 'Electron CRM',
    category: 'Business',
    downloads: 12450,
    status: 'Active',
    color: 'linear-gradient(135deg,#6366F1,#8B5CF6)',
  },
  {
    name: 'Task Manager',
    category: 'Productivity',
    downloads: 8420,
    status: 'Updating',
    color: 'linear-gradient(135deg,#06B6D4,#3B82F6)',
  },
  {
    name: 'Media Studio',
    category: 'Editing',
    downloads: 22110,
    status: 'Active',
    color: 'linear-gradient(135deg,#F97316,#FB7185)',
  },
  {
    name: 'Finance Pro',
    category: 'Finance',
    downloads: 5930,
    status: 'Inactive',
    color: 'linear-gradient(135deg,#10B981,#14B8A6)',
  },
]

export default function SmartAppsSection() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState('All')

  const categories = [
    'All',
    'Business',
    'Productivity',
    'Editing',
    'Finance',
  ]

  const filteredApps = useMemo(() => {
    return appsData.filter((app) => {
      const searchMatch = app.name
        .toLowerCase()
        .includes(search.toLowerCase())

      const categoryMatch =
        selected === 'All'
          ? true
          : app.category === selected

      return searchMatch && categoryMatch
    })
  }, [search, selected])

  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top,#111827,#020617)',
        padding: '70px 40px',
        color: '#fff',
        fontFamily: 'sans-serif',
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '55px',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            background: 'rgba(99,102,241,0.12)',
            color: '#C4B5FD',
            padding: '10px 18px',
            borderRadius: '999px',
            marginBottom: '22px',
            fontWeight: 700,
          }}
        >
          🚀 Smart Application Hub
        </div>

        <h1
          style={{
            fontSize: '58px',
            lineHeight: 1.2,
            marginBottom: '18px',
            fontWeight: 800,
          }}
        >
          Manage Your
          <span
            style={{
              background:
                'linear-gradient(90deg,#8B5CF6,#3B82F6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {' '}
            Desktop Apps
          </span>
        </h1>

        <p
          style={{
            maxWidth: '760px',
            margin: '0 auto',
            color: '#94A3B8',
            lineHeight: 1.9,
            fontSize: '17px',
          }}
        >
          Monitor applications, track downloads,
          manage updates, and explore analytics with
          a beautiful modern Electron dashboard.
        </p>
      </div>

      {/* Search + Filter */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '20px',
          flexWrap: 'wrap',
          marginBottom: '40px',
        }}
      >
        {/* Search */}
        <div
          style={{
            flex: 1,
            minWidth: '280px',
            position: 'relative',
          }}
        >
          <input
            type="text"
            placeholder="Search applications..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={{
              width: '100%',
              padding: '18px 22px',
              borderRadius: '18px',
              border:
                '1px solid rgba(255,255,255,0.08)',
              background:
                'rgba(255,255,255,0.05)',
              color: '#fff',
              outline: 'none',
              fontSize: '15px',
              backdropFilter: 'blur(10px)',
            }}
          />
        </div>

        {/* Category */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          {categories.map((item, index) => (
            <button
              key={index}
              onClick={() => setSelected(item)}
              style={{
                padding: '14px 20px',
                border: 'none',
                borderRadius: '16px',
                background:
                  selected === item
                    ? 'linear-gradient(135deg,#6366F1,#8B5CF6)'
                    : 'rgba(255,255,255,0.05)',
                color: '#fff',
                fontWeight: 700,
                cursor: 'pointer',
                transition: '0.3s',
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Apps Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit,minmax(320px,1fr))',
          gap: '28px',
        }}
      >
        {filteredApps.map((app, index) => (
          <div
            key={index}
            style={{
              background:
                'rgba(255,255,255,0.05)',
              border:
                '1px solid rgba(255,255,255,0.08)',
              borderRadius: '30px',
              padding: '30px',
              position: 'relative',
              overflow: 'hidden',
              transition: '0.35s',
              backdropFilter: 'blur(10px)',
            }}
          >
            {/* Glow */}
            <div
              style={{
                position: 'absolute',
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                background:
                  'rgba(255,255,255,0.08)',
                top: '-60px',
                right: '-60px',
              }}
            />

            {/* Top */}
            <div
              style={{
                display: 'flex',
                justifyContent:
                  'space-between',
                alignItems: 'center',
                marginBottom: '28px',
                position: 'relative',
                zIndex: 2,
              }}
            >
              <div
                style={{
                  width: '78px',
                  height: '78px',
                  borderRadius: '24px',
                  background: app.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '34px',
                  boxShadow:
                    '0 18px 40px rgba(99,102,241,0.25)',
                }}
              >
                💻
              </div>

              <div
                style={{
                  padding: '10px 16px',
                  borderRadius: '999px',
                  background:
                    app.status === 'Active'
                      ? 'rgba(16,185,129,0.18)'
                      : app.status ===
                        'Updating'
                      ? 'rgba(59,130,246,0.18)'
                      : 'rgba(248,113,113,0.18)',
                  color:
                    app.status === 'Active'
                      ? '#34D399'
                      : app.status ===
                        'Updating'
                      ? '#60A5FA'
                      : '#F87171',
                  fontWeight: 700,
                  fontSize: '13px',
                }}
              >
                {app.status}
              </div>
            </div>

            {/* Content */}
            <div
              style={{
                position: 'relative',
                zIndex: 2,
              }}
            >
              <h2
                style={{
                  fontSize: '30px',
                  marginBottom: '14px',
                  fontWeight: 800,
                }}
              >
                {app.name}
              </h2>

              <p
                style={{
                  color: '#94A3B8',
                  marginBottom: '22px',
                }}
              >
                {app.category}
              </p>

              {/* Downloads */}
              <div
                style={{
                  display: 'flex',
                  justifyContent:
                    'space-between',
                  alignItems: 'center',
                  marginBottom: '28px',
                }}
              >
                <div>
                  <div
                    style={{
                      color: '#94A3B8',
                      marginBottom: '8px',
                    }}
                  >
                    Downloads
                  </div>

                  <div
                    style={{
                      fontSize: '34px',
                      fontWeight: 800,
                    }}
                  >
                    {app.downloads.toLocaleString()}
                  </div>
                </div>

                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background:
                      'rgba(255,255,255,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '30px',
                  }}
                >
                  📈
                </div>
              </div>

              {/* Buttons */}
              <div
                style={{
                  display: 'flex',
                  gap: '14px',
                }}
              >
                <button
                  style={{
                    flex: 1,
                    padding: '15px',
                    border: 'none',
                    borderRadius: '16px',
                    background:
                      'linear-gradient(135deg,#6366F1,#8B5CF6)',
                    color: '#fff',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontSize: '15px',
                  }}
                >
                  Open App
                </button>

                <button
                  style={{
                    width: '60px',
                    border: 'none',
                    borderRadius: '16px',
                    background:
                      'rgba(255,255,255,0.06)',
                    color: '#fff',
                    fontSize: '22px',
                    cursor: 'pointer',
                  }}
                >
                  ⚙️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Banner */}
      <div
        style={{
          marginTop: '70px',
          borderRadius: '34px',
          padding: '45px',
          background:
            'linear-gradient(135deg,#312E81,#1D4ED8,#0891B2)',
          position: 'relative',
          overflow: 'hidden',
          boxShadow:
            '0 25px 60px rgba(59,130,246,0.25)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            background:
              'rgba(255,255,255,0.08)',
            right: '-80px',
            top: '-80px',
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            justifyContent:
              'space-between',
            alignItems: 'center',
            gap: '30px',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <h2
              style={{
                fontSize: '42px',
                marginBottom: '18px',
                fontWeight: 800,
              }}
            >
              Deploy Electron Apps Faster 🚀
            </h2>

            <p
              style={{
                maxWidth: '650px',
                lineHeight: 1.8,
                color:
                  'rgba(255,255,255,0.9)',
              }}
            >
              Build, manage, update, and monitor
              your desktop applications with a
              premium modern experience.
            </p>
          </div>

          <button
            style={{
              padding: '18px 30px',
              border: 'none',
              borderRadius: '18px',
              background: '#fff',
              color: '#111827',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: '15px',
            }}
          >
            Launch Workspace
          </button>
        </div>
      </div>
    </div>
  )
}