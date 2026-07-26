import { useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { signupSchema } from "@binks/types";
import { useAuth } from "../hooks/useAuth";
import { ApiError } from "../lib/api";
import { topGainers, topLosers } from "../data/mockData";
import { formatPercent, formatPrice } from "../utils/format";
import "./Auth.css";

const PREVIEW = [...topGainers.slice(0, 3), ...topLosers.slice(0, 2)];

type FieldErrors = Partial<
  Record<"name" | "username" | "email" | "password", string>
>;

export function Signup() {
  const { user, loading, signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
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

    const parsed = signupSchema.safeParse(form);
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      setErrors({
        name: flat.name?.[0],
        username: flat.username?.[0],
        email: flat.email?.[0],
        password: flat.password?.[0],
      });
      return;
    }

    setSubmitting(true);
    try {
      await signup(parsed.data);
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
    <div className="auth auth--split">
      <aside className="auth__aside">
        <div className="auth__brand">
          <img className="auth__logo" src="/assets/images/logo.png" alt="" />
          <span className="auth__brand-name">Binks Trade</span>
        </div>

        <h1 className="auth__pitch">Learn the market without losing money.</h1>
        <p className="auth__sub">
          Trade Indian equities at real prices using virtual cash. Track your
          profit and loss exactly as you would on a live account.
        </p>

        <div className="auth__ticker">
          {PREVIEW.map((stock) => {
            const up = stock.changePercent >= 0;
            return (
              <div className="auth__tick" key={stock.symbol}>
                <span className="auth__tick-symbol">{stock.symbol}</span>
                <span className="auth__tick-right">
                  <span className="auth__tick-price mono">
                    {formatPrice(stock.price)}
                  </span>
                  <span
                    className={`auth__tick-change mono auth__tick-change--${
                      up ? "up" : "down"
                    }`}
                  >
                    {up ? "+" : "−"}
                    {formatPercent(stock.changePercent)}
                  </span>
                </span>
              </div>
            );
          })}
        </div>

        <div className="auth__grant">
          <span className="auth__grant-value mono">₹1,00,000</span>
          <span className="auth__grant-label">
            virtual cash in every new account
          </span>
        </div>
        <p className="auth__note">
          Practice money only. It cannot be deposited, withdrawn or exchanged
          for real currency.
        </p>
      </aside>

      <div className="auth__panel">
        <div className="auth__card">
          <h2 className="auth__title auth__title--marked">Create your account</h2>
          <p className="auth__lede">Takes a minute. No payment details.</p>

          <form className="auth__form" onSubmit={handleSubmit} noValidate>
            {alert && (
              <p className="auth__alert" role="alert">
                {alert}
              </p>
            )}

            <div className="auth__field">
              <label className="auth__label" htmlFor="name">
                Full name
              </label>
              <input
                id="name"
                className={`auth__input${errors.name ? " has-error" : ""}`}
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                autoComplete="name"
                placeholder="Your full name"
              />
              {errors.name && <span className="auth__error">{errors.name}</span>}
            </div>

            <div className="auth__field">
              <label className="auth__label" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                className={`auth__input${errors.username ? " has-error" : ""}`}
                value={form.username}
                onChange={(e) => update("username", e.target.value)}
                autoComplete="username"
                placeholder="trader_01"
              />
              {errors.username ? (
                <span className="auth__error">{errors.username}</span>
              ) : (
                <span className="auth__hint">
                  Letters, numbers and underscores.
                </span>
              )}
            </div>

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
              {errors.email && (
                <span className="auth__error">{errors.email}</span>
              )}
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
                autoComplete="new-password"
                placeholder="At least 8 characters"
              />
              {errors.password && (
                <span className="auth__error">{errors.password}</span>
              )}
            </div>

            <button
              className="auth__submit auth__submit--accent"
              type="submit"
              disabled={submitting}
            >
              {submitting ? "Creating account…" : "Create account"}
            </button>
          </form>

          <p className="auth__alt">
            Already have an account?{" "}
            <Link className="auth__link" to="/login">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
