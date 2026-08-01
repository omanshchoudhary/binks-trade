import { useMemo } from "react";
import { StockCard } from "../components/StockCard";
import { TrendingItem } from "../components/TrendingItem";
import { IndexStrip } from "../components/IndexStrip";
import { useShares } from "../hooks/useShares";
import { indices } from "../data/mockData";

export function Dashboard() {
  const { shares, loading, error } = useShares();

  const { gainers, losers, movers } = useMemo(
    () => ({
      gainers: [...shares]
        .sort((a, b) => b.changePercent - a.changePercent)
        .slice(0, 3),
      losers: [...shares]
        .sort((a, b) => a.changePercent - b.changePercent)
        .slice(0, 3),
      movers: [...shares]
        .sort(
          (a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent),
        )
        .slice(0, 6),
    }),
    [shares],
  );

  return (
    <>
      <IndexStrip indices={indices} />

      {loading && <p className="market__status">Loading market…</p>}

      {error && (
        <p className="market__status market__status--error" role="alert">
          {error}
        </p>
      )}

      {!loading && !error && (
        <div className="market">
          <div className="market__col">
            <section className="section">
              <div className="section__head">
                <h2 className="section__title">Top Gainers</h2>
                <span className="section__meta">Today</span>
              </div>
              <div className="cards">
                {gainers.map((share) => (
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
                {losers.map((share) => (
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
                {movers.map((share) => (
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
