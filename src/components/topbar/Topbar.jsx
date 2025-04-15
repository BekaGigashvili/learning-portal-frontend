import React, { useState } from "react";
import "./Topbar.scss";
import { useNavigate } from "react-router-dom";

export default function Topbar({ menuOpen, setMenuOpen }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogoClick = () => {
    const token = localStorage.getItem("token");
    navigate(token ? "/dashboard" : "/");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className={`main-header ${menuOpen ? "active" : ""}`}>
      <div className="logo" onClick={handleLogoClick} style={{ cursor: "pointer" }}>
        განათლდი
      </div>

      {/* Search field (triggers on Enter) */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="ძებნა..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div
        className={`hamburger ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
    </header>
  );
}
