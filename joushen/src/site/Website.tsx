import { useState, type CSSProperties } from "react";
import { Badge, Button, Card, Icon, Input, Select, Stat } from "../components";

/* Joushen corporate website — faithful recreation of the design-system UI kit.
   Composes the shared DS primitives + Lucide icons. */

const NAV = ["Platform", "Services", "Industries", "Insights", "Company"];

const SERVICES: { icon: string; name: string; desc: string }[] = [
  { icon: "fingerprint", name: "Digital Identity", desc: "Identity is the new perimeter. Lifecycle, access governance, and passwordless trust." },
  { icon: "compass", name: "Cybersecurity Advisory", desc: "Strategy, architecture, and roadmaps led by senior advisors — not checklists." },
  { icon: "scale", name: "Governance, Risk & Compliance", desc: "NCA, SAMA CSF, and PDPL alignment with evidence collected continuously." },
  { icon: "building-2", name: "Critical Infrastructure", desc: "Resilience engineering for the systems the Kingdom depends on." },
  { icon: "cpu", name: "OT Security", desc: "Visibility and control across operational technology and industrial networks." },
  { icon: "sparkles", name: "AI Governance & Security", desc: "Govern, secure, and assure AI systems from model to deployment." },
];

const STATS: { label: string; value: string; unit?: string }[] = [
  { label: "Mean time to detect", value: "4.2", unit: "min" },
  { label: "Identities under management", value: "1.4M" },
  { label: "Frameworks mapped", value: "12" },
  { label: "Saudi-hosted uptime", value: "99.98", unit: "%" },
];

/* ============================ HEADER ============================ */
function Header({ onBrief }: { onBrief: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <header style={S.header}>
      <div style={S.headerInner}>
        <a href="#" style={{ display: "flex", alignItems: "center" }}>
          <img src="/assets/logo/joushen-horizontal-navy.png" alt="Joushen" style={{ height: 30 }} />
        </a>
        <nav style={S.nav} className="jsn-desktop">
          {NAV.map((n) => (
            <a key={n} href="#" style={S.navLink}>
              {n}
              <Icon name="chevron-down" size={15} style={{ opacity: 0.55, marginLeft: 4 }} />
            </a>
          ))}
        </nav>
        <div style={S.headerRight} className="jsn-desktop">
          <a href="#" style={{ ...S.navLink, fontWeight: 600 }}>
            <Icon name="lock-keyhole-open" size={16} style={{ marginRight: 6 }} />
            Client login
          </a>
          <Button variant="primary" size="md" iconRight={<Icon name="arrow-right" size={16} />} onClick={onBrief}>
            Request a briefing
          </Button>
        </div>
        <button className="jsn-mobile" onClick={() => setOpen(!open)} style={S.burger} aria-label="Menu">
          <Icon name={open ? "x" : "menu"} size={24} />
        </button>
      </div>
      {open && (
        <div className="jsn-mobile" style={S.mobileMenu}>
          {NAV.map((n) => (
            <a key={n} href="#" style={S.mobileLink}>
              {n}
            </a>
          ))}
          <Button variant="primary" block onClick={onBrief}>
            Request a briefing
          </Button>
        </div>
      )}
    </header>
  );
}

/* ============================ HERO ============================ */
function Hero({ onBrief }: { onBrief: () => void }) {
  return (
    <section style={S.hero}>
      <div style={S.netbg} aria-hidden="true" />
      <div style={S.heroGlow} aria-hidden="true" />
      <div style={S.heroInner}>
        <div style={S.eyebrowLime}>Digital Trust · Digital Identity</div>
        <h1 style={S.h1}>
          Identity is the new
          <br />
          <span style={{ color: "var(--lime-400)" }}>security perimeter.</span>
        </h1>
        <p style={S.heroSub}>
          Joushen helps Saudi organizations secure identities, strengthen governance, and protect critical
          infrastructure — built for local regulation, hosted in the Kingdom, aligned with Vision 2030.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Button variant="primary" size="lg" iconRight={<Icon name="arrow-right" size={18} />} onClick={onBrief}>
            Request a briefing
          </Button>
          <Button variant="outline" size="lg" className="jsn-hero-ghost">
            Explore the platform
          </Button>
        </div>
        <div style={S.frameworks}>
          <span style={S.fwLabel}>Aligned with</span>
          {["NCA ECC", "SAMA CSF", "PDPL", "Vision 2030"].map((f) => (
            <span key={f} style={S.fwChip}>
              {f}
            </span>
          ))}
        </div>
      </div>
      <FloatingPanel />
    </section>
  );
}

