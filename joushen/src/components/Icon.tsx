import {
  Activity,
  ArrowRight,
  Bell,
  Building2,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  CircleCheckBig,
  Compass,
  Cpu,
  FileText,
  Fingerprint,
  GitBranch,
  KeyRound,
  LayoutDashboard,
  LockKeyhole,
  LockKeyholeOpen,
  LogOut,
  Menu,
  Plus,
  Radar,
  Scale,
  Search,
  Settings,
  Sparkles,
  TriangleAlert,
  X,
  type LucideIcon,
} from "lucide-react";
import type { CSSProperties } from "react";

/**
 * Explicit registry of the Lucide icons used across the Joushen surfaces, keyed
 * by their kebab-case name (matching the original prototype's `data-lucide`
 * attributes). Keeping it explicit keeps the bundle tree-shakeable instead of
 * pulling in the full icon set.
 */
const REGISTRY: Record<string, LucideIcon> = {
  activity: Activity,
  "arrow-right": ArrowRight,
  bell: Bell,
  "building-2": Building2,
  "chevron-down": ChevronDown,
  "chevron-right": ChevronRight,
  "circle-alert": CircleAlert,
  "circle-check-big": CircleCheckBig,
  compass: Compass,
  cpu: Cpu,
  "file-text": FileText,
  fingerprint: Fingerprint,
  "git-branch": GitBranch,
  "key-round": KeyRound,
  "layout-dashboard": LayoutDashboard,
  "lock-keyhole": LockKeyhole,
  "lock-keyhole-open": LockKeyholeOpen,
  "log-out": LogOut,
  menu: Menu,
  plus: Plus,
  radar: Radar,
  scale: Scale,
  search: Search,
  settings: Settings,
  sparkles: Sparkles,
  "triangle-alert": TriangleAlert,
  x: X,
};

export function Icon({
  name,
  size = 20,
  stroke = 2,
  style,
  className,
}: {
  name: string;
  size?: number;
  stroke?: number;
  style?: CSSProperties;
  className?: string;
}) {
  const Cmp = REGISTRY[name];
  if (!Cmp) return null;
  return <Cmp size={size} strokeWidth={stroke} style={style} className={className} />;
}
