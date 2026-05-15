
const features = [
  {
    title: 'Fast Performance',
    desc: 'Optimized application performance with smooth experience and blazing fast loading.',
    icon: '⚡',
    bg: 'linear-gradient(135deg,#4F46E5,#7C3AED)',
  },
  {
    title: 'Cloud Sync',
    desc: 'Automatically sync your data securely across all devices in real time.',
    icon: '☁️',
    bg: 'linear-gradient(135deg,#0EA5E9,#06B6D4)',
  },
  {
    title: 'Analytics',
    desc: 'Powerful business insights with beautiful and interactive dashboard reports.',
    icon: '📊',
    bg: 'linear-gradient(135deg,#F97316,#FB7185)',
  },
]

export default function PremiumFeatureSection() {
  return (
    <div
      style={{
        background: '#020617',
        padding: '60px 40px',
        color: '#fff',
        fontFamily: 'sans-serif',
      }}
    >
      {/* Top Section */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '60px',
        }}
      >
        <div
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            borderRadius: '999px',
            background: 'rgba(99,102,241,0.15)',
            color: '#A5B4FC',
            marginBottom: '20px',
            fontWeight: 600,
          }}
        >
          ✨ Modern SaaS Platform
        </div>

        <h1
          style={{
            fontSize: '54px',
            lineHeight: 1.2,
            marginBottom: '20px',
            fontWeight: 800,
            maxWidth: '850px',
            marginInline: 'auto',
          }}
        >
          Build Better Products
          <span
            style={{
              background:
                'linear-gradient(90deg,#8B5CF6,#3B82F6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {' '}
            Faster & Smarter
          </span>
        </h1>

        <p
          style={{
            color: '#94A3B8',
            fontSize: '18px',
            // maxWidth: '700px',
            marginInline: 'auto',
            lineHeight: 1.8,
          }}
        >
          Create premium user experiences with modern dashboards,
          analytics, and seamless performance for your Electron and
          React applications.
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '18px',
            marginTop: '35px',
            flexWrap: 'wrap',
          }}
        >
          <button
            style={{
              padding: '16px 32px',
              border: 'none',
              borderRadius: '16px',
              background:
                'linear-gradient(135deg,#6366F1,#8B5CF6)',
              color: '#fff',
              fontSize: '16px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 15px 35px rgba(99,102,241,0.3)',
            }}
          >
            Get Started
          </button>

          <button
            style={{
              padding: '16px 32px',
              borderRadius: '16px',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#fff',
              fontSize: '16px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Live Demo
          </button>
        </div>
      </div>

      {/* Feature Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
          gap: '28px',
          marginBottom: '70px',
        }}
      >
        {features.map((item, index) => (
          <div
            key={index}
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '28px',
              padding: '30px',
              backdropFilter: 'blur(10px)',
              transition: '0.3s',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '22px',
                background: item.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '34px',
                marginBottom: '24px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
              }}
            >
              {item.icon}
            </div>

            <h2
              style={{
                fontSize: '28px',
                marginBottom: '15px',
              }}
            >
              {item.title}
            </h2>

            <p
              style={{
                color: '#94A3B8',
                lineHeight: 1.8,
                fontSize: '15px',
              }}
            >
              {item.desc}
            </p>

            <button
              style={{
                marginTop: '24px',
                padding: '12px 18px',
                border: 'none',
                borderRadius: '14px',
                background: 'rgba(255,255,255,0.08)',
                color: '#fff',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              Learn More →
            </button>
          </div>
        ))}
      </div>

      {/* Bottom CTA Section */}
      <div
        style={{
          position: 'relative',
          borderRadius: '32px',
          overflow: 'hidden',
          padding: '60px',
          background:
            'linear-gradient(135deg,#312E81,#1D4ED8,#0891B2)',
          boxShadow: '0 25px 60px rgba(59,130,246,0.25)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
            right: '-80px',
            top: '-80px',
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 2,
            // maxWidth: '700px',
          }}
        >
          <div
            style={{
              display: 'inline-block',
              padding: '8px 18px',
              borderRadius: '999px',
              background: 'rgba(255,255,255,0.12)',
              marginBottom: '22px',
              fontWeight: 600,
            }}
          >
            🚀 Boost Productivity
          </div>

          <h2
            style={{
              fontSize: '44px',
              lineHeight: 1.3,
              marginBottom: '18px',
              fontWeight: 800,
            }}
          >
            Create Stunning Desktop Experiences with Electron
          </h2>

          <p
            style={{
              color: 'rgba(255,255,255,0.88)',
              lineHeight: 1.8,
              fontSize: '17px',
              marginBottom: '30px',
            }}
          >
            Build scalable and modern desktop apps with React,
            TypeScript, and Electron. Deliver beautiful interfaces and
            lightning-fast performance.
          </p>

          <div
            style={{
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap',
              justifyContent:'center'
            }}
          >
            <button
              style={{
                padding: '16px 28px',
                border: 'none',
                borderRadius: '16px',
                background: '#fff',
                color: '#111827',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: '15px',
              }}
            >
              Start Free Trial
            </button>

            <button
              style={{
                padding: '16px 28px',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.25)',
                background: 'transparent',
                color: '#fff',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: '15px',
              }}
            >
              Watch Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}