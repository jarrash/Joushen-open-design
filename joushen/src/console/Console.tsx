import { useState, type CSSProperties } from "react";
import { Alert, Avatar, Badge, Button, Card, Icon, IconButton, Input, Stat, Switch, Tabs } from "../components";
import type { AvatarProps } from "../components/Avatar";
import type { BadgeVariant } from "../components/Badge";

/* Joushen Trust Console — faithful recreation of the dashboard UI kit. */

type AvatarColor = NonNullable<AvatarProps["color"]>;

const NAV: { id: string; label: string; icon: string }[] = [
  { id: "dashboard", label: "Dashboard", icon: "layout-dashboard" },
  { id: "identities", label: "Identities", icon: "fingerprint" },
  { id: "governance", label: "Governance", icon: "scale" },
  { id: "ot", label: "OT Security", icon: "cpu" },
  { id: "reports", label: "Reports", icon: "file-text" },
];

/* ============================ LOGIN ============================ */
function Login({ onAuth }: { onAuth: () => void }) {
  return (
    <div style={C.loginWrap}>
      <div style={C.loginNet} aria-hidden="true" />
      <div style={C.loginGlow} aria-hidden="true" />
      <div style={C.loginCard}>
        <img src="/assets/logo/joushen-horizontal-navy.png" alt="Joushen" style={{ height: 30, marginBottom: 26 }} />
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 6 }}>
          Trust Console
        </div>
        <h1 style={{ font: "600 24px var(--font-sans)", letterSpacing: "-.02em", color: "var(--text-strong)", margin: "0 0 22px" }}>
          Sign in to your workspace
        </h1>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Input label="Work email" type="email" defaultValue="omar.nasser@ncta.gov.sa" />
          <Input label="Password" type="password" defaultValue="••••••••••" />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "18px 0 22px" }}>
          <Switch label="Keep me signed in" />
          <a href="#" style={{ fontSize: 13, color: "var(--navy-500)", fontWeight: 600 }}>
            Forgot password?
          </a>
        </div>
        <Button variant="primary" block size="lg" iconRight={<Icon name="arrow-right" size={18} />} onClick={onAuth}>
          Sign in
        </Button>
        <div style={{ textAlign: "center", marginTop: 18, fontSize: 12, color: "var(--text-subtle)", fontFamily: "var(--font-mono)" }}>
          <Icon name="lock-keyhole" size={13} style={{ marginRight: 5, verticalAlign: "-2px" }} />
          Hosted in the Kingdom · PDPL compliant
        </div>
      </div>
    </div>
  );
}

/* ============================ SHELL ============================ */
function Sidebar({ view, setView }: { view: string; setView: (v: string) => void }) {
  return (
    <aside style={C.sidebar}>
      <div style={{ padding: "22px 20px 18px" }}>
        <img src="/assets/logo/joushen-horizontal-lime.png" alt="Joushen" style={{ height: 24 }} />
      </div>
      <nav style={{ padding: "8px 12px", flex: 1 }}>
        {NAV.map((n) => {
          const active = view === n.id;
          return (
            <button key={n.id} onClick={() => setView(n.id)} style={{ ...C.navItem, ...(active ? C.navItemActive : {}) }}>
              <Icon name={n.icon} size={19} stroke={active ? 2.2 : 1.8} />
              <span>{n.label}</span>
              {n.id === "governance" && <span style={C.navBadge}>3</span>}
            </button>
          );
        })}
      </nav>
      <div style={C.sidebarFoot}>
        <Avatar name="Omar Nasser" color="accent" size="sm" />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: "#fff", fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Omar Nasser</div>
          <div style={{ color: "var(--navy-300)", fontSize: 11 }}>NCTA · Admin</div>
        </div>
        <Icon name="settings" size={17} style={{ color: "var(--navy-300)" }} />
      </div>
    </aside>
  );
}

function Topbar({ title, onLogout }: { title: string; onLogout: () => void }) {
  return (
    <div style={C.topbar}>
      <div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text-muted)" }}>
          Trust Console
        </div>
        <h1 style={{ font: "600 22px var(--font-sans)", letterSpacing: "-.02em", color: "var(--text-strong)", margin: "2px 0 0" }}>{title}</h1>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={C.search}>
          <Icon name="search" size={16} style={{ color: "var(--text-subtle)" }} />
          <span>Search identities, controls…</span>
          <kbd style={C.kbd}>⌘K</kbd>
        </div>
        <IconButton label="Notifications" variant="outline">
          <Icon name="bell" size={18} />
        </IconButton>
        <IconButton label="Sign out" variant="outline" onClick={onLogout}>
          <Icon name="log-out" size={18} />
        </IconButton>
      </div>
    </div>
  );
}

