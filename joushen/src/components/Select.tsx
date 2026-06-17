import type { ReactNode, SelectHTMLAttributes } from "react";

const CSS = `
.jsn-select__wrap{ position:relative; display:inline-flex; width:100%; }
.jsn-select{
  appearance:none; -webkit-appearance:none; width:100%;
  height:42px; padding:0 38px 0 13px; font-family:var(--font-sans); font-size:14px; color:var(--text-strong);
  background:#fff; border:1.5px solid var(--border-default); border-radius:var(--radius-md); cursor:pointer;
  transition:border-color var(--dur-fast), box-shadow var(--dur-fast);
}
.jsn-select:hover{ border-color:var(--border-strong); }
.jsn-select:focus{ outline:none; border-color:var(--navy-500); box-shadow:0 0 0 3px rgba(52,80,96,0.16); }
.jsn-select[disabled]{ background:var(--gray-100); color:var(--text-muted); cursor:not-allowed; }
.jsn-select__chev{ position:absolute; right:13px; top:50%; transform:translateY(-50%); pointer-events:none; color:var(--text-muted); width:16px; height:16px; }
`;

if (typeof document !== "undefined" && !document.getElementById("jsn-select-css")) {
  const s = document.createElement("style");
  s.id = "jsn-select-css";
  s.textContent = CSS;
  document.head.appendChild(s);
}

type Option = string | { value: string; label: string };

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options?: Option[];
  children?: ReactNode;
}

export function Select({ children, options, className = "", ...props }: SelectProps) {
  return (
    <span className="jsn-select__wrap">
      <select className={["jsn-select", className].filter(Boolean).join(" ")} {...props}>
        {options
          ? options.map((o) =>
              typeof o === "string" ? (
                <option key={o} value={o}>
                  {o}
                </option>
              ) : (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ),
            )
          : children}
      </select>
      <svg
        className="jsn-select__chev"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </span>
  );
}
