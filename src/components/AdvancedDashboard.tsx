import React, { useState } from "react";

type CardData = {
  title: string;
  value: string;
  percent: number;
  color: string;
};

const data: CardData[] = [
  { title: "Revenue", value: "$48,200", percent: 75, color: "#6366f1" },
  { title: "Users", value: "18,920", percent: 60, color: "#10b981" },
  { title: "Orders", value: "1,240", percent: 45, color: "#f59e0b" },
  { title: "Growth", value: "12.5%", percent: 80, color: "#ec4899" },
  { title: "Sessions", value: "32K", percent: 55, color: "#3b82f6" },
  { title: "Bounce", value: "28%", percent: 35, color: "#ef4444" },
];

// 🔹 Circular progress calculation
const getCircleStyle = (percent: number, color: string): React.CSSProperties => ({
  width: "70px",
  height: "70px",
  borderRadius: "50%",
  background: `conic-gradient(${color} ${percent * 3.6}deg, rgba(255,255,255,0.1) 0deg)`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "12px",
  color: "#fff",
});

const Card: React.FC<CardData> = ({ title, value, percent, color }) => {
  const [hover, setHover] = useState(false);

  const cardStyle: React.CSSProperties = {
    padding: "20px",
    borderRadius: "20px",
    backdropFilter: "blur(12px)",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    boxShadow: hover
      ? `0 20px 40px rgba(0,0,0,0.4), 0 0 20px ${color}`
      : "0 10px 25px rgba(0,0,0,0.25)",
    transform: hover ? "translateY(-8px) scale(1.02)" : "none",
    transition: "all 0.3s ease",
    color: "#fff",
    cursor: "pointer",
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h4 style={{ margin: 0 }}>{title}</h4>
        <div style={getCircleStyle(percent, color)}>{percent}%</div>
      </div>

      <h1 style={{ marginTop: "20px", fontSize: "28px" }}>{value}</h1>

      <div
        style={{
          marginTop: "15px",
          height: "6px",
          borderRadius: "10px",
          background: "rgba(255,255,255,0.1)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${percent}%`,
            height: "100%",
            background: color,
            transition: "0.4s",
          }}
        />
      </div>
    </div>
  );
};

const AdvancedDashboard: React.FC = () => {
  return (
    <div
      style={{
        minHeight: "",
        padding: "40px",
        background:
          "radial-gradient(circle at top left, #1e293b, #020617)",
      }}
    >
      <h2 style={{ color: "#fff", marginBottom: "30px" }}>
        🚀 Analytics Dashboard
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "25px",
        }}
      >
        {data.map((item, i) => (
          <Card key={i} {...item} />
        ))}
      </div>
    </div>
  );
};

export default AdvancedDashboard;