import "./TrendingItem.css";
import { ChangeBadge } from "./ChangeBadge";
import { formatPrice } from "../utils/format";
import type { Stock } from "../data/mockData";

export function TrendingItem({ stock }: { stock: Stock }) {
  return (
    <a className="trend-item" href={`/stock/${stock.symbol}`}>
      <div className="trend-item__id">
        <span className="trend-item__symbol">{stock.symbol}</span>
        <span className="trend-item__name">{stock.name}</span>
      </div>
      <div className="trend-item__nums">
        <span className="trend-item__price mono">
          {formatPrice(stock.price)}
        </span>
        <ChangeBadge value={stock.changePercent} />
      </div>
    </a>
  );
}
