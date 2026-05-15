// import { useState } from 'react'

// export default function PricingSection() {
//   const [yearly, setYearly] = useState(false)

//   const plans = [
//     {
//       name: 'Starter',
//       monthly: 19,
//       yearly: 180,
//       features: ['5 Projects', 'Basic Analytics', 'Email Support'],
//       popular: false,
//     },
//     {
//       name: 'Professional',
//       monthly: 49,
//       yearly: 470,
//       features: [
//         'Unlimited Projects',
//         'Advanced Analytics',
//         'Priority Support',
//       ],
//       popular: true,
//     },
//     {
//       name: 'Enterprise',
//       monthly: 99,
//       yearly: 950,
//       features: [
//         'Custom Integrations',
//         'Team Collaboration',
//         'Dedicated Manager',
//       ],
//       popular: false,
//     },
//   ]

//   return (
//     <div
//       style={{
//         background: '#020617',
//         color: '#fff',
//         padding: '60px 40px',
//         fontFamily: 'sans-serif',
//       }}
//     >
//       <div style={{ textAlign: 'center', marginBottom: '50px' }}>
//         <h1
//           style={{
//             fontSize: '48px',
//             marginBottom: '20px',
//           }}
//         >
//           Simple Pricing
//         </h1>

//         <p
//           style={{
//             color: '#94A3B8',
//             maxWidth: '650px',
//             margin: '0 auto 30px',
//             lineHeight: 1.8,
//           }}
//         >
//           Choose the perfect plan for your business and scale your
//           application faster.
//         </p>

//         {/* Toggle */}
//         <div
//           style={{
//             display: 'inline-flex',
//             alignItems: 'center',
//             gap: '15px',
//             background: '#1E293B',
//             padding: '10px 20px',
//             borderRadius: '999px',
//           }}
//         >
//           <span>Monthly</span>

//           <div
//             onClick={() => setYearly(!yearly)}
//             style={{
//               width: '60px',
//               height: '30px',
//               background: yearly ? '#6366F1' : '#334155',
//               borderRadius: '999px',
//               position: 'relative',
//               cursor: 'pointer',
//               transition: '0.3s',
//             }}
//           >
//             <div
//               style={{
//                 width: '24px',
//                 height: '24px',
//                 background: '#fff',
//                 borderRadius: '50%',
//                 position: 'absolute',
//                 top: '3px',
//                 left: yearly ? '32px' : '4px',
//                 transition: '0.3s',
//               }}
//             />
//           </div>

//           <span>Yearly</span>
//         </div>
//       </div>

//       {/* Cards */}
//       <div
//         style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
//           gap: '30px',
//         }}
//       >
//         {plans.map((plan, index) => (
//           <div
//             key={index}
//             style={{
//               background: plan.popular
//                 ? 'linear-gradient(135deg,#4F46E5,#7C3AED)'
//                 : '#1E293B',
//               padding: '35px',
//               borderRadius: '28px',
//               border: plan.popular
//                 ? 'none'
//                 : '1px solid rgba(255,255,255,0.08)',
//               position: 'relative',
//               overflow: 'hidden',
//               transition: '0.3s',
//             }}
//           >
//             {plan.popular && (
//               <div
//                 style={{
//                   position: 'absolute',
//                   top: '18px',
//                   right: '18px',
//                   background: '#fff',
//                   color: '#111827',
//                   padding: '6px 14px',
//                   borderRadius: '999px',
//                   fontWeight: 700,
//                   fontSize: '12px',
//                 }}
//               >
//                 POPULAR
//               </div>
//             )}

//             <h2 style={{ fontSize: '32px', marginBottom: '15px' }}>
//               {plan.name}
//             </h2>

//             <div
//               style={{
//                 fontSize: '54px',
//                 fontWeight: 800,
//                 marginBottom: '25px',
//               }}
//             >
//               ${yearly ? plan.yearly : plan.monthly}
//             </div>

