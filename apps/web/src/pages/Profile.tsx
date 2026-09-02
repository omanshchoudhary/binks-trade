import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { balance } from "../data/mockData";
import { formatBalance } from "../utils/format";
import "./Profile.css";

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  return parts
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function formatJoined(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function Profile() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [signingOut, setSigningOut] = useState(false);

  async function handleLogout() {
    setSigningOut(true);
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch {
      setSigningOut(false);
    }
  }

  if (loading) {
    return <p className="market__status">Loading profile…</p>;
  }

  if (!user) {
    return (
      <p className="market__status">
        You are signed out.{" "}
        <Link className="profile__link" to="/login">
          Log in
        </Link>
      </p>
    );
  }

  return (
    <>
      <section className="profile__banner">
        <span className="profile__avatar" aria-hidden="true">
          {initials(user.name)}
        </span>

        <div className="profile__id">
          <h1 className="profile__name">{user.name}</h1>
          <span className="profile__handle">@{user.username}</span>
        </div>

        <div className="profile__money">
          <span className="profile__money-label">Virtual cash</span>
          <span className="profile__money-value mono">
            {formatBalance(balance)}
          </span>
          <span className="profile__money-note">
            Practice money only. It cannot be deposited or withdrawn.
          </span>
        </div>
      </section>

      <div className="market">
        <div className="market__col">
          <section className="profile__card">
            <div className="section__head">
              <h2 className="section__title profile__mark">Account details</h2>
              <span className="section__meta">From your sign-up</span>
            </div>

            <div className="profile__row">
              <span className="profile__label">Full name</span>
              <span className="profile__value">{user.name}</span>
            </div>

            <div className="profile__row">
              <span className="profile__label">Username</span>
              <span className="profile__value">@{user.username}</span>
            </div>

            <div className="profile__row">
              <span className="profile__label">Email</span>
              <span className="profile__value">{user.email}</span>
            </div>

            <div className="profile__row">
              <span className="profile__label">Member since</span>
              <span className="profile__value mono">
                {formatJoined(user.createdAt)}
              </span>
            </div>

            <div className="profile__row">
              <span className="profile__label">Account ID</span>
              <span className="profile__value profile__value--id mono">
                {user.id}
              </span>
            </div>
          </section>

          <section className="profile__card">
            <div className="section__head">
              <h2 className="section__title profile__mark">Danger zone</h2>
              <span className="section__meta">Permanent</span>
            </div>

            <div className="profile__row">
              <span className="profile__label">
                Delete account
                <span className="profile__soon">Soon</span>
              </span>
              <button
                className="profile__action profile__action--danger"
                type="button"
                disabled
              >
                Delete
              </button>
            </div>

            <p className="profile__note">
              Deleting removes your holdings, orders and virtual cash. It cannot
              be undone.
            </p>
          </section>
        </div>

        <aside className="market__col">
          <section className="panel">
            <div className="section__head">
              <h2 className="section__title profile__mark">Sign in</h2>
            </div>

            <div className="profile__row">
              <span className="profile__label">
                Password
                <span className="profile__soon">Soon</span>
              </span>
              <button className="profile__action" type="button" disabled>
                Change
              </button>
            </div>

            <div className="profile__row">
              <span className="profile__label">
                Google
                <span className="profile__soon">Soon</span>
              </span>
              <button className="profile__action" type="button" disabled>
                Link
              </button>
            </div>

            <div className="profile__divider" />

            <button
              className="profile__logout"
              type="button"
              onClick={handleLogout}
              disabled={signingOut}
            >
              {signingOut ? "Logging out…" : "Log out"}
            </button>
          </section>
        </aside>
      </div>
    </>
  );
}
