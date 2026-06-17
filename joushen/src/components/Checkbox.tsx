import type { InputHTMLAttributes, ReactNode } from "react";

const CSS = `
.jsn-check{ display:inline-flex; align-items:flex-start; gap:10px; font-family:var(--font-sans); cursor:pointer; user-select:none; }
.jsn-check input{ position:absolute; opacity:0; width:0; height:0; }
.jsn-check__box{
  flex:0 0 auto; width:20px; height:20px; border:1.5px solid var(--border-strong); border-radius:var(--radius-sm);
  background:#fff; display:inline-flex; align-items:center; justify-content:center; margin-top:1px;
  transition:background var(--dur-fast), border-color var(--dur-fast);
}
.jsn-check__box svg{ width:14px; height:14px; color:var(--ink-850); opacity:0; transform:scale(.6); transition:opacity var(--dur-fast), transform var(--dur-fast); }
.jsn-check input:checked + .jsn-check__box{ background:var(--lime-400); border-color:var(--lime-500); }
.jsn-check input:checked + .jsn-check__box svg{ opacity:1; transform:scale(1); }
.jsn-check input:focus-visible + .jsn-check__box{ outline:3px solid var(--focus-ring); outline-offset:2px; }
.jsn-check input:disabled + .jsn-check__box{ background:var(--gray-100); border-color:var(--border-default); }
.jsn-check__text{ font-size:14px; color:var(--text-body); line-height:1.4; }
.jsn-check__text b{ display:block; color:var(--text-strong); font-weight:600; }
`;

if (typeof document !== "undefined" && !document.getElementById("jsn-check-css")) {
  const s = document.createElement("style");
  s.id = "jsn-check-css";
  s.textContent = CSS;
  document.head.appendChild(s);
}

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  description?: ReactNode;
}

export function Checkbox({ label, description, className = "", ...props }: CheckboxProps) {
  return (
    <label className={["jsn-check", className].filter(Boolean).join(" ")}>
      <input type="checkbox" {...props} />
      <span className="jsn-check__box">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
      {label || description ? (
        <span className="jsn-check__text">
          {description ? <b>{label}</b> : label}
          {description}
        </span>
      ) : null}
    </label>
  );
}
