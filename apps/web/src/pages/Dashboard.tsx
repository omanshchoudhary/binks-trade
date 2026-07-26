import { StockCard } from "../components/StockCard";
import { TrendingItem } from "../components/TrendingItem";
import { IndexStrip } from "../components/IndexStrip";
import { indices, topGainers, topLosers, trending } from "../data/mockData";

export function Dashboard() {
  return (
    <>
      <IndexStrip indices={indices} />

      <div className="market">
        <div className="market__col">
          <section className="section">
            <div className="section__head">
              <h2 className="section__title">Top Gainers</h2>
              <span className="section__meta">Today</span>
            </div>
            <div className="cards">
              {topGainers.map((stock) => (
                <StockCard key={stock.symbol} stock={stock} />
              ))}
            </div>
          </section>

          <section className="section">
            <div className="section__head">
              <h2 className="section__title">Top Losers</h2>
              <span className="section__meta">Today</span>
            </div>
            <div className="cards">
              {topLosers.map((stock) => (
                <StockCard key={stock.symbol} stock={stock} />
              ))}
            </div>
          </section>
        </div>

        <aside className="market__col">
          <section className="panel">
            <div className="section__head">
              <h2 className="section__title">Trending</h2>
              <span className="section__meta">Most active</span>
            </div>
            <div className="trending">
              {trending.map((stock) => (
                <TrendingItem key={stock.symbol} stock={stock} />
              ))}
            </div>
          </section>
        </aside>
      </div>
    </>
  );
}
