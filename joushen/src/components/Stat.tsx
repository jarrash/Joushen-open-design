import type { HTMLAttributes } from "react";

const CSS = `
.jsn-stat{ font-family:var(--font-sans); display:flex; flex-direction:column; gap:6px; }
.jsn-stat__label{ font-family:var(--font-mono); font-size:11px; letter-spacing:0.12em; text-transform:uppercase; color:var(--text-muted); }
.jsn-stat__value{ font-family:var(--font-sans); font-weight:700; font-size:44px; line-height:1; letter-spacing:-0.03em; color:var(--text-strong); }
.jsn-stat__value .jsn-stat__unit{ font-size:0.55em; font-weight:600; color:var(--lime-500); margin-left:2px; letter-spacing:0; }
.jsn-stat__delta{ display:inline-flex; align-items:center; gap:4px; font-size:13px; font-weight:600; }
.jsn-stat__delta--up{ color:var(--success-600); }
.jsn-stat__delta--down{ color:var(--danger-600); }
.jsn-stat--dark .jsn-stat__value{ color:#fff; }
.jsn-stat--dark .jsn-stat__label{ color:var(--navy-300); }
.jsn-stat--accent .jsn-stat__value{ color:var(--lime-400); }
`;

if (typeof document !== "undefined" && !document.getElementById("jsn-stat-css")) {
  const s = document.createElement("style");
  s.id = "jsn-stat-css";
  s.textContent = CSS;
  document.head.appendChild(s);
}

export interface StatProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  value: string | number;
  unit?: string;
  delta?: string;
  trend?: "up" | "down";
  tone?: "default" | "dark" | "accent";
}

export function Stat({
  label,
  value,
  unit,
  delta,
  trend,
  tone = "default",
  className = "",
  ...props
}: StatProps) {
  const cls = ["jsn-stat", tone !== "default" ? `jsn-stat--${tone}` : "", className]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={cls} {...props}>
      {label ? <div className="jsn-stat__label">{label}</div> : null}
      <div className="jsn-stat__value">
        {value}
        {unit ? <span className="jsn-stat__unit">{unit}</span> : null}
      </div>
      {delta ? (
        <span className={`jsn-stat__delta jsn-stat__delta--${trend === "down" ? "down" : "up"}`}>
          <span>{trend === "down" ? "▾" : "▴"}</span>
          {delta}
        </span>
      ) : null}
    </div>
  );
}