function FloatingPanel() {
  const rows: { k: string; v: string; ok: boolean }[] = [
    { k: "Privileged access", v: "Enforced", ok: true },
    { k: "Identity posture", v: "94 / 100", ok: true },
    { k: "PDPL controls", v: "3 due", ok: false },
  ];
  return (
    <div style={S.panel}>
      <div style={S.panelHead}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--navy-300)" }}>
          Trust Console
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--lime-400)", fontSize: 12, fontWeight: 600 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--lime-400)" }} />
          Live
        </span>
      </div>
      {rows.map((r) => (
        <div key={r.k} style={S.panelRow}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
            <Icon name={r.ok ? "circle-check-big" : "circle-alert"} size={18} style={{ color: r.ok ? "var(--sage-500)" : "var(--warning-500)" }} />
            <span style={{ color: "var(--gray-200)", fontSize: 14 }}>{r.k}</span>
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: r.ok ? "#fff" : "var(--warning-500)" }}>{r.v}</span>
        </div>
      ))}
      <div style={S.panelFoot}>
        <Stat label="Mean time to detect" value="4.2" unit="min" tone="dark" />
      </div>
    </div>
  );
}

/* ============================ SERVICES ============================ */
function Services() {
  return (
    <section style={S.section}>
      <div style={S.container}>
        <SectionHead
          eyebrow="What we do"
          title="Specialized advisory and managed services"
          sub="Seven focused practices, one accountable partner — from boardroom strategy to 24/7 operations."
        />
        <div style={S.serviceGrid}>
          {SERVICES.map((s, i) => (
            <Card key={s.name} variant={i === 0 ? "accent" : "default"} interactive className="jsn-svc">
              <div style={S.svcIcon}>
                <Icon name={s.icon} size={24} stroke={1.75} />
              </div>
              <h3 style={{ font: "600 18px var(--font-sans)", letterSpacing: "-.015em", color: "var(--text-strong)", margin: "0 0 8px" }}>{s.name}</h3>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "var(--text-muted)" }}>{s.desc}</p>
              <a href="#" style={S.svcLink}>
                Learn more <Icon name="arrow-right" size={15} />
              </a>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================ PLATFORM ============================ */
function Platform() {
  const feats: { icon: string; t: string; d: string }[] = [
    { icon: "radar", t: "Continuous assurance", d: "Evidence collected automatically and mapped to every framework you answer to." },
    { icon: "git-branch", t: "Identity lifecycle", d: "Joiner-mover-leaver automation with least-privilege enforced by default." },
    { icon: "activity", t: "Unified posture", d: "One trust score across identity, GRC, and operational technology." },
  ];
  return (
    <section style={{ ...S.section, background: "var(--ink-850)" }}>
      <div style={S.netbgSubtle} aria-hidden="true" />
      <div style={{ ...S.container, position: "relative" }}>
        <div style={S.platformGrid}>
          <div>
            <div style={S.eyebrowLime}>The platform</div>
            <h2 style={{ ...S.h2, color: "#fff" }}>Trust, embedded from strategy to execution.</h2>
            <p style={{ color: "var(--gray-300)", fontSize: 17, lineHeight: 1.65, margin: "0 0 28px", maxWidth: 460 }}>
              The Joushen Trust Console unifies digital identity, governance, and OT security into a single operating
              picture — so leadership sees risk in business terms, not log lines.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {feats.map((f) => (
                <div key={f.t} style={{ display: "flex", gap: 14 }}>
                  <span style={S.featIcon}>
                    <Icon name={f.icon} size={20} stroke={1.75} />
                  </span>
                  <div>
                    <div style={{ color: "#fff", fontWeight: 600, fontSize: 15, marginBottom: 2 }}>{f.t}</div>
                    <div style={{ color: "var(--navy-200)", fontSize: 14, lineHeight: 1.55 }}>{f.d}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 30 }}>
              <Button variant="primary" iconRight={<Icon name="arrow-right" size={16} />}>
                See the Trust Console
              </Button>
            </div>
          </div>
          <ConsoleMock />
        </div>
      </div>
    </section>
  );
}

function ConsoleMock() {
  const bars: [string, number, string][] = [
    ["Identity", 94, "var(--sage-500)"],
    ["Governance", 88, "var(--blue-500)"],
    ["OT Security", 79, "var(--lime-500)"],
    ["AI Assurance", 71, "var(--navy-400)"],
  ];
  return (
    <div style={S.mock}>
      <div style={S.mockBar}>
        <span style={{ display: "flex", gap: 6 }}>
          <i style={S.dot} />
          <i style={S.dot} />
          <i style={S.dot} />
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--navy-300)" }}>console.joushen.sa</span>
      </div>
      <div style={S.mockBody}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 18 }}>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text-muted)" }}>
              Organizational trust score
            </div>
            <div style={{ font: "700 46px var(--font-sans)", letterSpacing: "-.03em", color: "var(--text-strong)" }}>
              92<span style={{ fontSize: 22, color: "var(--lime-500)" }}>/100</span>
            </div>
          </div>
          <Badge variant="success" dot>
            Improving
          </Badge>
        </div>
        <div style={S.barRow}>
          {bars.map(([k, v, c]) => (
            <div key={k} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 5, color: "var(--text-body)" }}>
                <span>{k}</span>
                <span style={{ fontFamily: "var(--font-mono)" }}>{v}</span>
              </div>
              <div style={S.track}>
                <div style={{ ...S.fill, width: v + "%", background: c }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================ STATS BAND ============================ */
function StatsBand() {
  return (
    <section style={{ background: "var(--navy-500)" }}>
      <div style={{ ...S.container, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, padding: "56px 32px" }} className="jsn-stats">
        {STATS.map((s) => (
          <div key={s.label}>
            <Stat label={s.label} value={s.value} unit={s.unit} tone="dark" />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================ CTA ============================ */
function CTA({ onBrief }: { onBrief: () => void }) {
  return (
    <section style={S.section}>
      <div style={S.container}>
        <div style={S.cta}>
          <div style={S.netbgSubtle} aria-hidden="true" />
          <div style={{ position: "relative", maxWidth: 620 }}>
            <div style={S.eyebrowLime}>Trust beyond compliance</div>
            <h2 style={{ ...S.h2, color: "#fff", marginBottom: 14 }}>Securing the future of digital Saudi Arabia.</h2>
            <p style={{ color: "var(--gray-300)", fontSize: 17, lineHeight: 1.6, margin: "0 0 26px" }}>
              Book a 45-minute executive briefing. We'll map your identity and trust posture against the frameworks
              that matter — and where to invest next.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Button variant="primary" size="lg" iconRight={<Icon name="arrow-right" size={18} />} onClick={onBrief}>
                Request a briefing
              </Button>
              <Button variant="outline" size="lg" className="jsn-hero-ghost">
                Download capabilities
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================ FOOTER ============================ */
function Footer() {
  const cols: [string, string[]][] = [
    ["Platform", ["Trust Console", "Digital Identity", "GRC", "OT Security"]],
    ["Services", ["Advisory", "Managed Services", "Assurance", "Awareness"]],
    ["Company", ["About Joushen", "Vision 2030", "Careers", "Contact"]],
  ];
  return (
    <footer style={S.footer}>
      <div style={{ ...S.container, paddingTop: 56, paddingBottom: 40 }}>
        <div style={S.footerGrid}>
          <div style={{ maxWidth: 300 }}>
            <img src="/assets/logo/joushen-horizontal-white.png" alt="Joushen" style={{ height: 26, marginBottom: 16 }} />
            <p style={{ color: "var(--navy-200)", fontSize: 14, lineHeight: 1.6, margin: 0 }}>
              Empowering trust. Enabling digital transformation. A Saudi cybersecurity and digital-trust company.
            </p>
          </div>
          {cols.map(([h, items]) => (
            <div key={h}>
              <div style={S.footHead}>{h}</div>
              {items.map((i) => (
                <a key={i} href="#" style={S.footLink}>
                  {i}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div style={S.footerBottom}>
          <span>© 2026 Joushen. Hosted in the Kingdom of Saudi Arabia.</span>
          <span style={{ display: "flex", gap: 18 }}>
            <a href="#" style={S.footLink}>
              Privacy (PDPL)
            </a>
            <a href="#" style={S.footLink}>
              Terms
            </a>
            <a href="#" style={S.footLink}>
              العربية
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ============================ BRIEFING MODAL ============================ */
function BriefingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div style={S.overlay} onClick={onClose}>
      <div style={S.modal} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text-muted)" }}>
              Executive briefing
            </div>
            <h3 style={{ margin: "4px 0 0", font: "600 22px var(--font-sans)", letterSpacing: "-.015em", color: "var(--text-strong)" }}>Request a briefing</h3>
          </div>
          <button onClick={onClose} style={S.modalClose} aria-label="Close">
            <Icon name="x" size={20} />
          </button>
        </div>
        <p style={{ color: "var(--text-muted)", fontSize: 14, margin: "0 0 20px" }}>
          A senior advisor will reach out within one business day.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Input label="Full name" placeholder="Your name" />
          <Input label="Work email" type="email" placeholder="name@org.gov.sa" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
          <Input label="Organization" placeholder="Entity name" />
          <label className="jsn-field" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-strong)" }}>Area of interest</span>
            <Select options={["Digital Identity", "GRC", "OT Security", "AI Governance"]} />
          </label>
        </div>
        <div style={{ marginTop: 24, display: "flex", justifyContent: "flex-end", gap: 12 }}>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" iconRight={<Icon name="arrow-right" size={16} />} onClick={onClose}>
            Submit request
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ============================ SHARED ============================ */
function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div style={{ maxWidth: 640, marginBottom: 44 }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--sage-500)", marginBottom: 12 }}>
        {eyebrow}
      </div>
      <h2 style={S.h2}>{title}</h2>
      {sub && <p style={{ color: "var(--text-muted)", fontSize: 17, lineHeight: 1.6, margin: "14px 0 0" }}>{sub}</p>}
    </div>
  );
}

export function Website() {
  const [brief, setBrief] = useState(false);
  const onBrief = () => setBrief(true);
  return (
    <div>
      <Header onBrief={onBrief} />
      <Hero onBrief={onBrief} />
      <Services />
      <Platform />
      <StatsBand />
      <CTA onBrief={onBrief} />
      <Footer />
      <BriefingModal open={brief} onClose={() => setBrief(false)} />
    </div>
  );
}

/* ============================ STYLES ============================ */
const S: Record<string, CSSProperties> = {
  header: { position: "sticky", top: 0, zIndex: 40, background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--border-subtle)" },
  headerInner: { maxWidth: 1320, margin: "0 auto", padding: "0 32px", height: 70, display: "flex", alignItems: "center", justifyContent: "space-between" },
  nav: { display: "flex", gap: 28 },
  navLink: { display: "inline-flex", alignItems: "center", color: "var(--navy-700)", fontSize: 14, fontWeight: 500, textDecoration: "none" },
  headerRight: { display: "flex", alignItems: "center", gap: 18 },
  burger: { background: "none", border: "none", color: "var(--navy-700)", cursor: "pointer", display: "none", padding: 6 },
  mobileMenu: { display: "flex", flexDirection: "column", gap: 10, padding: "16px 32px 22px", borderTop: "1px solid var(--border-subtle)", background: "#fff" },
  mobileLink: { color: "var(--navy-700)", fontSize: 16, fontWeight: 500, textDecoration: "none", padding: "8px 0" },

  hero: { position: "relative", background: "var(--ink-850)", overflow: "hidden", padding: "92px 32px 100px" },
  heroInner: { position: "relative", maxWidth: 1320, margin: "0 auto", zIndex: 2 },
  netbg: { position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 1px 1px, rgba(90,180,210,0.12) 1px, transparent 0)", backgroundSize: "26px 26px", opacity: 0.8 },
  netbgSubtle: { position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 1px 1px, rgba(205,232,18,0.08) 1px, transparent 0)", backgroundSize: "30px 30px" },
  heroGlow: { position: "absolute", top: -120, right: -80, width: 560, height: 560, background: "radial-gradient(circle, rgba(205,232,18,0.16), transparent 62%)", filter: "blur(20px)", zIndex: 1 },
  eyebrowLime: { fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--lime-400)", marginBottom: 18 },
  h1: { font: "700 66px/1.02 var(--font-sans)", letterSpacing: "-.03em", color: "#fff", margin: "0 0 22px", maxWidth: 760 },
  heroSub: { color: "var(--gray-300)", fontSize: 19, lineHeight: 1.6, maxWidth: 540, margin: "0 0 32px" },
  frameworks: { display: "flex", alignItems: "center", gap: 12, marginTop: 46, flexWrap: "wrap" },
  fwLabel: { fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--navy-300)" },
  fwChip: { padding: "6px 12px", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 6, color: "var(--gray-200)", fontSize: 13, fontWeight: 500 },

  panel: { position: "absolute", right: "max(32px, calc(50% - 660px + 32px))", top: 120, width: 340, background: "rgba(29,36,43,0.86)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 14, padding: 18, zIndex: 3, boxShadow: "0 30px 60px rgba(0,0,0,0.4)" },
  panelHead: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, paddingBottom: 14, borderBottom: "1px solid rgba(255,255,255,0.08)" },
  panelRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0" },
  panelFoot: { marginTop: 12, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.08)" },

  section: { padding: "96px 32px", position: "relative", overflow: "hidden" },
  container: { maxWidth: 1320, margin: "0 auto", position: "relative" },
  h2: { font: "600 40px/1.1 var(--font-sans)", letterSpacing: "-.02em", color: "var(--text-strong)", margin: 0 },
  serviceGrid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 },
  svcIcon: { width: 48, height: 48, borderRadius: 10, background: "var(--navy-50)", color: "var(--navy-600)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 },
  svcLink: { display: "inline-flex", alignItems: "center", gap: 6, marginTop: 16, color: "var(--navy-500)", fontSize: 14, fontWeight: 600, textDecoration: "none" },

  platformGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" },
  featIcon: { flex: "0 0 auto", width: 40, height: 40, borderRadius: 9, background: "rgba(205,232,18,0.12)", color: "var(--lime-400)", display: "flex", alignItems: "center", justifyContent: "center" },
  mock: { background: "#fff", borderRadius: 14, boxShadow: "0 40px 80px rgba(0,0,0,0.4)", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" },
  mockBar: { height: 38, background: "var(--gray-50)", borderBottom: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 14px" },
  dot: { width: 9, height: 9, borderRadius: "50%", background: "var(--gray-300)", display: "inline-block" },
  mockBody: { padding: 24 },
  barRow: { marginTop: 6 },
  track: { height: 7, borderRadius: 4, background: "var(--gray-100)", overflow: "hidden" },
  fill: { height: "100%", borderRadius: 4 },

  cta: { position: "relative", overflow: "hidden", background: "var(--navy-600)", borderRadius: 24, padding: "64px 56px", borderTop: "3px solid var(--lime-400)" },

  footer: { background: "var(--ink-850)" },
  footerGrid: { display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 40 },
  footHead: { color: "#fff", fontSize: 13, fontWeight: 600, marginBottom: 14, letterSpacing: ".02em" },
  footLink: { display: "block", color: "var(--navy-200)", fontSize: 14, textDecoration: "none", padding: "6px 0" },
  footerBottom: { marginTop: 44, paddingTop: 22, borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", color: "var(--navy-300)", fontSize: 13, flexWrap: "wrap", gap: 12 },

  overlay: { position: "fixed", inset: 0, background: "rgba(15,18,22,0.6)", backdropFilter: "blur(4px)", zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 },
  modal: { background: "#fff", borderRadius: 16, padding: 30, width: "min(560px,100%)", boxShadow: "var(--shadow-xl)", borderTop: "3px solid var(--lime-400)" },
  modalClose: { background: "var(--gray-100)", border: "none", borderRadius: 8, width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--text-body)" },
};

/* responsive helpers injected once */
if (typeof document !== "undefined" && !document.getElementById("jsn-site-css")) {
  const st = document.createElement("style");
  st.id = "jsn-site-css";
  st.textContent = `
    .jsn-mobile{ display:none; }
    .jsn-hero-ghost{ color:#fff !important; border-color:rgba(255,255,255,0.25) !important; background:transparent !important; }
    .jsn-hero-ghost:hover{ background:rgba(255,255,255,0.08) !important; }
    @media (max-width: 1080px){
      .jsn-desktop{ display:none !important; }
      .jsn-mobile{ display:flex !important; }
    }
  `;
  document.head.appendChild(st);
}
