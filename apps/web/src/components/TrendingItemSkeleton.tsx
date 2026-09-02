import "./TrendingItem.css";

export function TrendingItemSkeleton() {
  return (
    <div className="trend-item trend-item--skeleton" aria-hidden="true">
      <div className="trend-item__id">
        <span className="skeleton skel-bar skel-bar--trend-symbol" />
        <span className="skeleton skel-bar skel-bar--trend-name" />
      </div>
      <div className="trend-item__nums">
        <span className="skeleton skel-bar skel-bar--trend-price" />
        <span className="skeleton skel-bar skel-bar--trend-change" />
      </div>
    </div>
  );
}
