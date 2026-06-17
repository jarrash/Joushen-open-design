import type { InputHTMLAttributes, ReactNode } from "react";

const CSS = `
.jsn-field{ display:flex; flex-direction:column; gap:6px; font-family:var(--font-sans); }
.jsn-field__label{ font-size:13px; font-weight:600; color:var(--text-strong); letter-spacing:-0.01em; }
.jsn-field__hint{ font-size:12px; color:var(--text-muted); }
.jsn-field__error{ font-size:12px; color:var(--danger-600); }
.jsn-input{
  height:42px; padding:0 13px; font-family:var(--font-sans); font-size:14px; color:var(--text-strong);
  background:#fff; border:1.5px solid var(--border-default); border-radius:var(--radius-md);
  transition:border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast);
  width:100%; box-sizing:border-box;
}
.jsn-input::placeholder{ color:var(--text-subtle); }
.jsn-input:hover{ border-color:var(--border-strong); }
.jsn-input:focus{ outline:none; border-color:var(--navy-500); box-shadow:0 0 0 3px rgba(52,80,96,0.16); }
.jsn-input[aria-invalid="true"]{ border-color:var(--danger-500); }
.jsn-input[aria-invalid="true"]:focus{ box-shadow:0 0 0 3px rgba(217,83,79,0.18); }
.jsn-input[disabled]{ background:var(--gray-100); color:var(--text-muted); cursor:not-allowed; }
.jsn-input--lg{ height:50px; font-size:16px; }
.jsn-input__wrap{ position:relative; display:flex; align-items:center; }
.jsn-input__wrap .jsn-input{ padding-left:38px; }
.jsn-input__lead{ position:absolute; left:12px; display:inline-flex; color:var(--text-muted); width:18px; height:18px; pointer-events:none; }
`;

if (typeof document !== "undefined" && !document.getElementById("jsn-input-css")) {
  const s = document.createElement("style");
  s.id = "jsn-input-css";
  s.textContent = CSS;
  document.head.appendChild(s);
}

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  hint?: string;
  error?: string;
  size?: "md" | "lg";
  iconLeft?: ReactNode;
}

export function Input({
  label,
  hint,
  error,
  size = "md",
  iconLeft = null,
  id,
  className = "",
  ...props
}: InputProps) {
  const fieldId = id || (label ? "jsn-" + label.toLowerCase().replace(/\s+/g, "-") : undefined);
  const input = (
    <input
      id={fieldId}
      className={["jsn-input", size === "lg" ? "jsn-input--lg" : "", className].filter(Boolean).join(" ")}
      aria-invalid={error ? "true" : undefined}
      {...props}
    />
  );
  return (
    <label className="jsn-field" htmlFor={fieldId}>
      {label ? <span className="jsn-field__label">{label}</span> : null}
      {iconLeft ? (
        <span className="jsn-input__wrap">
          <span className="jsn-input__lead">{iconLeft}</span>
          {input}
        </span>
      ) : (
        input
      )}
      {error ? (
        <span className="jsn-field__error">{error}</span>
      ) : hint ? (
        <span className="jsn-field__hint">{hint}</span>
      ) : null}
    </label>
  );
}
