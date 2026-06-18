import { formatPercent } from "../utils/format";

export function ChangeBadge({ value }: { value: number }) {
  const up = value >= 0;
  return (
    <span className={`change mono ${up ? "change--up" : "change--down"}`}>
      <span className="change__caret" aria-hidden="true">
        {up ? "▲" : "▼"}
      </span>
      {formatPercent(value)}
    </span>
  );
}
