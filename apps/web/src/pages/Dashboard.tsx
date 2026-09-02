import { useMemo } from "react";
import type { ReactNode } from "react";
import "./Dashboard.css";
import { StockCard } from "../components/StockCard";
import { StockCardSkeleton } from "../components/StockCardSkeleton";
import { TrendingItem } from "../components/TrendingItem";
import { TrendingItemSkeleton } from "../components/TrendingItemSkeleton";
import { IndexStrip } from "../components/IndexStrip";
import {
  MarketBlock,
  MarketNotice,
  MarketNoticeSkeleton,
} from "../components/MarketNotice";
import { useShares } from "../hooks/useShares";
import { indices } from "../data/mockData";
import { formatClock, formatDate, minutesSince } from "../utils/format";

const CARD_PLACEHOLDERS = [0, 1, 2];
const TREND_PLACEHOLDERS = [0, 1, 2, 3, 4, 5];
const OPEN_MINUTE = 9 * 60 + 15;
const CLOSE_MINUTE = 15 * 60 + 30;

function isMarketOpen(): boolean {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());

  const read = (type: string) =>
    parts.find((part) => part.type === type)?.value ?? "";

  const weekday = read("weekday");
  if (weekday === "Sat" || weekday === "Sun") return false;

  const minuteOfDay = (Number(read("hour")) % 24) * 60 + Number(read("minute"));
  return minuteOfDay >= OPEN_MINUTE && minuteOfDay < CLOSE_MINUTE;
}

export function Dashboard() {
  const { shares, loading, error, refetch } = useShares();

  const { gainers, losers, movers } = useMemo(
    () => ({
      gainers: [...shares]
        .sort((a, b) => b.changePercent - a.changePercent)
        .slice(0, 3),
      losers: [...shares]
        .sort((a, b) => a.changePercent - b.changePercent)
        .slice(0, 3),
      movers: [...shares]
        .sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent))
        .slice(0, 6),
    }),
    [shares],
  );

  const lastUpdated = useMemo(() => {
    let newest: string | null = null;
    let newestMs = Number.NEGATIVE_INFINITY;

    for (const share of shares) {
      const ms = new Date(share.priceUpdatedAt).getTime();
      if (Number.isNaN(ms) || ms <= newestMs) continue;
      newestMs = ms;
      newest = share.priceUpdatedAt;
    }

    return newest;
  }, [shares]);

  const hasData = shares.length > 0;
  const showSkeleton = loading && !hasData;
  const marketOpen = isMarketOpen();

  const stamp =
    lastUpdated !== null && (minutesSince(lastUpdated) ?? -1) >= 0
      ? lastUpdated
      : null;
  const updatedAt =
    stamp === null ? undefined : `Updated ${formatClock(stamp)}`;
  const closedAt =
    stamp === null
      ? undefined
      : `As of ${formatClock(stamp)}, ${formatDate(stamp)}`;

  const closedText = "Markets are closed. These are the closing prices.";

  let notice: ReactNode = null;

  if (error && hasData) {
    notice = (
      <MarketNotice
        tone="danger"
        text="Could not refresh prices. Showing the last data we have."
        meta={updatedAt}
        action={{ label: "Try again", onClick: refetch }}
      />
    );
  } else if (showSkeleton) {
    notice = marketOpen ? (
      <MarketNoticeSkeleton />
    ) : (
      <MarketNotice tone="neutral" text={closedText} />
    );
  } else if (hasData && !marketOpen) {
    notice = <MarketNotice tone="neutral" text={closedText} meta={closedAt} />;
  } else if (hasData && stamp !== null) {
    notice = (
      <MarketNotice
        tone="accent"
        text="Prices are delayed, not live."
        meta={updatedAt}
      />
    );
  }

  return (
    <>
      <IndexStrip indices={indices} />

      {showSkeleton && (
        <p className="visually-hidden" role="status">
          Loading market data.
        </p>
      )}

      {notice}

      {error && !hasData ? (
        <MarketBlock
          tone="danger"
          title={error}
          body="The market feed did not respond. Check your connection, then try again."
          action={{ label: "Try again", onClick: refetch }}
        />
      ) : !loading && !error && !hasData ? (
        <MarketBlock
          tone="neutral"
          title="No shares listed yet"
          body="The market list came back empty. There is nothing to show until shares are added."
          action={{ label: "Check again", onClick: refetch }}
        />
      ) : (
        <div className="market">
          <div className="market__col">
            <section className="section">
              <div className="section__head">
                <h2 className="section__title">Top Gainers</h2>
                <span className="section__meta">Today</span>
              </div>
              <div className="cards">
                {showSkeleton
                  ? CARD_PLACEHOLDERS.map((slot) => (
                      <StockCardSkeleton key={slot} />
                    ))
                  : gainers.map((share) => (
                      <StockCard key={share.symbol} stock={share} />
                    ))}
              </div>
            </section>

            <section className="section">
              <div className="section__head">
                <h2 className="section__title">Top Losers</h2>
                <span className="section__meta">Today</span>
              </div>
              <div className="cards">
                {showSkeleton
                  ? CARD_PLACEHOLDERS.map((slot) => (
                      <StockCardSkeleton key={slot} />
                    ))
                  : losers.map((share) => (
                      <StockCard key={share.symbol} stock={share} />
                    ))}
              </div>
            </section>
          </div>

          <aside className="market__col">
            <section className="panel">
              <div className="section__head">
                <h2 className="section__title">Trending</h2>
                <span className="section__meta">Biggest moves</span>
              </div>
              <div className="trending">
                {showSkeleton
                  ? TREND_PLACEHOLDERS.map((slot) => (
                      <TrendingItemSkeleton key={slot} />
                    ))
                  : movers.map((share) => (
                      <TrendingItem key={share.symbol} stock={share} />
                    ))}
              </div>
            </section>
          </aside>
        </div>
      )}
    </>
  );
}
