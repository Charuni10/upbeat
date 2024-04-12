import { NavLink } from "react-router-dom";
import feather from "feather-icons";
import "./sidebarMobile.css";
import { useEffect } from "react";

const SidebarMobile = () => {
  useEffect(() => {
    feather.replace();
  }, []);

  return (
    <div className="mobileNav" style={{ backgroundColor: "transparent" }}>
      <nav>
        <div id="menuToggle" style={{ backgroundColor: "transparent" }}>
          <input type="checkbox" />
          <span></span>
          <span></span>
          <span></span>
          <ul id="menu">
            {menuItems.map((item: any) => (
              <li key={item.id} style={{ listStyleType: "none" }}>
                <NavLink to={item.path} className="navbar__link1">
                  <i data-feather={item.icon}></i>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default SidebarMobile;

const menuItems = [
  { id: 1, path: "/home", icon: "home", label: "Home" },
  { id: 2, path: "/chat", icon: "message-square", label: "Chat" },
  { id: 3, path: "/profileview", icon: "users", label: "Profile" },
  { id: 4, path: "/help", icon: "help-circle", label: "Help" },
];
