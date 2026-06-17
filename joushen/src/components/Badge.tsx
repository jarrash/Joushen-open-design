import type { HTMLAttributes, ReactNode } from "react";

const CSS = `
.jsn-badge{
  display:inline-flex; align-items:center; gap:6px; font-family:var(--font-sans); font-weight:600;
  font-size:12px; line-height:1; letter-spacing:0.01em; padding:5px 10px; border-radius:var(--radius-pill);
  white-space:nowrap;
}
.jsn-badge--neutral{ background:var(--gray-100); color:var(--gray-700); }
.jsn-badge--accent{ background:var(--lime-400); color:var(--ink-850); }
.jsn-badge--navy{ background:var(--navy-500); color:#fff; }
.jsn-badge--success{ background:#E3F1E7; color:var(--success-600); }
.jsn-badge--warning{ background:#FBF0D5; color:var(--warning-600); }
.jsn-badge--danger{ background:#F7DEDD; color:var(--danger-600); }
.jsn-badge--info{ background:var(--blue-100); color:var(--blue-700); }
.jsn-badge--outline{ background:transparent; color:var(--text-body); box-shadow:inset 0 0 0 1.5px var(--border-default); }
.jsn-badge__dot{ width:6px; height:6px; border-radius:50%; background:currentColor; }
.jsn-badge--square{ border-radius:var(--radius-sm); font-family:var(--font-mono); font-weight:500; letter-spacing:0.03em; }
`;

if (typeof document !== "undefined" && !document.getElementById("jsn-badge-css")) {
  const s = document.createElement("style");
  s.id = "jsn-badge-css";
  s.textContent = CSS;
  document.head.appendChild(s);
}

export type BadgeVariant =
  | "neutral"
  | "accent"
  | "navy"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "outline";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  dot?: boolean;
  square?: boolean;
  children: ReactNode;
}

export function Badge({
  children,
  variant = "neutral",
  dot = false,
  square = false,
  className = "",
  ...props
}: BadgeProps) {
  const cls = ["jsn-badge", `jsn-badge--${variant}`, square ? "jsn-badge--square" : "", className]
    .filter(Boolean)
    .join(" ");
  return (
    <span className={cls} {...props}>
      {dot ? <span className="jsn-badge__dot" /> : null}
      {children}
    </span>
  );
}
