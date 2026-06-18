import "./Sidebar.css";

const NAV_ITEMS = [
  { label: "Home", href: "/", active: true },
  { label: "Dashboard", href: "/dashboard", active: false },
  { label: "Profile", href: "/profile", active: false },
];

export function Sidebar() {
  return (
    <aside className="sidebar">
      <a className="sidebar__brand" href="/">
        <img className="sidebar__logo" src="/assets/images/logo.png" alt="" />
        <span className="sidebar__name">Binks Trade</span>
      </a>
      <nav className="sidebar__nav">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`sidebar__link${item.active ? " is-active" : ""}`}
            aria-current={item.active ? "page" : undefined}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <p className="sidebar__note">Virtual trading · NSE</p>
    </aside>
  );
}
