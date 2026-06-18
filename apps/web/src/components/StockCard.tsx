import "./StockCard.css";
import { ChangeBadge } from "./ChangeBadge";
import { formatPrice } from "../utils/format";
import type { Stock } from "../data/mockData";

export function StockCard({ stock }: { stock: Stock }) {
  return (
    <a className="stock-card" href={`/stock/${stock.symbol}`}>
      <div className="stock-card__head">
        <span className="stock-card__symbol">{stock.symbol}</span>
        <span className="stock-card__name">{stock.name}</span>
      </div>
      <div className="stock-card__foot">
        <span className="stock-card__price mono">
          {formatPrice(stock.price)}
        </span>
        <ChangeBadge value={stock.changePercent} />
      </div>
    </a>
  );
}
