import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">🎓 Student Analyzer</div>
      <ul className="navbar-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#add-student">Add Student</a></li>
        <li><a href="#student-list">Dashboard</a></li>
        <li><a href="#chart">Analytics</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
