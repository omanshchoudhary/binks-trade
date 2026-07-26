import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const NAV_ITEMS = [
  { label: "Home", to: "/" },
  { label: "Dashboard", to: "/dashboard" },
  { label: "Profile", to: "/profile" },
];

export function Sidebar() {
  return (
    <aside className="sidebar">
      <NavLink className="sidebar__brand" to="/">
        <img className="sidebar__logo" src="/assets/images/logo.png" alt="" />
        <span className="sidebar__name">Binks Trade</span>
      </NavLink>
      <nav className="sidebar__nav">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            end
            className={({ isActive }) =>
              `sidebar__link${isActive ? " is-active" : ""}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <p className="sidebar__note">Virtual trading · NSE</p>
    </aside>
  );
}
