import { useEffect, useRef, useState } from 'react'

type Message = {
  id: number
  text: string
  sender: 'user' | 'bot'
}

export default function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: '👋 Welcome to Electron Demo Support.',
      sender: 'bot',
    },
    {
      id: 2,
      text: 'How can we help you today?',
      sender: 'bot',
    },
  ])

  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const autoReply = [
    '🚀 Your application is running perfectly.',
    '✅ Latest update installed successfully.',
    '💡 You can test auto-update from settings.',
    '🔥 Electron performance looks great.',
    '📦 Build generated successfully.',
  ]

  const sendMessage = () => {
    if (!input.trim()) return

    const newMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'user',
    }

    setMessages((prev) => [...prev, newMessage])

    setInput('')

    setTimeout(() => {
      const botReply: Message = {
        id: Date.now() + 1,
        text:
          autoReply[
            Math.floor(
              Math.random() * autoReply.length
            )
          ],
        sender: 'bot',
      }

      setMessages((prev) => [...prev, botReply])
    }, 1000)
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }, [messages])

  return (
    <>
      {/* FLOAT BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          border: 'none',
          cursor: 'pointer',
          zIndex: 9999,
          background:
            'linear-gradient(135deg,#4F46E5,#7C3AED,#EC4899)',
          boxShadow:
            '0 18px 40px rgba(124,58,237,0.45)',
          color: '#fff',
          fontSize: '30px',
          transition: '0.3s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform =
            'scale(1.08)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform =
            'scale(1)'
        }}
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* CHAT BOX */}
      <div
        style={{
          position: 'fixed',
          bottom: '110px',
          right: '24px',
          width: '380px',
          maxWidth: 'calc(100vw - 32px)',
          height: '600px',
          background:
            'rgba(15,23,42,0.95)',
          backdropFilter: 'blur(20px)',
          border:
            '1px solid rgba(255,255,255,0.08)',
          borderRadius: '28px',
          overflow: 'hidden',
          zIndex: 9998,
          display: 'flex',
          flexDirection: 'column',
          transform: isOpen
            ? 'translateY(0px) scale(1)'
            : 'translateY(40px) scale(0.9)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'all 0.35s ease',
          boxShadow:
            '0 30px 60px rgba(0,0,0,0.45)',
        }}
      >
        {/* HEADER */}
        <div
          style={{
            padding: '20px',
            background:
              'linear-gradient(135deg,#4F46E5,#7C3AED)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
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
                width: '52px',
                height: '52px',
                borderRadius: '16px',
                background:
                  'rgba(255,255,255,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
              }}
            >
              🤖
            </div>

            <div>
              <div
                style={{
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: '18px',
                }}
              >
                Electron Support
              </div>

              <div
                style={{
                  color:
                    'rgba(255,255,255,0.8)',
                  fontSize: '13px',
                }}
              >
                Online Now
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              background:
                'rgba(255,255,255,0.15)',
              color: '#fff',
              fontSize: '18px',
            }}
          >
            ✕
          </button>
        </div>

        {/* CHAT BODY */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            background:
              'linear-gradient(180deg,#0F172A,#111827)',
          }}
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                justifyContent:
                  msg.sender === 'user'
                    ? 'flex-end'
                    : 'flex-start',
              }}
            >
              <div
                style={{
                  maxWidth: '78%',
                  padding: '14px 18px',
                  borderRadius:
                    msg.sender === 'user'
                      ? '20px 20px 6px 20px'
                      : '20px 20px 20px 6px',
                  background:
                    msg.sender === 'user'
                      ? 'linear-gradient(135deg,#4F46E5,#7C3AED)'
                      : 'rgba(255,255,255,0.08)',
                  color: '#fff',
                  fontSize: '14px',
                  lineHeight: 1.6,
                  border:
                    msg.sender === 'bot'
                      ? '1px solid rgba(255,255,255,0.08)'
                      : 'none',
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>

        {/* INPUT */}
        <div
          style={{
            padding: '18px',
            borderTop:
              '1px solid rgba(255,255,255,0.08)',
            background:
              'rgba(15,23,42,0.95)',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '12px',
            }}
          >
            <input
              type="text"
              value={input}
              placeholder="Type your message..."
              onChange={(e) =>
                setInput(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  sendMessage()
                }
              }}
              style={{
                flex: 1,
                height: '56px',
                borderRadius: '18px',
                border:
                  '1px solid rgba(255,255,255,0.08)',
                background:
                  'rgba(255,255,255,0.05)',
                color: '#fff',
                padding: '0 18px',
                outline: 'none',
                fontSize: '15px',
              }}
            />

            <button
              onClick={sendMessage}
              style={{
                width: '58px',
                height: '56px',
                borderRadius: '18px',
                border: 'none',
                cursor: 'pointer',
                background:
                  'linear-gradient(135deg,#4F46E5,#7C3AED,#EC4899)',
                color: '#fff',
                fontSize: '20px',
                fontWeight: 700,
                boxShadow:
                  '0 12px 24px rgba(124,58,237,0.35)',
              }}
            >
              ➤
            </button>
          </div>
        </div>
      </div>
    </>
  )
}