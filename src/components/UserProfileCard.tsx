import React, { useState } from "react";

const UserProfileCard: React.FC = () => {
  const [isFollowing, setIsFollowing] = useState(false);

  const container: React.CSSProperties = {
    minHeight: "",
    padding: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #0f172a, #020617)",
  };

  const card: React.CSSProperties = {
    width: "350px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.1)",
    boxShadow: "0 15px 40px rgba(0,0,0,0.4)",
    padding: "25px",
    textAlign: "center",
    color: "#fff",
  };

  const avatar: React.CSSProperties = {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    margin: "0 auto",
    background:
      "url('https://i.pravatar.cc/150?img=12') center/cover no-repeat",
    border: "3px solid #6366f1",
  };

  const button: React.CSSProperties = {
    marginTop: "15px",
    padding: "10px 18px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    background: isFollowing ? "#ef4444" : "#6366f1",
    color: "#fff",
    transition: "0.3s",
  };

  const statsBox: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
    padding: "10px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.05)",
  };

  return (
    <div style={container}>
      <div style={card}>
        <div style={avatar}></div>

        <h2 style={{ marginTop: "15px" }}>Dhruvi Savsaviya</h2>
        <p style={{ fontSize: "14px", opacity: 0.7 }}>
          Frontend Developer 🚀
        </p>

        <div style={statsBox}>
          <div>
            <strong>12K</strong>
            <p style={{ fontSize: "12px", opacity: 0.6 }}>Followers</p>
          </div>
          <div>
            <strong>1.2K</strong>
            <p style={{ fontSize: "12px", opacity: 0.6 }}>Following</p>
          </div>
          <div>
            <strong>320</strong>
            <p style={{ fontSize: "12px", opacity: 0.6 }}>Projects</p>
          </div>
        </div>

        <button
          style={button}
          onClick={() => setIsFollowing(!isFollowing)}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </button>

        <button
          style={{
            ...button,
            background: "transparent",
            border: "1px solid #6366f1",
            marginLeft: "10px",
          }}
        >
          Message
        </button>
      </div>
    </div>
  );
};

export default UserProfileCard;