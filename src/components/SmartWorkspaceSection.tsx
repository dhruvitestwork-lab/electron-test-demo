// import { useEffect, useState } from 'react'

// const notifications = [
//   '🚀 New Electron update available',
//   '✅ Backup completed successfully',
//   '📦 Build generated successfully',
//   '⚡ Performance improved by 32%',
// ]

// export default function SmartWorkspaceSection() {
//   const [activeNotification, setActiveNotification] = useState(0)
//   const [darkMode, setDarkMode] = useState(true)
//   const [tasks, setTasks] = useState([
//     {
//       title: 'Update Electron Version',
//       completed: true,
//     },
//     {
//       title: 'Push Release to GitHub',
//       completed: false,
//     },
//     {
//       title: 'Generate DMG Installer',
//       completed: false,
//     },
//   ])

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveNotification((prev) =>
//         prev === notifications.length - 1 ? 0 : prev + 1
//       )
//     }, 2500)

//     return () => clearInterval(interval)
//   }, [])

//   const toggleTask = (index: number) => {
//     const updated = [...tasks]

//     updated[index].completed =
//       !updated[index].completed

//     setTasks(updated)
//   }

//   return (
//     <div
//       style={{
//         minHeight: '100vh',
//         background: darkMode
//           ? 'linear-gradient(135deg,#020617,#111827,#1E1B4B)'
//           : '#F8FAFC',
//         color: darkMode ? '#fff' : '#111827',
//         padding: '60px 40px',
//         fontFamily: 'sans-serif',
//         transition: '0.4s',
//       }}
//     >
//       {/* Header */}
//       <div
//         style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           flexWrap: 'wrap',
//           gap: '20px',
//           marginBottom: '50px',
//         }}
//       >
//         <div>
//           <div
//             style={{
//               display: 'inline-flex',
//               alignItems: 'center',
//               gap: '10px',
//               background: darkMode
//                 ? 'rgba(99,102,241,0.12)'
//                 : '#E0E7FF',
//               color: '#6366F1',
//               padding: '10px 18px',
//               borderRadius: '999px',
//               marginBottom: '20px',
//               fontWeight: 700,
//             }}
//           >
//             ⚡ Smart Workspace
//           </div>

//           <h1
//             style={{
//               fontSize: '56px',
//               lineHeight: 1.2,
//               marginBottom: '15px',
//               fontWeight: 800,
//             }}
//           >
//             Modern Productivity
//             <span
//               style={{
//                 background:
//                   'linear-gradient(90deg,#8B5CF6,#3B82F6)',
//                 WebkitBackgroundClip: 'text',
//                 WebkitTextFillColor: 'transparent',
//               }}
//             >
//               {' '}
//               Dashboard
//             </span>
//           </h1>

//           <p
//             style={{
//               maxWidth: '700px',
//               color: darkMode
//                 ? '#94A3B8'
//                 : '#475569',
//               lineHeight: 1.8,
//             }}
//           >
//             Manage Electron updates, releases,
//             notifications, builds, and workflow tasks
//             with a beautiful smart dashboard experience.
//           </p>
//         </div>

//         {/* Theme Toggle */}
//         <button
//           onClick={() => setDarkMode(!darkMode)}
//           style={{
//             padding: '16px 24px',
//             border: 'none',
//             borderRadius: '18px',
//             background:
//               'linear-gradient(135deg,#6366F1,#8B5CF6)',
//             color: '#fff',
//             fontWeight: 700,
//             cursor: 'pointer',
//             boxShadow:
//               '0 15px 35px rgba(99,102,241,0.35)',
//           }}
//         >
//           {darkMode
//             ? '☀️ Light Mode'
//             : '🌙 Dark Mode'}
//         </button>
//       </div>

//       {/* Main Layout */}
//       <div
//         style={{
//           display: 'grid',
//           gridTemplateColumns:
//             '1.3fr 0.7fr',
//           gap: '30px',
//         }}
//       >
//         {/* Left */}
//         <div
//           style={{
//             display: 'flex',
//             flexDirection: 'column',
//             gap: '30px',
//           }}
//         >
//           {/* Notification Card */}
//           <div
//             style={{
//               background: darkMode
//                 ? 'rgba(255,255,255,0.05)'
//                 : '#fff',
//               border: darkMode
//                 ? '1px solid rgba(255,255,255,0.08)'
//                 : '1px solid #E2E8F0',
//               borderRadius: '30px',
//               padding: '35px',
//               backdropFilter: 'blur(10px)',
//               overflow: 'hidden',
//               position: 'relative',
//             }}
//           >
//             <div
//               style={{
//                 position: 'absolute',
//                 width: '220px',
//                 height: '220px',
//                 borderRadius: '50%',
//                 background:
//                   'rgba(99,102,241,0.12)',
//                 right: '-80px',
//                 top: '-80px',
//               }}
//             />

//             <div
//               style={{
//                 position: 'relative',
//                 zIndex: 2,
//               }}
//             >
//               <div
//                 style={{
//                   fontSize: '22px',
//                   marginBottom: '22px',
//                   fontWeight: 700,
//                 }}
//               >
//                 🔔 Live Notifications
//               </div>

//               <div
//                 style={{
//                   background:
//                     'linear-gradient(135deg,#6366F1,#8B5CF6)',
//                   padding: '22px',
//                   borderRadius: '22px',
//                   fontSize: '18px',
//                   fontWeight: 600,
//                   transition: '0.4s',
//                   boxShadow:
//                     '0 18px 40px rgba(99,102,241,0.25)',
//                 }}
//               >
//                 {
//                   notifications[
//                     activeNotification
//                   ]
//                 }
//               </div>
//             </div>
//           </div>

//           {/* Tasks */}
//           <div
//             style={{
//               background: darkMode
//                 ? 'rgba(255,255,255,0.05)'
//                 : '#fff',
//               border: darkMode
//                 ? '1px solid rgba(255,255,255,0.08)'
//                 : '1px solid #E2E8F0',
//               borderRadius: '30px',
//               padding: '35px',
//             }}
//           >
//             <div
//               style={{
//                 fontSize: '24px',
//                 marginBottom: '28px',
//                 fontWeight: 700,
//               }}
//             >
//               ✅ Workflow Tasks
//             </div>

//             <div
//               style={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: '18px',
//               }}
//             >
//               {tasks.map((task, index) => (
//                 <div
//                   key={index}
//                   onClick={() =>
//                     toggleTask(index)
//                   }
//                   style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent:
//                       'space-between',
//                     padding: '18px 22px',
//                     borderRadius: '18px',
//                     background: task.completed
//                       ? 'linear-gradient(135deg,#10B981,#14B8A6)'
//                       : darkMode
//                       ? 'rgba(255,255,255,0.04)'
//                       : '#F1F5F9',
//                     cursor: 'pointer',
//                     transition: '0.3s',
//                   }}
//                 >
//                   <span
//                     style={{
//                       textDecoration:
//                         task.completed
//                           ? 'line-through'
//                           : 'none',
//                       opacity:
//                         task.completed
//                           ? 0.9
//                           : 1,
//                     }}
//                   >
//                     {task.title}
//                   </span>

//                   <div
//                     style={{
//                       width: '30px',
//                       height: '30px',
//                       borderRadius: '50%',
//                       background:
//                         'rgba(255,255,255,0.2)',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                     }}
//                   >
//                     {task.completed
//                       ? '✔'
//                       : '+'}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Right Side */}
//         <div
//           style={{
//             display: 'flex',
//             flexDirection: 'column',
//             gap: '25px',
//           }}
//         >
//           {/* Profile */}
//           <div
//             style={{
//               background:
//                 'linear-gradient(135deg,#6366F1,#8B5CF6)',
//               borderRadius: '30px',
//               padding: '35px',
//               textAlign: 'center',
//               boxShadow:
//                 '0 20px 45px rgba(99,102,241,0.35)',
//             }}
//           >
//             <div
//               style={{
//                 width: '95px',
//                 height: '95px',
//                 borderRadius: '50%',
//                 background:
//                   'rgba(255,255,255,0.18)',
//                 margin: '0 auto 20px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 fontSize: '38px',
//                 fontWeight: 700,
//               }}
//             >
//               D
//             </div>

//             <h2
//               style={{
//                 marginBottom: '10px',
//                 fontSize: '28px',
//               }}
//             >
//               Dhruvi
//             </h2>

//             <p
//               style={{
//                 opacity: 0.9,
//                 marginBottom: '24px',
//               }}
//             >
//               Electron Developer
//             </p>

//             <button
//               style={{
//                 width: '100%',
//                 padding: '16px',
//                 border: 'none',
//                 borderRadius: '16px',
//                 background: '#fff',
//                 color: '#111827',
//                 fontWeight: 700,
//                 cursor: 'pointer',
//               }}
//             >
//               View Profile
//             </button>
//           </div>

//           {/* Stats */}
//           {[
//             {
//               title: 'Build Success',
//               value: '98%',
//               icon: '🚀',
//             },
//             {
//               title: 'Auto Updates',
//               value: '24',
//               icon: '⚡',
//             },
//           ].map((item, index) => (
//             <div
//               key={index}
//               style={{
//                 background: darkMode
//                   ? 'rgba(255,255,255,0.05)'
//                   : '#fff',
//                 border: darkMode
//                   ? '1px solid rgba(255,255,255,0.08)'
//                   : '1px solid #E2E8F0',
//                 borderRadius: '28px',
//                 padding: '28px',
//               }}
//             >
//               <div
//                 style={{
//                   fontSize: '42px',
//                   marginBottom: '18px',
//                 }}
//               >
//                 {item.icon}
//               </div>

//               <div
//                 style={{
//                   color: darkMode
//                     ? '#94A3B8'
//                     : '#64748B',
//                   marginBottom: '10px',
//                 }}
//               >
//                 {item.title}
//               </div>

//               <div
//                 style={{
//                   fontSize: '42px',
//                   fontWeight: 800,
//                 }}
//               >
//                 {item.value}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }


import { useEffect, useState } from 'react'

type Activity = {
  id: number
  title: string
  description: string
  time: string
  status: 'Completed' | 'Pending' | 'Running'
}

export default function SmartActivitySection() {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: 1,
      title: 'System Backup',
      description: 'Cloud backup completed successfully',
      time: '2 min ago',
      status: 'Completed',
    },
    {
      id: 2,
      title: 'Auto Update',
      description: 'Checking latest Electron release',
      time: '5 min ago',
      status: 'Running',
    },
    {
      id: 3,
      title: 'Security Scan',
      description: 'Pending system verification',
      time: '12 min ago',
      status: 'Pending',
    },
  ])

  const [progress, setProgress] = useState(68)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 25
        return prev + 1
      })
    }, 150)

    return () => clearInterval(interval)
  }, [])

  const addRandomActivity = () => {
    const randomData = [
      {
        title: 'New Deployment',
        description: 'Desktop build generated successfully',
        status: 'Completed' as const,
      },
      {
        title: 'Database Sync',
        description: 'Syncing latest cloud data',
        status: 'Running' as const,
      },
      {
        title: 'Version Check',
        description: 'New update available',
        status: 'Pending' as const,
      },
    ]

    const random =
      randomData[
        Math.floor(Math.random() * randomData.length)
      ]

    const newActivity: Activity = {
      id: Date.now(),
      title: random.title,
      description: random.description,
      status: random.status,
      time: 'Just now',
    }

    setActivities((prev) => [
      newActivity,
      ...prev,
    ])
  }

  const getStatusColor = (
    status: Activity['status']
  ) => {
    switch (status) {
      case 'Completed':
        return '#10B981'
      case 'Running':
        return '#3B82F6'
      case 'Pending':
        return '#F59E0B'
      default:
        return '#fff'
    }
  }

  return (
    <div
      style={{
        width: '100%',
        marginTop: '40px',
        display: 'grid',
        gridTemplateColumns:
          'repeat(auto-fit,minmax(320px,1fr))',
        gap: '24px',
      }}
    >
      {/* PERFORMANCE CARD */}
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '32px',
          padding: '30px',
          background:
            'linear-gradient(135deg,#111827,#1E1B4B)',
          border:
            '1px solid rgba(255,255,255,0.08)',
          boxShadow:
            '0 25px 60px rgba(0,0,0,0.35)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            background:
              'rgba(99,102,241,0.15)',
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
              display: 'flex',
              justifyContent:
                'space-between',
              alignItems: 'center',
              marginBottom: '26px',
            }}
          >
            <div>
              <div
                style={{
                  color: '#94A3B8',
                  fontSize: '14px',
                  marginBottom: '10px',
                }}
              >
                LIVE PERFORMANCE
              </div>

              <div
                style={{
                  fontSize: '34px',
                  fontWeight: 900,
                  color: '#fff',
                }}
              >
                {progress}%
              </div>
            </div>

            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '24px',
                background:
                  'linear-gradient(135deg,#4F46E5,#7C3AED)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '30px',
              }}
            >
              ⚡
            </div>
          </div>

          {/* PROGRESS */}
          <div
            style={{
              width: '100%',
              height: '14px',
              borderRadius: '999px',
              background:
                'rgba(255,255,255,0.08)',
              overflow: 'hidden',
              marginBottom: '24px',
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: '100%',
                borderRadius: '999px',
                background:
                  'linear-gradient(90deg,#4F46E5,#8B5CF6,#EC4899)',
                transition: '0.2s',
              }}
            />
          </div>

          <div
            style={{
              color: '#CBD5E1',
              lineHeight: 1.8,
              fontSize: '15px',
            }}
          >
            Electron application performance
            is running smoothly with active
            optimization and auto update
            monitoring enabled.
          </div>

          <button
            onClick={() =>
              alert(
                '🚀 Optimization Started Successfully'
              )
            }
            style={{
              marginTop: '28px',
              width: '100%',
              height: '58px',
              border: 'none',
              borderRadius: '18px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 700,
              color: '#fff',
              background:
                'linear-gradient(135deg,#4F46E5,#7C3AED,#EC4899)',
              boxShadow:
                '0 15px 35px rgba(124,58,237,0.35)',
            }}
          >
            Optimize Performance
          </button>
        </div>
      </div>

      {/* ACTIVITY CARD */}
      <div
        style={{
          borderRadius: '32px',
          padding: '30px',
          background:
            'rgba(15,23,42,0.92)',
          border:
            '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(20px)',
          boxShadow:
            '0 25px 60px rgba(0,0,0,0.35)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent:
              'space-between',
            alignItems: 'center',
            marginBottom: '26px',
          }}
        >
          <div>
            <div
              style={{
                color: '#94A3B8',
                fontSize: '14px',
                marginBottom: '10px',
              }}
            >
              SMART ACTIVITIES
            </div>

            <div
              style={{
                fontSize: '32px',
                fontWeight: 900,
                color: '#fff',
              }}
            >
              Live Timeline
            </div>
          </div>

          <button
            onClick={addRandomActivity}
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '18px',
              border: 'none',
              cursor: 'pointer',
              background:
                'linear-gradient(135deg,#4F46E5,#7C3AED)',
              color: '#fff',
              fontSize: '28px',
              fontWeight: 700,
            }}
          >
            +
          </button>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
          }}
        >
          {activities.map((activity) => (
            <div
              key={activity.id}
              style={{
                display: 'flex',
                gap: '16px',
                padding: '18px',
                borderRadius: '22px',
                background:
                  'rgba(255,255,255,0.04)',
                border:
                  '1px solid rgba(255,255,255,0.06)',
                transition: '0.3s',
              }}
            >
              <div
                style={{
                  minWidth: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  marginTop: '6px',
                  background: getStatusColor(
                    activity.status
                  ),
                  boxShadow: `0 0 18px ${getStatusColor(
                    activity.status
                  )}`,
                }}
              />

              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent:
                      'space-between',
                    gap: '10px',
                    marginBottom: '10px',
                    flexWrap: 'wrap',
                  }}
                >
                  <div
                    style={{
                      fontWeight: 700,
                      color: '#fff',
                      fontSize: '16px',
                    }}
                  >
                    {activity.title}
                  </div>

                  <div
                    style={{
                      fontSize: '12px',
                      color: '#94A3B8',
                    }}
                  >
                    {activity.time}
                  </div>
                </div>

                <div
                  style={{
                    color: '#CBD5E1',
                    fontSize: '14px',
                    lineHeight: 1.7,
                    marginBottom: '12px',
                  }}
                >
                  {activity.description}
                </div>

                <div
                  style={{
                    display: 'inline-flex',
                    padding: '8px 14px',
                    borderRadius: '999px',
                    fontSize: '12px',
                    fontWeight: 700,
                    background: `${getStatusColor(
                      activity.status
                    )}20`,
                    color: getStatusColor(
                      activity.status
                    ),
                  }}
                >
                  {activity.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}