//             <div style={{ marginBottom: '30px' }}>
//               {plan.features.map((feature, i) => (
//                 <div
//                   key={i}
//                   style={{
//                     marginBottom: '15px',
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '10px',
//                   }}
//                 >
//                   ✅ {feature}
//                 </div>
//               ))}
//             </div>

//             <button
//               style={{
//                 width: '100%',
//                 padding: '16px',
//                 border: 'none',
//                 borderRadius: '16px',
//                 background: plan.popular ? '#fff' : '#6366F1',
//                 color: plan.popular ? '#111827' : '#fff',
//                 fontWeight: 700,
//                 cursor: 'pointer',
//                 fontSize: '15px',
//               }}
//             >
//               Get Started
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }


import { useMemo, useState } from 'react'

const plans = [
  {
    name: 'Starter',
    price: 19,
    users: '5 Users',
    storage: '20 GB Storage',
    updates: 'Basic Auto Update',
    popular: false,
    gradient: 'linear-gradient(135deg,#1E293B,#334155)',
  },
  {
    name: 'Professional',
    price: 49,
    users: '25 Users',
    storage: '250 GB Storage',
    updates: 'Priority Auto Update',
    popular: true,
    gradient: 'linear-gradient(135deg,#4F46E5,#7C3AED)',
  },
  {
    name: 'Enterprise',
    price: 99,
    users: 'Unlimited Users',
    storage: '2 TB Storage',
    updates: 'Realtime Deployment',
    popular: false,
    gradient: 'linear-gradient(135deg,#0F766E,#06B6D4)',
  },
]

