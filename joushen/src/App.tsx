import { useEffect, useState } from "react";
import { Website } from "./site/Website";
import { Console } from "./console/Console";

type Surface = "website" | "console";

function currentSurface(): Surface {
  return window.location.hash.replace("#", "") === "console" ? "console" : "website";
}

/**
 * Tiny floating switcher so both product surfaces from the Joushen design
 * bundle (the marketing site and the Trust Console) are reachable in one app.
 */
function SurfaceSwitcher({ surface, onChange }: { surface: Surface; onChange: (s: Surface) => void }) {
  const tabs: { id: Surface; label: string }[] = [
    { id: "website", label: "Website" },
    { id: "console", label: "Trust Console" },
  ];
  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 100,
        display: "flex",
        gap: 4,
        padding: 5,
        background: "rgba(23,28,34,0.92)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 999,
        boxShadow: "0 12px 28px rgba(0,0,0,0.35)",
        fontFamily: "var(--font-sans)",
      }}
    >
      {tabs.map((t) => {
        const active = surface === t.id;
        return (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            style={{
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
              fontWeight: 600,
              fontSize: 13,
              padding: "8px 18px",
              borderRadius: 999,
              color: active ? "var(--ink-850)" : "var(--gray-200)",
              background: active ? "var(--lime-400)" : "transparent",
              transition: "background .15s, color .15s",
            }}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

export function App() {
  const [surface, setSurface] = useState<Surface>(currentSurface);

  useEffect(() => {
    const onHash = () => setSurface(currentSurface());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const change = (s: Surface) => {
    window.location.hash = s;
    setSurface(s);
  };

  return (
    <>
      {surface === "website" ? <Website /> : <Console />}
      <SurfaceSwitcher surface={surface} onChange={change} />
    </>
  );
}
