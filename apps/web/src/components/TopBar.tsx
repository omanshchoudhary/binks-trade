import "./TopBar.css";
import { formatBalance } from "../utils/format";

export function TopBar({ balance }: { balance: number }) {
  return (
    <header className="topbar">
      <div className="topbar__search">
        <svg
          className="topbar__search-icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          className="topbar__input"
          type="search"
          placeholder="Search stocks…"
          aria-label="Search stocks"
        />
      </div>
      <div className="topbar__balance">
        <span className="topbar__balance-label">Balance</span>
        <span className="topbar__balance-value mono">
          {formatBalance(balance)}
        </span>
      </div>
    </header>
  );
}
