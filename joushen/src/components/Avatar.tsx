import type { HTMLAttributes } from "react";

const CSS = `
.jsn-avatar{
  display:inline-flex; align-items:center; justify-content:center; flex:0 0 auto;
  border-radius:50%; overflow:hidden; font-family:var(--font-sans); font-weight:600;
  background:var(--navy-500); color:#fff; position:relative; user-select:none;
}
.jsn-avatar img{ width:100%; height:100%; object-fit:cover; }
.jsn-avatar--accent{ background:var(--lime-400); color:var(--ink-850); }
.jsn-avatar--sage{ background:var(--sage-500); }
.jsn-avatar--blue{ background:var(--blue-500); color:var(--ink-850); }
.jsn-avatar--xs{ width:24px; height:24px; font-size:10px; }
.jsn-avatar--sm{ width:32px; height:32px; font-size:12px; }
.jsn-avatar--md{ width:40px; height:40px; font-size:14px; }
.jsn-avatar--lg{ width:56px; height:56px; font-size:19px; }
.jsn-avatar__ring{ box-shadow:0 0 0 2px #fff, 0 0 0 3.5px var(--lime-400); }
`;

if (typeof document !== "undefined" && !document.getElementById("jsn-avatar-css")) {
  const s = document.createElement("style");
  s.id = "jsn-avatar-css";
  s.textContent = CSS;
  document.head.appendChild(s);
}

function initials(name = ""): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  name?: string;
  src?: string;
  size?: "xs" | "sm" | "md" | "lg";
  color?: "navy" | "accent" | "sage" | "blue";
  ring?: boolean;
}

export function Avatar({
  name,
  src,
  size = "md",
  color = "navy",
  ring = false,
  className = "",
  ...props
}: AvatarProps) {
  const cls = [
    "jsn-avatar",
    `jsn-avatar--${size}`,
    color !== "navy" ? `jsn-avatar--${color}` : "",
    ring ? "jsn-avatar__ring" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <span className={cls} title={name} {...props}>
      {src ? <img src={src} alt={name || ""} /> : initials(name)}
    </span>
  );
}
