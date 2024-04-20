import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import feather from "feather-icons";
import "./sidebar.css";

const Sidebar = () => {
  useEffect(() => {
    feather.replace();
  }, []);

  return (
    <div>
      <nav className="navbar" style={{ zIndex: "999" }}>
        <ul className="navbar__menu">
          {menuItems.map((item: any) => (
            <li
              key={item.id}
              className="navbar__item"
              style={{ listStyleType: "none" }}
            >
              <NavLink to={item.path} className="navbar__link">
                <i data-feather={item.icon}></i>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

// Example usage
const menuItems = [
  { id: 1, path: "/home", icon: "home", label: "Home" },
  { id: 2, path: "/chat", icon: "message-square", label: "Chat" },
  { id: 3, path: "/profileview", icon: "users", label: "Profile" },
  { id: 4, path: "/help", icon: "help-circle", label: "Help" },
  { id: 5, path: "/login", icon: "log-out", label: "Logout" },
];
