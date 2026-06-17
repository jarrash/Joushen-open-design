import type { HTMLAttributes, ReactNode } from "react";

const CSS = `
.jsn-alert{
  display:flex; gap:12px; align-items:flex-start; font-family:var(--font-sans);
  padding:14px 16px; border-radius:var(--radius-md); border:1px solid var(--border-subtle);
  background:var(--surface-card); border-left:var(--border-accent-w) solid var(--navy-500);
}
.jsn-alert__icon{ flex:0 0 auto; width:20px; height:20px; display:inline-flex; margin-top:1px; }
.jsn-alert__body{ font-size:14px; line-height:1.5; color:var(--text-body); }
.jsn-alert__title{ font-weight:600; color:var(--text-strong); margin-bottom:2px; }
.jsn-alert--info{ border-left-color:var(--blue-500); } .jsn-alert--info .jsn-alert__icon{ color:var(--blue-700); }
.jsn-alert--success{ border-left-color:var(--success-500); } .jsn-alert--success .jsn-alert__icon{ color:var(--success-600); }
.jsn-alert--warning{ border-left-color:var(--warning-500); } .jsn-alert--warning .jsn-alert__icon{ color:var(--warning-600); }
.jsn-alert--danger{ border-left-color:var(--danger-500); } .jsn-alert--danger .jsn-alert__icon{ color:var(--danger-600); }
`;

if (typeof document !== "undefined" && !document.getElementById("jsn-alert-css")) {
  const s = document.createElement("style");
  s.id = "jsn-alert-css";
  s.textContent = CSS;
  document.head.appendChild(s);
}

type AlertVariant = "info" | "success" | "warning" | "danger";

const ICONS: Record<AlertVariant, string> = {
  info: "M12 16v-4 M12 8h.01",
  success: "M20 6 9 17l-5-5",
  warning: "M12 9v4 M12 17h.01 M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z",
  danger: "M12 8v4 M12 16h.01",
};

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactNode;
  variant?: AlertVariant;
  icon?: boolean;
  children?: ReactNode;
}

export function Alert({
  children,
  title,
  variant = "info",
  icon = true,
  className = "",
  ...props
}: AlertProps) {
  return (
    <div
      className={["jsn-alert", `jsn-alert--${variant}`, className].filter(Boolean).join(" ")}
      role="status"
      {...props}
    >
      {icon ? (
        <span className="jsn-alert__icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {variant === "info" || variant === "danger" ? <circle cx="12" cy="12" r="10" /> : null}
            <path d={ICONS[variant]} />
          </svg>
        </span>
      ) : null}
      <div className="jsn-alert__body">
        {title ? <div className="jsn-alert__title">{title}</div> : null}
        {children}
      </div>
    </div>
  );
}
