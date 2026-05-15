import { useState } from "react";

// 🔹 Card Type
type CardData = {
  title: string;
  value: string;
  change: string;
  color: string;
};

// 🔹 Dummy Data (6 cards)
const cards: CardData[] = [
  { title: "Users", value: "24,580", change: "+12%", color: "#6366f1" },
  { title: "Revenue", value: "$12,400", change: "+8%", color: "#10b981" },
  { title: "Orders", value: "1,240", change: "+5%", color: "#f59e0b" },
  { title: "Visitors", value: "18,920", change: "+15%", color: "#3b82f6" },
  { title: "Conversion", value: "4.2%", change: "+2%", color: "#ec4899" },
  { title: "Bounce Rate", value: "32%", change: "-3%", color: "#ef4444" },
];

// 🔹 Single Card Component
const Card: React.FC<CardData> = ({ title, value, change, color }) => {
  const [hover, setHover] = useState(false);

  const style: React.CSSProperties = {
    padding: "20px",
    borderRadius: "16px",
    background: `linear-gradient(135deg, ${color}, #111827)`,
    color: "#fff",
    boxShadow: hover
      ? "0 15px 30px rgba(0,0,0,0.3)"
      : "0 8px 20px rgba(0,0,0,0.2)",
    transform: hover ? "translateY(-6px)" : "translateY(0)",
    transition: "0.3s",
    cursor: "pointer",
  };

  return (
    <div
      style={style}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h4 style={{ margin: 0 }}>{title}</h4>
        <span
          style={{
            background: "rgba(255,255,255,0.2)",
            padding: "4px 8px",
            borderRadius: "8px",
            fontSize: "12px",
          }}
        >
          {change}
        </span>
      </div>

      <h2 style={{ marginTop: "15px", fontSize: "28px" }}>{value}</h2>
    </div>
  );
};

// 🔹 Main Dashboard
const DashboardCards: React.FC = () => {
  return (
    <div
      style={{
        minHeight: "",
        background: "#0f172a",
        padding: "40px",
      }}
    >
      <h2 style={{ color: "#fff", marginBottom: "20px" }}>
        Dashboard Overview
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {cards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default DashboardCards;