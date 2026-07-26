import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <section className="section">
      <h1 className="section__title">Page not found</h1>
      <Link to="/">Back to home</Link>
    </section>
  );
}
