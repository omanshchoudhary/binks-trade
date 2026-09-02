import { Link, useLocation } from "react-router-dom";
import "./NotFound.css";

const ROUTES = [
  { to: "/", label: "Home", hint: "Today's movers and market summary" },
  { to: "/market", label: "Market", hint: "Every stock you can trade" },
  {
    to: "/portfolio",
    label: "Portfolio",
    hint: "Your holdings and virtual cash",
  },
];

export function NotFound() {
  const { pathname } = useLocation();

  return (
    <section className="notfound">
      <p className="notfound__code mono">404</p>
      <h1 className="notfound__title">This page does not exist</h1>
      <p className="notfound__text">
        There is nothing at{" "}
        <span className="notfound__path mono">{pathname}</span>. The address may
        have a typo, or the page may have moved since the link was made.
      </p>

      <nav className="notfound__routes">
        <h2 className="notfound__routes-title">Back to harbor</h2>
        {ROUTES.map((route) => (
          <Link className="notfound__route" key={route.to} to={route.to}>
            <span className="notfound__route-label">{route.label}</span>
            <span className="notfound__route-hint">{route.hint}</span>
          </Link>
        ))}
      </nav>
    </section>
  );
}
