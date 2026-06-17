import type { ButtonHTMLAttributes, ReactNode } from "react";

const CSS = `
.jsn-iconbtn{
  --_bg:transparent; --_fg:var(--navy-600); --_bgh:var(--gray-100); --_bd:transparent;
  display:inline-flex; align-items:center; justify-content:center;
  border:1.5px solid var(--_bd); background:var(--_bg); color:var(--_fg);
  border-radius:var(--radius-md); cursor:pointer; padding:0;
  transition:background var(--dur-fast) var(--ease-standard), color var(--dur-fast), transform var(--dur-fast);
}
.jsn-iconbtn:hover{ background:var(--_bgh); }
.jsn-iconbtn:active{ transform:translateY(1px); }
.jsn-iconbtn:focus-visible{ outline:var(--focus-width) solid var(--focus-ring); outline-offset:2px; }
.jsn-iconbtn[disabled]{ opacity:.4; cursor:not-allowed; }
.jsn-iconbtn--sm{ width:32px; height:32px; }
.jsn-iconbtn--md{ width:40px; height:40px; }
.jsn-iconbtn--lg{ width:48px; height:48px; }
.jsn-iconbtn--solid{ --_bg:var(--navy-500); --_fg:#fff; --_bgh:var(--navy-600); }
.jsn-iconbtn--accent{ --_bg:var(--lime-400); --_fg:var(--ink-850); --_bgh:var(--lime-300); }
.jsn-iconbtn--outline{ --_bd:var(--border-default); --_bgh:var(--gray-50); }
.jsn-iconbtn svg{ width:1.15em; height:1.15em; display:block; }
.jsn-iconbtn--sm{ font-size:16px; } .jsn-iconbtn--md{ font-size:18px; } .jsn-iconbtn--lg{ font-size:20px; }
`;

if (typeof document !== "undefined" && !document.getElementById("jsn-iconbtn-css")) {
  const s = document.createElement("style");
  s.id = "jsn-iconbtn-css";
  s.textContent = CSS;
  document.head.appendChild(s);
}

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "ghost" | "solid" | "accent" | "outline";
  size?: "sm" | "md" | "lg";
  label: string;
  children: ReactNode;
}

export function IconButton({
  children,
  variant = "ghost",
  size = "md",
  label,
  className = "",
  ...props
}: IconButtonProps) {
  const cls = ["jsn-iconbtn", `jsn-iconbtn--${variant}`, `jsn-iconbtn--${size}`, className]
    .filter(Boolean)
    .join(" ");
  return (
    <button className={cls} aria-label={label} title={label} {...props}>
      {children}
    </button>
  );
}
