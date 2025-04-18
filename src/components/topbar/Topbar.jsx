import React, { useState } from "react";
import "./Topbar.scss";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Topbar({ menuOpen, setMenuOpen }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    let resizeTimer;

    const handleResize = () => {
      document.body.classList.add("no-transition");
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        document.body.classList.remove("no-transition");
      }, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogoClick = () => {
    const token = localStorage.getItem("token");
    navigate(token ? "/profile" : "/");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
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
