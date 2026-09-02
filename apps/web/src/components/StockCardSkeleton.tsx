import "./StockCard.css";

export function StockCardSkeleton() {
  return (
    <div className="stock-card stock-card--skeleton" aria-hidden="true">
      <div className="stock-card__head">
        <span className="skeleton skel-bar skel-bar--card-symbol" />
        <span className="skeleton skel-bar skel-bar--card-name" />
      </div>
      <div className="stock-card__foot">
        <span className="skeleton skel-bar skel-bar--card-price" />
        <span className="skeleton skel-bar skel-bar--card-change" />
      </div>
    </div>
  );
}
