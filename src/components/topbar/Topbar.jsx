import React from "react";
import "./Topbar.scss";

export default function Topbar({menuOpen, setMenuOpen}){
  return (
    <header className={`main-header ${menuOpen ? "active" : ""}`}>
      <a href="/" className="logo">განათლდი</a>
      <div className={`hamburger ${menuOpen ? "active" : ""}`} onClick={()=>setMenuOpen(!menuOpen)}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </header>
  );
};
