import "./MarketNotice.css";

type Tone = "neutral" | "accent" | "danger";

type Action = {
  label: string;
  onClick: () => void;
};

export function MarketNotice({
  tone,
  text,
  meta,
  action,
}: {
  tone: Tone;
  text: string;
  meta?: string;
  action?: Action;
}) {
  return (
    <div
      className={`notice notice--${tone}`}
      role={tone === "danger" ? "alert" : undefined}
    >
      <p className="notice__text">{text}</p>
      {meta && <span className="notice__meta mono">{meta}</span>}
      {action && (
        <button
          type="button"
          className="btn btn--ghost btn--sm notice__action"
          onClick={action.onClick}
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

export function MarketNoticeSkeleton() {
  return (
    <div className="notice notice--accent" aria-hidden="true">
      <span className="skeleton skel-bar notice__skel" />
    </div>
  );
}

export function MarketBlock({
  tone,
  title,
  body,
  action,
}: {
  tone: Exclude<Tone, "accent">;
  title: string;
  body: string;
  action?: Action;
}) {
  return (
    <section
      className={`market-block market-block--${tone}`}
      role={tone === "danger" ? "alert" : undefined}
    >
      <h2 className="market-block__title">{title}</h2>
      <p className="market-block__body">{body}</p>
      {action && (
        <button
          type="button"
          className="btn btn--ghost btn--sm market-block__action"
          onClick={action.onClick}
        >
          {action.label}
        </button>
      )}
    </section>
  );
}