/* ============================ DASHBOARD ============================ */
function Dashboard() {
  const posture: [string, number, string][] = [
    ["Identity", 94, "var(--sage-500)"],
    ["Governance", 88, "var(--blue-500)"],
    ["OT Security", 79, "var(--lime-500)"],
    ["AI Assurance", 71, "var(--navy-400)"],
  ];
  const findings: [string, string, string, "danger" | "warning" | "info"][] = [
    ["Privileged account without MFA", "Identity", "Critical", "danger"],
    ["PDPL retention policy expires in 5 days", "Governance", "High", "warning"],
    ["3 dormant service accounts detected", "Identity", "Medium", "info"],
    ["OT segment baseline drift", "OT Security", "Medium", "info"],
  ];
  return (
    <div style={C.viewPad}>
      <Alert variant="warning" title="Action required" style={{ marginBottom: 20 }}>
        One privileged account is operating without MFA enforcement.{" "}
        <a href="#" style={{ color: "var(--warning-600)", fontWeight: 600 }}>
          Review now →
        </a>
      </Alert>

      <div style={C.dashGrid}>
        <Card variant="dark" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--lime-400)" }}>
              Organizational trust score
            </div>
            <Badge variant="success" dot>
              +4 this month
            </Badge>
          </div>
          <div style={{ font: "700 72px var(--font-sans)", letterSpacing: "-.04em", color: "#fff", lineHeight: 1, margin: "14px 0" }}>
            92<span style={{ fontSize: 30, color: "var(--lime-400)" }}>/100</span>
          </div>
          <div>
            {posture.map(([k, v, c]) => (
              <div key={k} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 5, color: "var(--gray-200)" }}>
                  <span>{k}</span>
                  <span style={{ fontFamily: "var(--font-mono)" }}>{v}</span>
                </div>
                <div style={C.trackDark}>
                  <div style={{ ...C.fill, width: v + "%", background: c }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={C.statRow}>
            <Card>
              <Stat label="Identities" value="1.4M" delta="2.1% MoM" trend="up" />
            </Card>
            <Card>
              <Stat label="MTTD" value="4.2" unit="min" delta="38% faster" trend="up" />
            </Card>
          </div>
          <div style={C.statRow}>
            <Card>
              <Stat label="Open findings" value="17" delta="6 closed" trend="up" />
            </Card>
            <Card>
              <Stat label="Controls met" value="318" unit="/342" />
            </Card>
          </div>
          <Card title="Recent findings" style={{ flex: 1 }}>
            <div style={{ marginTop: 6 }}>
              {findings.map(([t, area, sev, tone]) => (
                <div key={t} style={C.findRow}>
                  <span style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
                    <Icon
                      name="circle-alert"
                      size={17}
                      style={{ color: tone === "danger" ? "var(--danger-500)" : tone === "warning" ? "var(--warning-500)" : "var(--blue-500)", flex: "0 0 auto" }}
                    />
                    <span style={{ fontSize: 14, color: "var(--text-body)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t}</span>
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 12, flex: "0 0 auto" }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-subtle)" }}>{area}</span>
                    <Badge variant={tone}>{sev}</Badge>
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ============================ IDENTITIES ============================ */
type Person = [string, string, string, AvatarColor, string, boolean];

const PEOPLE: Person[] = [
  ["Layla Al-Otaibi", "Director, Data Office", "Privileged", "sage", "MFA", true],
  ["Faisal Al-Harbi", "OT Engineer", "Standard", "navy", "MFA", true],
  ["svc-backup-prod", "Service account", "Service", "blue", "No MFA", false],
  ["Huda Khalid", "GRC Analyst", "Standard", "navy", "MFA", true],
  ["Mansour Aziz", "Cloud Admin", "Privileged", "sage", "MFA", true],
  ["svc-scanner", "Service account", "Service", "blue", "MFA", true],
];

function Identities({ onOpen }: { onOpen: (p: Person) => void }) {
  const [tab, setTab] = useState("all");
  const rows = PEOPLE.filter(
    (p) => tab === "all" || (tab === "priv" && p[2] === "Privileged") || (tab === "svc" && p[2] === "Service"),
  );
  return (
    <div style={C.viewPad}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <Tabs
          items={[
            { value: "all", label: "All", count: PEOPLE.length },
            { value: "priv", label: "Privileged", count: 2 },
            { value: "svc", label: "Service", count: 2 },
          ]}
          value={tab}
          onChange={setTab}
          variant="pill"
        />
        <Button variant="primary" iconLeft={<Icon name="plus" size={16} />}>
          Provision identity
        </Button>
      </div>
      <Card style={{ padding: 0, overflow: "hidden" }}>
        <table style={C.table}>
          <thead>
            <tr>
              {["Identity", "Type", "Authentication", "Status", ""].map((h) => (
                <th key={h} style={C.th}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p[0]} style={C.tr} onClick={() => onOpen(p)}>
                <td style={C.td}>
                  <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Avatar name={p[0].startsWith("svc") ? "S A" : p[0]} color={p[3]} size="sm" />
                    <span>
                      <span style={{ display: "block", fontWeight: 600, color: "var(--text-strong)", fontSize: 14 }}>{p[0]}</span>
                      <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{p[1]}</span>
                    </span>
                  </span>
                </td>
                <td style={C.td}>
                  <Badge variant={p[2] === "Privileged" ? "navy" : "outline"}>{p[2]}</Badge>
                </td>
                <td style={C.td}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13, color: p[5] ? "var(--text-body)" : "var(--danger-600)" }}>
                    <Icon name={p[5] ? "key-round" : "triangle-alert"} size={16} />
                    {p[4]}
                  </span>
                </td>
                <td style={C.td}>
                  <Badge variant={p[5] ? "success" : "danger"} dot>
                    {p[5] ? "Active" : "At risk"}
                  </Badge>
                </td>
                <td style={{ ...C.td, textAlign: "right" }}>
                  <Icon name="chevron-right" size={18} style={{ color: "var(--text-subtle)" }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function Drawer({ person, onClose }: { person: Person | null; onClose: () => void }) {
  if (!person) return null;
  const kv: [string, string][] = [
    ["Type", person[2]],
    ["Authentication", person[4]],
    ["Last sign-in", "2h ago · Riyadh"],
    ["Risk", person[5] ? "Low" : "High"],
  ];
  return (
    <div style={C.drawerOverlay} onClick={onClose}>
      <div style={C.drawer} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
          <span style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <Avatar name={person[0].startsWith("svc") ? "S A" : person[0]} color={person[3]} size="lg" />
            <span>
              <span style={{ display: "block", font: "600 18px var(--font-sans)", color: "var(--text-strong)" }}>{person[0]}</span>
              <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{person[1]}</span>
            </span>
          </span>
          <IconButton label="Close" variant="ghost" onClick={onClose}>
            <Icon name="x" size={20} />
          </IconButton>
        </div>
        {!person[5] && (
          <Alert variant="danger" title="MFA not enforced" style={{ marginBottom: 18 }}>
            Enforce multi-factor authentication to restore this identity's trust standing.
          </Alert>
        )}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
          {kv.map(([k, v]) => (
            <div key={k} style={C.kv}>
              <div style={C.kvK}>{k}</div>
              <div style={C.kvV}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 10 }}>
          Access policies
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
          {["Least privilege · enforced", "Just-in-time elevation", "Quarterly access review"].map((x) => (
            <div key={x} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "var(--text-body)" }}>
              <Icon name="circle-check-big" size={16} style={{ color: "var(--sage-500)" }} />
              {x}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Button variant="primary" block iconLeft={<Icon name="key-round" size={16} />}>
            Enforce MFA
          </Button>
          <Button variant="outline" block>
            View activity
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ============================ GOVERNANCE ============================ */
function Governance() {
  const frameworks: [string, string, number, number, number][] = [
    ["NCA ECC", "Essential Cybersecurity Controls", 96, 114, 119],
    ["SAMA CSF", "Cyber Security Framework", 88, 102, 116],
    ["PDPL", "Personal Data Protection Law", 79, 41, 52],
  ];
  const evidence: [string, string, string, string, BadgeVariant, string][] = [
    ["Access control policy", "NCA ECC 2-2-1", "Layla A.", "Automated", "success", "Met"],
    ["Data residency — KSA", "PDPL Art. 29", "Huda K.", "Automated", "success", "Met"],
    ["Encryption at rest", "SAMA 3.3.9", "Mansour A.", "Manual", "warning", "Review"],
    ["Incident response plan", "NCA ECC 4-1", "Omar N.", "Automated", "success", "Met"],
  ];
  return (
    <div style={C.viewPad}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 16 }}>
        {frameworks.map(([name, full, pct, met, total]) => (
          <Card key={name} variant={pct >= 90 ? "accent" : "default"}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div>
                <div style={{ font: "600 17px var(--font-sans)", color: "var(--text-strong)" }}>{name}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{full}</div>
              </div>
              <Badge variant={pct >= 90 ? "success" : pct >= 80 ? "info" : "warning"}>{pct}%</Badge>
            </div>
            <div style={C.track}>
              <div style={{ ...C.fill, width: pct + "%", background: pct >= 90 ? "var(--sage-500)" : pct >= 80 ? "var(--blue-500)" : "var(--warning-500)" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontSize: 12, color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              <span>
                {met}/{total} controls
              </span>
              <span>{total - met} open</span>
            </div>
          </Card>
        ))}
      </div>
      <Card title="Control evidence — collected continuously">
        <table style={{ ...C.table, marginTop: 8 }}>
          <thead>
            <tr>
              {["Control", "Framework", "Owner", "Evidence", "Status"].map((h) => (
                <th key={h} style={C.th}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {evidence.map((r) => (
              <tr key={r[0]} style={C.tr}>
                <td style={{ ...C.td, fontWeight: 600, color: "var(--text-strong)" }}>{r[0]}</td>
                <td style={C.td}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)" }}>{r[1]}</span>
                </td>
                <td style={C.td}>
                  <span style={{ fontSize: 13 }}>{r[2]}</span>
                </td>
                <td style={C.td}>
                  <Badge variant="outline">{r[3]}</Badge>
                </td>
                <td style={C.td}>
                  <Badge variant={r[4]} dot>
                    {r[5]}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

/* ============================ PLACEHOLDER VIEW ============================ */
function Placeholder({ title, icon }: { title: string; icon: string }) {
  return (
    <div style={{ ...C.viewPad, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 420 }}>
      <div style={{ textAlign: "center", color: "var(--text-muted)" }}>
        <div style={{ width: 64, height: 64, borderRadius: 14, background: "var(--navy-50)", color: "var(--navy-500)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
          <Icon name={icon} size={30} stroke={1.6} />
        </div>
        <div style={{ font: "600 18px var(--font-sans)", color: "var(--text-strong)", marginBottom: 4 }}>{title}</div>
        <div style={{ fontSize: 14 }}>This module follows the same patterns shown in Dashboard, Identities, and Governance.</div>
      </div>
    </div>
  );
}

/* ============================ ROOT ============================ */
export function Console() {
  const [authed, setAuthed] = useState(false);
  const [view, setView] = useState("dashboard");
  const [person, setPerson] = useState<Person | null>(null);

  if (!authed) return <Login onAuth={() => setAuthed(true)} />;

  const titles: Record<string, string> = {
    dashboard: "Overview",
    identities: "Identities",
    governance: "Governance",
    ot: "OT Security",
    reports: "Reports",
  };
  return (
    <div style={C.shell}>
      <Sidebar
        view={view}
        setView={(v) => {
          setView(v);
          setPerson(null);
        }}
      />
      <div style={C.main}>
        <Topbar title={titles[view]} onLogout={() => setAuthed(false)} />
        <div style={C.scroll}>
          {view === "dashboard" && <Dashboard />}
          {view === "identities" && <Identities onOpen={setPerson} />}
          {view === "governance" && <Governance />}
          {view === "ot" && <Placeholder title="OT Security" icon="cpu" />}
          {view === "reports" && <Placeholder title="Reports" icon="file-text" />}
        </div>
      </div>
      <Drawer person={person} onClose={() => setPerson(null)} />
    </div>
  );
}

/* ============================ STYLES ============================ */
const C: Record<string, CSSProperties> = {
  loginWrap: { minHeight: "100vh", background: "var(--ink-850)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", padding: 24 },
  loginNet: { position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 1px 1px, rgba(90,180,210,0.12) 1px, transparent 0)", backgroundSize: "28px 28px" },
  loginGlow: { position: "absolute", bottom: -160, left: -120, width: 600, height: 600, background: "radial-gradient(circle, rgba(205,232,18,0.14), transparent 62%)", filter: "blur(20px)" },
  loginCard: { position: "relative", zIndex: 2, background: "#fff", borderRadius: 16, padding: 38, width: "min(420px,100%)", boxShadow: "0 40px 90px rgba(0,0,0,0.45)", borderTop: "3px solid var(--lime-400)" },

  shell: { display: "flex", minHeight: "100vh", background: "var(--gray-100)" },
  sidebar: { width: 248, background: "var(--ink-850)", display: "flex", flexDirection: "column", position: "sticky", top: 0, height: "100vh", flex: "0 0 auto" },
  navItem: { width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", marginBottom: 2, background: "none", border: "none", borderRadius: 9, color: "var(--navy-200)", fontSize: 14, fontWeight: 500, fontFamily: "var(--font-sans)", cursor: "pointer", textAlign: "left", transition: "background .12s, color .12s" },
  navItemActive: { background: "rgba(205,232,18,0.12)", color: "var(--lime-400)", fontWeight: 600 },
  navBadge: { marginLeft: "auto", background: "var(--danger-500)", color: "#fff", fontSize: 11, fontWeight: 700, borderRadius: 999, minWidth: 19, height: 19, display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0 5px" },
  sidebarFoot: { display: "flex", alignItems: "center", gap: 10, padding: "16px 18px", borderTop: "1px solid rgba(255,255,255,0.08)" },

  main: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column" },
  topbar: { height: 76, background: "#fff", borderBottom: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", position: "sticky", top: 0, zIndex: 20 },
  search: { display: "flex", alignItems: "center", gap: 9, background: "var(--gray-50)", border: "1px solid var(--border-subtle)", borderRadius: 9, padding: "9px 12px", color: "var(--text-subtle)", fontSize: 13, width: 280 },
  kbd: { marginLeft: "auto", fontFamily: "var(--font-mono)", fontSize: 11, background: "#fff", border: "1px solid var(--border-subtle)", borderRadius: 4, padding: "1px 5px" },
  scroll: { flex: 1, overflow: "auto" },
  viewPad: { padding: 28, maxWidth: 1280, margin: "0 auto" },

  dashGrid: { display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 16, alignItems: "stretch" },
  statRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  findRow: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, padding: "11px 0", borderTop: "1px solid var(--border-subtle)" },

  track: { height: 7, borderRadius: 4, background: "var(--gray-100)", overflow: "hidden" },
  trackDark: { height: 7, borderRadius: 4, background: "rgba(255,255,255,0.10)", overflow: "hidden" },
  fill: { height: "100%", borderRadius: 4 },

  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", padding: "13px 18px", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-muted)", borderBottom: "1px solid var(--border-subtle)", background: "var(--gray-50)" },
  tr: { cursor: "pointer", transition: "background .1s" },
  td: { padding: "13px 18px", borderBottom: "1px solid var(--border-subtle)", verticalAlign: "middle" },

  drawerOverlay: { position: "fixed", inset: 0, background: "rgba(15,18,22,0.5)", backdropFilter: "blur(3px)", zIndex: 50, display: "flex", justifyContent: "flex-end" },
  drawer: { width: "min(460px,100%)", height: "100%", background: "#fff", padding: 26, overflow: "auto", boxShadow: "-20px 0 60px rgba(0,0,0,0.3)", animation: "jsnSlide .26s var(--ease-out)" },
  kv: { background: "var(--gray-50)", borderRadius: 9, padding: "11px 13px" },
  kvK: { fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 3 },
  kvV: { fontSize: 14, fontWeight: 600, color: "var(--text-strong)" },
};

if (typeof document !== "undefined" && !document.getElementById("jsn-console-css")) {
  const st = document.createElement("style");
  st.id = "jsn-console-css";
  st.textContent = `
    @keyframes jsnSlide{ from{ transform:translateX(30px); opacity:0; } to{ transform:none; opacity:1; } }
    tr[style*="cursor: pointer"]:hover{ background:var(--gray-50); }
  `;
  document.head.appendChild(st);
}
