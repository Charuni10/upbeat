import React, { useEffect } from "react";
import "./sidebar.scss";
import feather from "feather-icons";
const Navbar = () => {
  useEffect(() => {
    // Initialize Feather Icons after the component is mounted
    feather.replace();
  }, []);

  return (
    <nav className="navbar">
      <ul className="navbar__menu">
        <li className="navbar__item">
          <a href="/home" className="navbar__link">
            <i data-feather="home"></i>
            <span>Home</span>
          </a>
        </li>
        <li className="navbar__item">
          <a href="/chat" className="navbar__link">
            <i data-feather="message-square"></i>
            <span>Chat</span>
          </a>
        </li>
        <li className="navbar__item">
          <a href="/profileview" className="navbar__link">
            <i data-feather="users"></i>
            <span>Profile</span>
          </a>
        </li>
        <li className="navbar__item">
          <a href="#" className="navbar__link">
            <i data-feather="help-circle"></i>
            <span>Help</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
