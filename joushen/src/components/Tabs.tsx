import { useState } from "react";

const CSS = `
.jsn-tabs{ display:inline-flex; gap:2px; font-family:var(--font-sans); }
.jsn-tabs--line{ border-bottom:1px solid var(--border-subtle); gap:4px; display:flex; }
.jsn-tab{
  appearance:none; border:0; background:transparent; cursor:pointer; font-family:inherit;
  font-weight:600; font-size:14px; letter-spacing:-0.01em; color:var(--text-muted);
  padding:10px 16px; border-radius:var(--radius-md); transition:color var(--dur-fast), background var(--dur-fast);
  position:relative;
}
.jsn-tab:hover{ color:var(--text-strong); }
.jsn-tabs--pill .jsn-tab[aria-selected="true"]{ background:var(--navy-500); color:#fff; }
.jsn-tabs--pill{ background:var(--gray-100); padding:4px; border-radius:var(--radius-lg); }
.jsn-tabs--line .jsn-tab{ border-radius:0; padding:12px 4px; margin:0 10px; }
.jsn-tabs--line .jsn-tab[aria-selected="true"]{ color:var(--text-strong); }
.jsn-tabs--line .jsn-tab[aria-selected="true"]::after{
  content:""; position:absolute; left:0; right:0; bottom:-1px; height:2.5px; background:var(--lime-400); border-radius:2px;
}
.jsn-tab__count{ margin-left:7px; font-family:var(--font-mono); font-size:11px; color:var(--text-subtle); }
.jsn-tab[aria-selected="true"] .jsn-tab__count{ color:inherit; opacity:.7; }
`;

if (typeof document !== "undefined" && !document.getElementById("jsn-tabs-css")) {
  const s = document.createElement("style");
  s.id = "jsn-tabs-css";
  s.textContent = CSS;
  document.head.appendChild(s);
}

export interface TabItem {
  value: string;
  label: string;
  count?: number;
}

export interface TabsProps {
  items: TabItem[];
  value?: string;
  onChange?: (value: string) => void;
  variant?: "line" | "pill";
  className?: string;
}

export function Tabs({ items = [], value, onChange, variant = "line", className = "" }: TabsProps) {
  const [internal, setInternal] = useState<string | undefined>(value ?? items[0]?.value);
  const active = value !== undefined ? value : internal;
  const select = (v: string) => {
    setInternal(v);
    onChange?.(v);
  };
  return (
    <div
      className={["jsn-tabs", `jsn-tabs--${variant}`, className].filter(Boolean).join(" ")}
      role="tablist"
    >
      {items.map((it) => (
        <button
          key={it.value}
          role="tab"
          aria-selected={active === it.value}
          className="jsn-tab"
          onClick={() => select(it.value)}
        >
          {it.label}
          {it.count != null ? <span className="jsn-tab__count">{it.count}</span> : null}
        </button>
      ))}
    </div>
  );
}
