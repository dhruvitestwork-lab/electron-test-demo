import { useEffect, useState } from 'react'

const testimonials = [
  {
    name: 'Dhruvi Savsaviya',
    role: 'Frontend Developer',
    review:
      'Amazing UI experience and very smooth Electron integration.',
  },
  {
    name: 'Amit Patel',
    role: 'UI Designer',
    review:
      'The dashboard design is premium and user interaction feels modern.',
  },
  {
    name: 'Rahul Shah',
    role: 'Project Manager',
    review:
      'Electron app performance and auto updates work perfectly.',
  },
]

export default function TestimonialsSection() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      style={{
        background:
          'radial-gradient(circle at top,#1E293B,#020617)',
        color: '#fff',
        padding: '70px 40px',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          marginBottom: '60px',
        }}
      >
        <h1
          style={{
            fontSize: '50px',
            marginBottom: '18px',
          }}
        >
          What Our Users Say 💬
        </h1>

        <p
          style={{
            color: '#94A3B8',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: 1.8,
          }}
        >
          Trusted by developers and teams building powerful Electron
          applications.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))',
          gap: '28px',
        }}
      >
        {testimonials.map((item, index) => {
          const isActive = active === index

          return (
            <div
              key={index}
              onMouseEnter={() => setActive(index)}
              style={{
                background: isActive
                  ? 'linear-gradient(135deg,#6366F1,#8B5CF6)'
                  : 'rgba(255,255,255,0.05)',
                border: isActive
                  ? 'none'
                  : '1px solid rgba(255,255,255,0.08)',
                borderRadius: '28px',
                padding: '35px',
                transition: '0.4s',
                transform: isActive
                  ? 'translateY(-10px) scale(1.03)'
                  : 'scale(1)',
                boxShadow: isActive
                  ? '0 20px 50px rgba(99,102,241,0.35)'
                  : 'none',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  fontSize: '50px',
                  marginBottom: '20px',
                }}
              >
                ⭐
              </div>

              <p
                style={{
                  lineHeight: 1.9,
                  color: isActive
                    ? '#fff'
                    : '#CBD5E1',
                  marginBottom: '28px',
                }}
              >
                "{item.review}"
              </p>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                }}
              >
                <div
                  style={{
                    width: '55px',
                    height: '55px',
                    borderRadius: '50%',
                    background:
                      'linear-gradient(135deg,#06B6D4,#3B82F6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '20px',
                  }}
                >
                  {item.name.charAt(0)}
                </div>

                <div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: '18px',
                    }}
                  >
                    {item.name}
                  </div>

                  <div
                    style={{
                      color: isActive
                        ? 'rgba(255,255,255,0.8)'
                        : '#94A3B8',
                      marginTop: '5px',
                    }}
                  >
                    {item.role}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}