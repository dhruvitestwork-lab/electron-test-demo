import React, { useState } from "react";

const StatsCard: React.FC = () => {
  const [hover, setHover] = useState<boolean>(false);

  const cardStyle: React.CSSProperties = {
    width: "320px",
    padding: "20px",
    borderRadius: "16px",
    background: "linear-gradient(135deg, #6366f1, #a855f7)",
    color: "#fff",
    boxShadow: hover
      ? "0 15px 35px rgba(0,0,0,0.3)"
      : "0 8px 20px rgba(0,0,0,0.2)",
    transform: hover ? "scale(1.05)" : "scale(1)",
    transition: "all 0.3s ease",
    cursor: "pointer",
  };

  const badgeStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.2)",
    padding: "4px 10px",
    borderRadius: "8px",
    fontSize: "12px",
  };

  const buttonStyle: React.CSSProperties = {
    marginTop: "20px",
    width: "100%",
    padding: "10px",
    borderRadius: "10px",
    border: "none",
    background: "#fff",
    color: "#6366f1",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #1e293b, #0f172a)",
      }}
    >
      <div
        style={cardStyle}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3 style={{ margin: 0 }}>Total Users</h3>
          <span style={badgeStyle}>+12%</span>
        </div>

        <h1 style={{ fontSize: "36px", margin: "15px 0" }}>24,580</h1>

        <p style={{ fontSize: "14px", opacity: 0.8 }}>
          Compared to last month
        </p>

        <button
          style={buttonStyle}
          onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.currentTarget.style.background = "#f1f5f9";
          }}
          onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.currentTarget.style.background = "#ffffff";
          }}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default StatsCard;