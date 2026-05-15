
const activityData = [
  {
    title: 'New Orders',
    count: '1,284',
    growth: '+18%',
    icon: '🛒',
    color: '#6366F1',
    bg: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
  },
  {
    title: 'Revenue',
    count: '$24.8K',
    growth: '+12%',
    icon: '💰',
    color: '#10B981',
    bg: 'linear-gradient(135deg, #10B981, #059669)',
  },
  {
    title: 'Customers',
    count: '8,920',
    growth: '+24%',
    icon: '👥',
    color: '#F59E0B',
    bg: 'linear-gradient(135deg, #F59E0B, #F97316)',
  },
  {
    title: 'Feedback',
    count: '342',
    growth: '+9%',
    icon: '⭐',
    color: '#EC4899',
    bg: 'linear-gradient(135deg, #EC4899, #BE185D)',
  },
]

export default function AnalyticsSection() {
  return (
    <div
      style={{
        padding: '40px',
        background: '#0F172A',
        minHeight: '100vh',
        color: '#fff',
        fontFamily: 'sans-serif',
      }}
    >
      {/* Header */}
      <div
        style={{
          marginBottom: '30px',
        }}
      >
        <h1
          style={{
            fontSize: '38px',
            fontWeight: '700',
            marginBottom: '10px',
          }}
        >
          Business Analytics
        </h1>

        <p
          style={{
            color: '#94A3B8',
            fontSize: '16px',
          }}
        >
          Track your performance with beautiful real-time insights
        </p>
      </div>

      {/* Top Banner */}
      <div
        style={{
          background:
            'linear-gradient(135deg, rgba(99,102,241,1), rgba(168,85,247,1))',
          borderRadius: '28px',
          padding: '35px',
          marginBottom: '35px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 20px 50px rgba(99,102,241,0.25)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: '-50px',
            top: '-50px',
            width: '220px',
            height: '220px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 2,
          }}
        >
          <h2
            style={{
              fontSize: '32px',
              marginBottom: '12px',
              fontWeight: 700,
            }}
          >
            Growth Increased 🚀
          </h2>

          <p
            style={{
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.9)',
              marginBottom: '25px',
            }}
          >
            Your business performance increased by 38% this month. Monitor
            trends, customer engagement, and financial growth with powerful
            dashboard analytics.
          </p>

          <button
            style={{
              padding: '14px 28px',
              border: 'none',
              borderRadius: '14px',
              background: '#fff',
              color: '#111827',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '15px',
            }}
          >
            Explore Report
          </button>
        </div>
      </div>

      {/* Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '24px',
          marginBottom: '35px',
        }}
      >
        {activityData.map((item, index) => (
          <div
            key={index}
            style={{
              background: '#1E293B',
              borderRadius: '24px',
              padding: '24px',
              border: '1px solid rgba(255,255,255,0.05)',
              transition: '0.3s',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '18px',
                background: item.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                marginBottom: '20px',
              }}
            >
              {item.icon}
            </div>

            <div
              style={{
                color: '#94A3B8',
                marginBottom: '10px',
                fontSize: '15px',
              }}
            >
              {item.title}
            </div>

            <div
              style={{
                fontSize: '32px',
                fontWeight: 700,
                marginBottom: '10px',
              }}
            >
              {item.count}
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(16,185,129,0.12)',
                color: '#10B981',
                padding: '8px 14px',
                borderRadius: '999px',
                fontWeight: 600,
                fontSize: '14px',
              }}
            >
              📈 {item.growth}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '24px',
        }}
      >
        {/* Chart Card */}
        <div
          style={{
            background: '#1E293B',
            borderRadius: '28px',
            padding: '30px',
            border: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '30px',
              alignItems: 'center',
            }}
          >
            <div>
              <h3
                style={{
                  margin: 0,
                  fontSize: '24px',
                }}
              >
                Weekly Performance
              </h3>

              <p
                style={{
                  color: '#94A3B8',
                  marginTop: '8px',
                }}
              >
                Last 7 days analytics report
              </p>
            </div>

            <button
              style={{
                background: '#334155',
                border: 'none',
                color: '#fff',
                padding: '10px 18px',
                borderRadius: '12px',
                cursor: 'pointer',
              }}
            >
              Export
            </button>
          </div>

          {/* Fake Graph */}
          <div
            style={{
              display: 'flex',
              alignItems: 'end',
              gap: '14px',
              height: '220px',
            }}
          >
            {[80, 140, 110, 170, 130, 190, 160].map((height, index) => (
              <div
                key={index}
                style={{
                  flex: 1,
                  height: `${height}px`,
                  borderRadius: '16px 16px 0 0',
                  background:
                    'linear-gradient(180deg, #8B5CF6, #6366F1)',
                }}
              />
            ))}
          </div>
        </div>

        {/* Side Info */}
        <div
          style={{
            background: '#1E293B',
            borderRadius: '28px',
            padding: '30px',
            border: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <h3
            style={{
              fontSize: '24px',
              marginBottom: '25px',
            }}
          >
            Team Progress
          </h3>

          {[
            { name: 'UI Design', progress: '92%' },
            { name: 'Frontend', progress: '81%' },
            { name: 'Backend', progress: '74%' },
            { name: 'Marketing', progress: '68%' },
          ].map((item, index) => (
            <div
              key={index}
              style={{
                marginBottom: '24px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '10px',
                }}
              >
                <span>{item.name}</span>
                <span>{item.progress}</span>
              </div>

              <div
                style={{
                  height: '10px',
                  background: '#334155',
                  borderRadius: '999px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: item.progress,
                    height: '100%',
                    background:
                      'linear-gradient(90deg, #06B6D4, #3B82F6)',
                    borderRadius: '999px',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}