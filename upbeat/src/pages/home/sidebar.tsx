// Sidebar.js
import React from 'react';
import './sidebar.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Nav = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <span className="icon">
            <i className="fas fa-home"></i> {/* Home icon */}
          </span>
          <span className="link-name">Home</span>
        </li>
        <li>
          <span className="icon">
            <i className="fas fa-comment"></i> {/* Chat icon */}
          </span>
          <span className="link-name">Chat</span>
        </li>
        <li>
          <span className="icon">
            <i className="fas fa-user"></i> {/* Profile icon */}
          </span>
          <span className="link-name">Profile</span>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
