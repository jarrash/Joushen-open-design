import type { ButtonHTMLAttributes, ReactNode } from "react";

const CSS = `
.jsn-btn{
  --_bg: var(--navy-500); --_fg:#fff; --_bd:transparent; --_bgh: var(--navy-600);
  display:inline-flex; align-items:center; justify-content:center; gap:8px;
  font-family:var(--font-sans); font-weight:600; letter-spacing:-0.01em;
  border:1.5px solid var(--_bd); background:var(--_bg); color:var(--_fg);
  border-radius:var(--radius-md); cursor:pointer; white-space:nowrap;
  transition:background var(--dur-fast) var(--ease-standard),
             transform var(--dur-fast) var(--ease-standard),
             box-shadow var(--dur-fast) var(--ease-standard), border-color var(--dur-fast);
  text-decoration:none;
}
.jsn-btn:hover{ background:var(--_bgh); }
.jsn-btn:active{ transform:translateY(1px); }
.jsn-btn:focus-visible{ outline:var(--focus-width) solid var(--focus-ring); outline-offset:var(--focus-offset); }
.jsn-btn[disabled]{ opacity:.45; cursor:not-allowed; transform:none; }

.jsn-btn--sm{ height:34px; padding:0 14px; font-size:13px; }
.jsn-btn--md{ height:42px; padding:0 20px; font-size:14px; }
.jsn-btn--lg{ height:52px; padding:0 28px; font-size:16px; border-radius:var(--radius-lg); }

.jsn-btn--primary{ --_bg:var(--lime-400); --_fg:var(--ink-850); --_bgh:var(--lime-300); }
.jsn-btn--primary:hover{ box-shadow:var(--shadow-accent); }
.jsn-btn--secondary{ --_bg:var(--navy-500); --_fg:#fff; --_bgh:var(--navy-600); }
.jsn-btn--ghost{ --_bg:transparent; --_fg:var(--navy-500); --_bgh:var(--navy-50); }
.jsn-btn--outline{ --_bg:transparent; --_fg:var(--navy-700); --_bd:var(--border-default); --_bgh:var(--gray-50); }
.jsn-btn--danger{ --_bg:var(--danger-500); --_fg:#fff; --_bgh:var(--danger-600); }
.jsn-btn--block{ width:100%; }
.jsn-btn__icon{ display:inline-flex; width:1.1em; height:1.1em; }
`;

if (typeof document !== "undefined" && !document.getElementById("jsn-btn-css")) {
  const s = document.createElement("style");
  s.id = "jsn-btn-css";
  s.textContent = CSS;
  document.head.appendChild(s);
}

export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  block = false,
  iconLeft = null,
  iconRight = null,
  className = "",
  ...props
}: ButtonProps) {
  const cls = [
    "jsn-btn",
    `jsn-btn--${variant}`,
    `jsn-btn--${size}`,
    block ? "jsn-btn--block" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <button className={cls} {...props}>
      {iconLeft ? <span className="jsn-btn__icon">{iconLeft}</span> : null}
      {children}
      {iconRight ? <span className="jsn-btn__icon">{iconRight}</span> : null}
    </button>
  );
}
