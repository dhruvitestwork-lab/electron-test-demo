import { useState } from 'react'

const plans = [
  {
    name: 'Starter',
    price: '$19',
    users: '5 Team Members',
    updates: 'Weekly Updates',
    storage: '10GB Cloud Storage',
    color: 'linear-gradient(135deg,#3B82F6,#6366F1)',
  },
  {
    name: 'Professional',
    price: '$49',
    users: '25 Team Members',
    updates: 'Daily Updates',
    storage: '100GB Cloud Storage',
    color: 'linear-gradient(135deg,#8B5CF6,#EC4899)',
  },
  {
    name: 'Enterprise',
    price: '$99',
    users: 'Unlimited Users',
    updates: 'Realtime Updates',
    storage: '1TB Cloud Storage',
    color: 'linear-gradient(135deg,#10B981,#06B6D4)',
  },
]

export default function PricingDashboardSection() {
  const [selectedPlan, setSelectedPlan] =
    useState('Professional')

  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top,#0F172A,#020617)',
        padding: '70px 40px',
        color: '#fff',
        fontFamily: 'sans-serif',
      }}
    >
      {/* Top Header */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '70px',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 18px',
            borderRadius: '999px',
            background:
              'rgba(99,102,241,0.12)',
            color: '#C4B5FD',
            fontWeight: 700,
            marginBottom: '24px',
          }}
        >
          💎 Premium Workspace
        </div>

        <h1
          style={{
            fontSize: '62px',
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: '22px',
          }}
        >
          Powerful Pricing
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
            maxWidth: '780px',
            margin: '0 auto',
            color: '#94A3B8',
            lineHeight: 1.9,
            fontSize: '17px',
          }}
        >
          Manage your Electron application
          subscriptions, realtime updates, cloud
          storage, and deployment plans with a
          premium interactive UI experience.
        </p>
      </div>

      {/* Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit,minmax(320px,1fr))',
          gap: '30px',
          marginBottom: '60px',
        }}
      >
        {plans.map((plan, index) => {
          const active =
            selectedPlan === plan.name

          return (
            <div
              key={index}
              onClick={() =>
                setSelectedPlan(plan.name)
              }
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '34px',
                padding: '35px',
                background: active
                  ? plan.color
                  : 'rgba(255,255,255,0.05)',
                border: active
                  ? '2px solid rgba(255,255,255,0.2)'
                  : '1px solid rgba(255,255,255,0.08)',
                cursor: 'pointer',
                transition: '0.35s',
                transform: active
                  ? 'translateY(-10px)'
                  : 'translateY(0)',
                boxShadow: active
                  ? '0 25px 55px rgba(99,102,241,0.3)'
                  : 'none',
                backdropFilter: 'blur(10px)',
              }}
            >
              {/* Glow */}
              <div
                style={{
                  position: 'absolute',
                  width: '240px',
                  height: '240px',
                  borderRadius: '50%',
                  background:
                    'rgba(255,255,255,0.08)',
                  top: '-90px',
                  right: '-90px',
                }}
              />

              {/* Badge */}
              {active && (
                <div
                  style={{
                    position: 'absolute',
                    top: '22px',
                    right: '22px',
                    background: '#fff',
                    color: '#111827',
                    padding: '8px 14px',
                    borderRadius: '999px',
                    fontSize: '12px',
                    fontWeight: 700,
                  }}
                >
                  MOST POPULAR
                </div>
              )}

              {/* Content */}
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
                      'rgba(255,255,255,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '34px',
                    marginBottom: '28px',
                  }}
                >
                  ⚡
                </div>

                <div
                  style={{
                    fontSize: '32px',
                    fontWeight: 800,
                    marginBottom: '12px',
                  }}
                >
                  {plan.name}
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: '8px',
                    marginBottom: '30px',
                  }}
                >
                  <div
                    style={{
                      fontSize: '58px',
                      fontWeight: 900,
                    }}
                  >
                    {plan.price}
                  </div>

                  <div
                    style={{
                      marginBottom: '10px',
                      opacity: 0.8,
                    }}
                  >
                    /month
                  </div>
                </div>

                {/* Features */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '18px',
                    marginBottom: '35px',
                  }}
                >
                  {[
                    plan.users,
                    plan.updates,
                    plan.storage,
                  ].map((feature, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems:
                          'center',
                        gap: '14px',
                      }}
                    >
                      <div
                        style={{
                          width: '30px',
                          height: '30px',
                          borderRadius:
                            '50%',
                          background:
                            'rgba(255,255,255,0.15)',
                          display: 'flex',
                          alignItems:
                            'center',
                          justifyContent:
                            'center',
                          fontSize: '14px',
                        }}
                      >
                        ✓
                      </div>

                      <div>{feature}</div>
                    </div>
                  ))}
                </div>

                {/* Button */}
                <button
                  style={{
                    width: '100%',
                    padding: '18px',
                    border: 'none',
                    borderRadius: '18px',
                    background: active
                      ? '#fff'
                      : 'linear-gradient(135deg,#6366F1,#8B5CF6)',
                    color: active
                      ? '#111827'
                      : '#fff',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontSize: '15px',
                  }}
                >
                  {active
                    ? 'Current Active Plan'
                    : 'Choose Plan'}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom Dashboard */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit,minmax(260px,1fr))',
          gap: '24px',
        }}
      >
        {[
          {
            title: 'Total Revenue',
            value: '$84,290',
            icon: '💰',
          },
          {
            title: 'Active Installs',
            value: '48.2K',
            icon: '📥',
          },
          {
            title: 'Live Updates',
            value: '124',
            icon: '🚀',
          },
          {
            title: 'Cloud Sync',
            value: '99.9%',
            icon: '☁️',
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
              padding: '28px',
              backdropFilter: 'blur(10px)',
              transition: '0.3s',
            }}
          >
            <div
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '22px',
                background:
                  'linear-gradient(135deg,#6366F1,#8B5CF6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                marginBottom: '22px',
                boxShadow:
                  '0 18px 40px rgba(99,102,241,0.25)',
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
                fontWeight: 900,
              }}
            >
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}