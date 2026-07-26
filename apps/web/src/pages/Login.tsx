import { useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { loginSchema } from "@binks/types";
import { useAuth } from "../hooks/useAuth";
import { ApiError } from "../lib/api";
import "./Auth.css";

type FieldErrors = Partial<Record<"email" | "password", string>>;

export function Login() {
  const { user, loading, login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [alert, setAlert] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setAlert(null);

    const parsed = loginSchema.safeParse(form);
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      setErrors({ email: flat.email?.[0], password: flat.password?.[0] });
      return;
    }

    setSubmitting(true);
    try {
      await login(parsed.data.email, parsed.data.password);
      navigate("/", { replace: true });
    } catch (err) {
      setAlert(
        err instanceof ApiError
          ? err.message
          : "Could not reach the server. Try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (!loading && user) return <Navigate to="/" replace />;

  return (
    <div className="auth auth--center">
      <div className="auth__card">
        <Link className="auth__card-brand" to="/">
          <img className="auth__logo" src="/assets/images/logo.png" alt="" />
          <span className="auth__brand-name">Binks Trade</span>
        </Link>

        <h1 className="auth__title">Log in</h1>
        <p className="auth__lede">Pick up where your portfolio left off.</p>

        <form className="auth__form" onSubmit={handleSubmit} noValidate>
          {alert && (
            <p className="auth__alert" role="alert">
              {alert}
            </p>
          )}

          <div className="auth__field">
            <label className="auth__label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className={`auth__input${errors.email ? " has-error" : ""}`}
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              autoComplete="email"
              placeholder="you@example.com"
            />
            {errors.email && <span className="auth__error">{errors.email}</span>}
          </div>

          <div className="auth__field">
            <label className="auth__label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className={`auth__input${errors.password ? " has-error" : ""}`}
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              autoComplete="current-password"
              placeholder="Your password"
            />
            {errors.password && (
              <span className="auth__error">{errors.password}</span>
            )}
          </div>

          <button className="auth__submit" type="submit" disabled={submitting}>
            {submitting ? "Logging in…" : "Log in"}
          </button>
        </form>

        <p className="auth__alt">
          New to Binks Trade?{" "}
          <Link className="auth__link" to="/signup">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