export default function PricingSection() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>(
    'monthly'
  )

  const calculatedPlans = useMemo(() => {
    return plans.map((plan) => ({
      ...plan,
      finalPrice:
        billing === 'yearly'
          ? Math.floor(plan.price * 10)
          : plan.price,
    }))
  }, [billing])

  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top,#0F172A,#020617)',
        padding: '80px 40px',
        color: '#fff',
        fontFamily: 'sans-serif',
      }}
    >
      {/* Header */}
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
            background: 'rgba(99,102,241,0.12)',
            color: '#C4B5FD',
            padding: '10px 20px',
            borderRadius: '999px',
            marginBottom: '22px',
            fontWeight: 700,
          }}
        >
          💎 Flexible Pricing
        </div>

        <h1
          style={{
            fontSize: '60px',
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: '20px',
          }}
        >
          Upgrade Your
          <span
            style={{
              background:
                'linear-gradient(90deg,#8B5CF6,#3B82F6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {' '}
            Electron Experience
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
          Choose a powerful plan for your Electron
          applications with live updates, cloud sync,
          analytics, and premium deployment tools.
        </p>

        {/* Toggle */}
        <div
          style={{
            marginTop: '35px',
            display: 'inline-flex',
            background:
              'rgba(255,255,255,0.05)',
            border:
              '1px solid rgba(255,255,255,0.08)',
            borderRadius: '18px',
            padding: '8px',
            gap: '10px',
          }}
        >
          {['monthly', 'yearly'].map(
            (item) => (
              <button
                key={item}
                onClick={() =>
                  setBilling(
                    item as
                      | 'monthly'
                      | 'yearly'
                  )
                }
                style={{
                  padding: '14px 24px',
                  border: 'none',
                  borderRadius: '14px',
                  background:
                    billing === item
                      ? 'linear-gradient(135deg,#6366F1,#8B5CF6)'
                      : 'transparent',
                  color: '#fff',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: '0.3s',
                  textTransform:
                    'capitalize',
                }}
              >
                {item}
              </button>
            )
          )}
        </div>
      </div>

      {/* Pricing Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit,minmax(320px,1fr))',
          gap: '30px',
        }}
      >
        {calculatedPlans.map(
          (plan, index) => (
            <div
              key={index}
              style={{
                background:
                  'rgba(255,255,255,0.05)',
                border:
                  plan.popular
                    ? '2px solid rgba(139,92,246,0.7)'
                    : '1px solid rgba(255,255,255,0.08)',
                borderRadius: '34px',
                padding: '38px',
                position: 'relative',
                overflow: 'hidden',
                backdropFilter:
                  'blur(12px)',
                transform: plan.popular
                  ? 'scale(1.03)'
                  : 'scale(1)',
                transition: '0.35s',
                boxShadow: plan.popular
                  ? '0 25px 60px rgba(99,102,241,0.25)'
                  : 'none',
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
                    'rgba(255,255,255,0.05)',
                  top: '-80px',
                  right: '-80px',
                }}
              />

              {/* Popular */}
              {plan.popular && (
                <div
                  style={{
                    position: 'absolute',
                    top: '22px',
                    right: '22px',
                    padding: '10px 16px',
                    borderRadius: '999px',
                    background:
                      'linear-gradient(135deg,#8B5CF6,#6366F1)',
                    fontWeight: 700,
                    fontSize: '13px',
                  }}
                >
                  ⭐ Most Popular
                </div>
              )}

              <div
                style={{
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: '82px',
                    height: '82px',
                    borderRadius: '26px',
                    background: plan.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '34px',
                    marginBottom: '28px',
                    boxShadow:
                      '0 18px 40px rgba(99,102,241,0.2)',
                  }}
                >
                  🚀
                </div>

                {/* Name */}
                <div
                  style={{
                    fontSize: '30px',
                    fontWeight: 800,
                    marginBottom: '14px',
                  }}
                >
                  {plan.name}
                </div>

                {/* Price */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: '8px',
                    marginBottom: '28px',
                  }}
                >
                  <div
                    style={{
                      fontSize: '58px',
                      fontWeight: 800,
                    }}
                  >
                    ${plan.finalPrice}
                  </div>

                  <div
                    style={{
                      color: '#94A3B8',
                      marginBottom: '12px',
                    }}
                  >
                    /{billing === 'monthly'
                      ? 'month'
                      : 'year'}
                  </div>
                </div>

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
                    plan.users,
                    plan.storage,
                    plan.updates,
                    'Realtime Analytics',
                    'Cloud Backup',
                  ].map((feature, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems:
                          'center',
                        gap: '12px',
                        color: '#E2E8F0',
                      }}
                    >
                      <div
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius:
                            '50%',
                          background:
                            'rgba(16,185,129,0.18)',
                          display: 'flex',
                          alignItems:
                            'center',
                          justifyContent:
                            'center',
                          color: '#10B981',
                          fontSize: '14px',
                          fontWeight: 700,
                        }}
                      >
                        ✓
                      </div>

                      {feature}
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
                    background:
                      plan.popular
                        ? 'linear-gradient(135deg,#6366F1,#8B5CF6)'
                        : 'rgba(255,255,255,0.08)',
                    color: '#fff',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontSize: '16px',
                    transition: '0.3s',
                  }}
                >
                  Choose Plan
                </button>
              </div>
            </div>
          )
        )}
      </div>

      {/* Bottom Banner */}
      <div
        style={{
          marginTop: '80px',
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
            width: '260px',
            height: '260px',
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
            flexWrap: 'wrap',
            gap: '25px',
          }}
        >
          <div>
            <h2
              style={{
                fontSize: '42px',
                fontWeight: 800,
                marginBottom: '16px',
              }}
            >
              Ready to Scale Faster? ⚡
            </h2>

            <p
              style={{
                color:
                  'rgba(255,255,255,0.9)',
                maxWidth: '650px',
                lineHeight: 1.8,
              }}
            >
              Unlock premium Electron features,
              advanced auto-updates, deployment
              tools, analytics, and realtime
              monitoring today.
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
            Start Free Trial
          </button>
        </div>
      </div>
    </div>
  )
}