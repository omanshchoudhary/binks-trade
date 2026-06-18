import "./IndexStrip.css";
import { ChangeBadge } from "./ChangeBadge";
import { formatValue } from "../utils/format";
import type { MarketIndex } from "../data/mockData";

export function IndexStrip({ indices }: { indices: MarketIndex[] }) {
  return (
    <div className="index-strip" role="list" aria-label="Market indices">
      {indices.map((index) => (
        <div className="index-chip" role="listitem" key={index.symbol}>
          <span className="index-chip__name">{index.name}</span>
          <span className="index-chip__value mono">
            {formatValue(index.value)}
          </span>
          <ChangeBadge value={index.changePercent} />
        </div>
      ))}
    </div>
  );
}
