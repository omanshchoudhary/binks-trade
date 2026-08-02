import { Link } from "react-router-dom";
import "./StockCard.css";
import { ChangeBadge } from "./ChangeBadge";
import { formatPrice } from "../utils/format";
import type { Share } from "@binks/types";

export function StockCard({ stock }: { stock: Share }) {
  return (
    <Link className="stock-card" to={`/shares/${stock.symbol}`}>
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
    </Link>
  );
}
