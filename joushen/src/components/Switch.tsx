import type { InputHTMLAttributes } from "react";

const CSS = `
.jsn-switch{ display:inline-flex; align-items:center; gap:10px; font-family:var(--font-sans); cursor:pointer; user-select:none; }
.jsn-switch input{ position:absolute; opacity:0; width:0; height:0; }
.jsn-switch__track{
  width:42px; height:24px; border-radius:999px; background:var(--gray-300); position:relative;
  transition:background var(--dur-base) var(--ease-standard); flex:0 0 auto;
}
.jsn-switch__thumb{
  position:absolute; top:2px; left:2px; width:20px; height:20px; border-radius:50%; background:#fff;
  box-shadow:var(--shadow-sm); transition:transform var(--dur-base) var(--ease-out);
}
.jsn-switch input:checked + .jsn-switch__track{ background:var(--sage-500); }
.jsn-switch input:checked + .jsn-switch__track .jsn-switch__thumb{ transform:translateX(18px); }
.jsn-switch input:focus-visible + .jsn-switch__track{ outline:3px solid var(--focus-ring); outline-offset:2px; }
.jsn-switch input:disabled + .jsn-switch__track{ opacity:.5; }
.jsn-switch__label{ font-size:14px; color:var(--text-body); }
`;

if (typeof document !== "undefined" && !document.getElementById("jsn-switch-css")) {
  const s = document.createElement("style");
  s.id = "jsn-switch-css";
  s.textContent = CSS;
  document.head.appendChild(s);
}

export interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Switch({ label, className = "", ...props }: SwitchProps) {
  return (
    <label className={["jsn-switch", className].filter(Boolean).join(" ")}>
      <input type="checkbox" role="switch" {...props} />
      <span className="jsn-switch__track">
        <span className="jsn-switch__thumb" />
      </span>
      {label ? <span className="jsn-switch__label">{label}</span> : null}
    </label>
  );
}
