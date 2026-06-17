import type { HTMLAttributes, ReactNode } from "react";

const CSS = `
.jsn-card{
  background:var(--surface-card); border:1px solid var(--border-subtle); border-radius:var(--radius-lg);
  box-shadow:var(--shadow-sm); padding:var(--space-6); position:relative;
  transition:box-shadow var(--dur-base) var(--ease-standard), transform var(--dur-base) var(--ease-standard), border-color var(--dur-base);
}
.jsn-card--interactive{ cursor:pointer; }
.jsn-card--interactive:hover{ box-shadow:var(--shadow-lg); transform:translateY(-2px); border-color:var(--border-default); }
.jsn-card--accent{ border-top:var(--border-accent-w) solid var(--lime-400); }
.jsn-card--dark{ background:var(--ink-850); border-color:var(--border-dark); color:var(--text-on-dark-body); box-shadow:none; }
.jsn-card--dark .jsn-card__title{ color:#fff; }
.jsn-card--flat{ box-shadow:none; }
.jsn-card__eyebrow{ font-family:var(--font-mono); font-size:11px; letter-spacing:0.14em; text-transform:uppercase; color:var(--text-muted); margin-bottom:10px; }
.jsn-card--dark .jsn-card__eyebrow{ color:var(--lime-400); }
.jsn-card__title{ font-family:var(--font-sans); font-weight:600; font-size:18px; letter-spacing:-0.015em; color:var(--text-strong); margin:0 0 6px; }
.jsn-card__body{ font-size:14px; line-height:1.6; color:inherit; }
`;

if (typeof document !== "undefined" && !document.getElementById("jsn-card-css")) {
  const s = document.createElement("style");
  s.id = "jsn-card-css";
  s.textContent = CSS;
  document.head.appendChild(s);
}

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  eyebrow?: ReactNode;
  title?: ReactNode;
  variant?: "default" | "accent" | "dark" | "flat";
  interactive?: boolean;
}

export function Card({
  children,
  eyebrow,
  title,
  variant = "default",
  interactive = false,
  className = "",
  ...props
}: CardProps) {
  const cls = [
    "jsn-card",
    variant !== "default" ? `jsn-card--${variant}` : "",
    interactive ? "jsn-card--interactive" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={cls} {...props}>
      {eyebrow ? <div className="jsn-card__eyebrow">{eyebrow}</div> : null}
      {title ? <h3 className="jsn-card__title">{title}</h3> : null}
      {children ? <div className="jsn-card__body">{children}</div> : null}
    </div>
  );
}
