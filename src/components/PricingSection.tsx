import { useState } from 'react'

export default function PricingSection() {
  const [yearly, setYearly] = useState(false)

  const plans = [
    {
      name: 'Starter',
      monthly: 19,
      yearly: 180,
      features: ['5 Projects', 'Basic Analytics', 'Email Support'],
      popular: false,
    },
    {
      name: 'Professional',
      monthly: 49,
      yearly: 470,
      features: [
        'Unlimited Projects',
        'Advanced Analytics',
        'Priority Support',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      monthly: 99,
      yearly: 950,
      features: [
        'Custom Integrations',
        'Team Collaboration',
        'Dedicated Manager',
      ],
      popular: false,
    },
  ]

  return (
    <div
      style={{
        background: '#020617',
        color: '#fff',
        padding: '60px 40px',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1
          style={{
            fontSize: '48px',
            marginBottom: '20px',
          }}
        >
          Simple Pricing
        </h1>

        <p
          style={{
            color: '#94A3B8',
            maxWidth: '650px',
            margin: '0 auto 30px',
            lineHeight: 1.8,
          }}
        >
          Choose the perfect plan for your business and scale your
          application faster.
        </p>

        {/* Toggle */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '15px',
            background: '#1E293B',
            padding: '10px 20px',
            borderRadius: '999px',
          }}
        >
          <span>Monthly</span>

          <div
            onClick={() => setYearly(!yearly)}
            style={{
              width: '60px',
              height: '30px',
              background: yearly ? '#6366F1' : '#334155',
              borderRadius: '999px',
              position: 'relative',
              cursor: 'pointer',
              transition: '0.3s',
            }}
          >
            <div
              style={{
                width: '24px',
                height: '24px',
                background: '#fff',
                borderRadius: '50%',
                position: 'absolute',
                top: '3px',
                left: yearly ? '32px' : '4px',
                transition: '0.3s',
              }}
            />
          </div>

          <span>Yearly</span>
        </div>
      </div>

      {/* Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
          gap: '30px',
        }}
      >
        {plans.map((plan, index) => (
          <div
            key={index}
            style={{
              background: plan.popular
                ? 'linear-gradient(135deg,#4F46E5,#7C3AED)'
                : '#1E293B',
              padding: '35px',
              borderRadius: '28px',
              border: plan.popular
                ? 'none'
                : '1px solid rgba(255,255,255,0.08)',
              position: 'relative',
              overflow: 'hidden',
              transition: '0.3s',
            }}
          >
            {plan.popular && (
              <div
                style={{
                  position: 'absolute',
                  top: '18px',
                  right: '18px',
                  background: '#fff',
                  color: '#111827',
                  padding: '6px 14px',
                  borderRadius: '999px',
                  fontWeight: 700,
                  fontSize: '12px',
                }}
              >
                POPULAR
              </div>
            )}

            <h2 style={{ fontSize: '32px', marginBottom: '15px' }}>
              {plan.name}
            </h2>

            <div
              style={{
                fontSize: '54px',
                fontWeight: 800,
                marginBottom: '25px',
              }}
            >
              ${yearly ? plan.yearly : plan.monthly}
            </div>

            <div style={{ marginBottom: '30px' }}>
              {plan.features.map((feature, i) => (
                <div
                  key={i}
                  style={{
                    marginBottom: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  ✅ {feature}
                </div>
              ))}
            </div>

            <button
              style={{
                width: '100%',
                padding: '16px',
                border: 'none',
                borderRadius: '16px',
                background: plan.popular ? '#fff' : '#6366F1',
                color: plan.popular ? '#111827' : '#fff',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: '15px',
              }}
            >
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}