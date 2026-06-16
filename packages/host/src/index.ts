export const OPEN_DESIGN_HOST_GLOBAL = "__od__";
export const OPEN_DESIGN_HOST_VERSION = 2;

export const OPEN_DESIGN_HOST_CLIENT_TYPES = Object.freeze({
  DESKTOP: "desktop",
} as const);

export type JoushenStudioHostClientType =
  (typeof OPEN_DESIGN_HOST_CLIENT_TYPES)[keyof typeof OPEN_DESIGN_HOST_CLIENT_TYPES];

export type JoushenStudioHostClient = {
  // BCP-47 locale string (e.g. "zh-CN", "pt-BR") the host process read from
  // the OS at startup. The renderer uses this so the packaged desktop app
  // can follow the OS language even when Chromium's built-in
  // `navigator.language` would have defaulted to en-US.
  osLocale?: string;
  platform?: string;
  type: JoushenStudioHostClientType;
};

export type JoushenStudioHostFailure = {
  details?: unknown;
  ok: false;
  reason: string;
};

export type JoushenStudioHostActionResult =
  | { ok: true }
  | JoushenStudioHostFailure;

export type JoushenStudioHostProjectImportInit = {
  designSystemId?: string | null;
  name?: string;
  skillId?: string | null;
};

export type JoushenStudioHostProjectImportSuccess = {
  conversationId: string;
  entryFile: string | null;
  ok: true;
  projectId: string;
};

export type JoushenStudioHostProjectImportResult =
  | JoushenStudioHostProjectImportSuccess
  | {
      canceled: true;
      ok: false;
    }
  | JoushenStudioHostFailure;

export type JoushenStudioHostProjectReplaceWorkingDirSuccess = {
  baseDir: string;
  entryFile: string | null;
  ok: true;
};

export type JoushenStudioHostProjectReplaceWorkingDirResult =
  | JoushenStudioHostProjectReplaceWorkingDirSuccess
  | {
      canceled: true;
      ok: false;
    }
  | JoushenStudioHostFailure;

export type JoushenStudioHostPickWorkingDirSuccess = {
  baseDir: string;
  ok: true;
  // Single-use HMAC token (minted by the host main process for `baseDir`)
  // that the renderer threads into POST /api/projects/:id/working-dir once
  // the project exists. Lets the Home flow pick a folder before the project
  // is created without exposing the daemon's desktop-auth gate.
  token: string;
};

export type JoushenStudioHostPickWorkingDirResult =
  | JoushenStudioHostPickWorkingDirSuccess
  | {
      canceled: true;
      ok: false;
    }
  | JoushenStudioHostFailure;

export type JoushenStudioHostPdfPrintOptions = {
  deck?: boolean;
};

export type JoushenStudioHostCaptureClip = { x: number; y: number; width: number; height: number };
export type JoushenStudioHostCaptureOptions = { clip?: JoushenStudioHostCaptureClip };
export type JoushenStudioHostCaptureSuccess = { dataUrl: string; h: number; ok: true; w: number };
export type JoushenStudioHostCaptureResult = JoushenStudioHostCaptureSuccess | JoushenStudioHostFailure;

export type JoushenStudioHostBrowserClearDataOptions = {
  cookies?: boolean;
  storage?: boolean;
};

export const OPEN_DESIGN_HOST_UPDATER_ACTIONS = Object.freeze({
  CHECK: "check",
  DOWNLOAD: "download",
  INSTALL: "install",
  QUIT: "quit",
  STATUS: "status",
} as const);

export type JoushenStudioHostUpdaterAction =
  (typeof OPEN_DESIGN_HOST_UPDATER_ACTIONS)[keyof typeof OPEN_DESIGN_HOST_UPDATER_ACTIONS];
type JoushenStudioHostUpdaterStatusAction = Exclude<
  JoushenStudioHostUpdaterAction,
  typeof OPEN_DESIGN_HOST_UPDATER_ACTIONS.QUIT
>;

export const OPEN_DESIGN_HOST_UPDATER_STATES = Object.freeze({
  AVAILABLE: "available",
  CHECKING: "checking",
  DOWNLOADED: "downloaded",
  DOWNLOADING: "downloading",
  ERROR: "error",
  IDLE: "idle",
  INSTALLING: "installing",
  NOT_AVAILABLE: "not-available",
  UNSUPPORTED: "unsupported",
} as const);

export type JoushenStudioHostUpdaterState =
  (typeof OPEN_DESIGN_HOST_UPDATER_STATES)[keyof typeof OPEN_DESIGN_HOST_UPDATER_STATES];

export type JoushenStudioHostUpdaterMode = "js-incremental" | "package-launcher";
export type JoushenStudioHostUpdaterChannel = "beta" | "nightly" | "preview" | "stable";

export type JoushenStudioHostUpdaterActionOptions = {
  payload?: Record<string, unknown>;
};

export type JoushenStudioHostUpdaterCapabilitySet = {
  canApplyInPlace: boolean;
  canDownload: boolean;
  canOpenInstaller: boolean;
  requiresManualInstall: boolean;
};

export type JoushenStudioHostUpdaterPathSnapshot = {
  downloadRoot?: string;
  manifestPath?: string;
};

export type JoushenStudioHostUpdaterChecksumSnapshot = {
  algorithm: "sha256" | "sha512";
  url?: string;
  value?: string;
};

export type JoushenStudioHostUpdaterArtifactSnapshot = {
  name?: string;
  platformKey?: string;
  size?: number;
  type?: string;
  url: string;
};

export type JoushenStudioHostUpdaterProgressSnapshot = {
  receivedBytes: number;
  totalBytes?: number;
};

export type JoushenStudioHostUpdaterErrorSnapshot = {
  code: string;
  details?: unknown;
  message: string;
};

export type JoushenStudioHostUpdaterInstallResult = {
  activeVersion?: string;
  artifactPath?: string;
  dryRun?: boolean;
  helperLogPath?: string;
  launcherRuntimePath?: string;
  launchPath?: string;
  openedAt: string;
  path: string;
};

export type JoushenStudioHostUpdaterReleaseSnapshot = {
  arch: string;
  artifact: JoushenStudioHostUpdaterArtifactSnapshot;
  checksum: JoushenStudioHostUpdaterChecksumSnapshot;
  channel: JoushenStudioHostUpdaterChannel;
  downloadedAt: string;
  key: string;
  metadata?: Record<string, unknown>;
  path: string;
  platformKey: string;
  version: string;
};

export type JoushenStudioHostUpdaterIncomingSnapshot = {
  arch: string;
  artifact: JoushenStudioHostUpdaterArtifactSnapshot;
  channel: JoushenStudioHostUpdaterChannel;
  key?: string;
  metadata?: Record<string, unknown>;
  progress?: JoushenStudioHostUpdaterProgressSnapshot;
  startedAt: string;
  version: string;
};

export type JoushenStudioHostUpdaterCacheLifecycleTrigger = "cold-start" | "next-version-ready";

export type JoushenStudioHostUpdaterReleaseLifecycleState =
  | "cleanup-deferred"
  | "cleanup-removed"
  | "deprecated"
  | "retained"
  | "unknown";

export type JoushenStudioHostUpdaterCacheLifecycleSummary = {
  lastRunAt?: string;
  lastTrigger?: JoushenStudioHostUpdaterCacheLifecycleTrigger;
  platform: string;
  releases: {
    cleanupDeferred: number;
    cleanupRemoved: number;
    deprecated: number;
    errors: number;
    retained: number;
    total: number;
    unknown: number;
  };
};

export type JoushenStudioHostUpdaterCacheSnapshot = {
  lifecycle?: JoushenStudioHostUpdaterCacheLifecycleSummary;
};

export type JoushenStudioHostUpdaterStatusSnapshot = {
  active?: JoushenStudioHostUpdaterReleaseSnapshot;
  arch: string;
  artifact?: JoushenStudioHostUpdaterArtifactSnapshot;
  artifactUrl?: string;
  availableVersion?: string;
  cache?: JoushenStudioHostUpdaterCacheSnapshot;
  capabilities: JoushenStudioHostUpdaterCapabilitySet;
  channel: JoushenStudioHostUpdaterChannel;
  checksum?: JoushenStudioHostUpdaterChecksumSnapshot;
  currentVersion: string;
  downloadPath?: string;
  enabled: boolean;
  error?: JoushenStudioHostUpdaterErrorSnapshot;
  incoming?: JoushenStudioHostUpdaterIncomingSnapshot;
  installResult?: JoushenStudioHostUpdaterInstallResult;
  lastCheckedAt?: string;
  metadata?: Record<string, unknown>;
  mode: JoushenStudioHostUpdaterMode;
  paths?: JoushenStudioHostUpdaterPathSnapshot;
  platform: string;
  progress?: JoushenStudioHostUpdaterProgressSnapshot;
  state: JoushenStudioHostUpdaterState;
  supported: boolean;
};

export type JoushenStudioHostUpdaterResult =
  | { ok: true; status: JoushenStudioHostUpdaterStatusSnapshot }
  | JoushenStudioHostFailure;

export type JoushenStudioHostUpdaterStatusListener = (status: JoushenStudioHostUpdaterStatusSnapshot) => void;

export type JoushenStudioHostBridge = {
  browser: {
    clearData(options?: JoushenStudioHostBrowserClearDataOptions): Promise<JoushenStudioHostActionResult>;
  };
  capture: {
    page(options?: JoushenStudioHostCaptureOptions): Promise<JoushenStudioHostCaptureResult>;
  };
  client: JoushenStudioHostClient;
  pdf: {
    print(html: string, nonce?: string, options?: JoushenStudioHostPdfPrintOptions): Promise<JoushenStudioHostActionResult>;
  };
  pet: {
    setVisible(visible: boolean): void;
  };
  project: {
    pickAndImport(init?: JoushenStudioHostProjectImportInit): Promise<JoushenStudioHostProjectImportResult>;
    pickAndReplaceWorkingDir(projectId: string): Promise<JoushenStudioHostProjectReplaceWorkingDirResult>;
    // Optional so older host builds still satisfy the bridge shape; callers
    // must feature-detect before invoking.
    pickWorkingDir?(): Promise<JoushenStudioHostPickWorkingDirResult>;
  };
  shell: {
    openExternal(url: string): Promise<JoushenStudioHostActionResult>;
    openPath(projectId: string): Promise<JoushenStudioHostActionResult>;
  };
  updater: {
    check(options?: JoushenStudioHostUpdaterActionOptions): Promise<JoushenStudioHostUpdaterStatusSnapshot>;
    download(options?: JoushenStudioHostUpdaterActionOptions): Promise<JoushenStudioHostUpdaterStatusSnapshot>;
    install(options?: JoushenStudioHostUpdaterActionOptions): Promise<JoushenStudioHostUpdaterStatusSnapshot>;
    quit(options?: JoushenStudioHostUpdaterActionOptions): Promise<JoushenStudioHostActionResult>;
    status(options?: JoushenStudioHostUpdaterActionOptions): Promise<JoushenStudioHostUpdaterStatusSnapshot>;
    subscribe(listener: JoushenStudioHostUpdaterStatusListener): () => void;
  };
  version: typeof OPEN_DESIGN_HOST_VERSION;
};

export type JoushenStudioHostGlobalScope = Record<string, unknown> & {
  window?: unknown;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value != null && !Array.isArray(value);
}

function failure(reason: string, details?: unknown): JoushenStudioHostFailure {
  return {
    ...(details === undefined ? {} : { details }),
    ok: false,
    reason,
  };
}

function hasFunction(record: Record<string, unknown>, key: string): boolean {
  return typeof record[key] === "function";
}

export function isJoushenStudioHostBridge(value: unknown): value is JoushenStudioHostBridge {
  if (!isRecord(value)) return false;
  if (value.version !== OPEN_DESIGN_HOST_VERSION) return false;
  const client = value.client;
  if (!isRecord(client) || client.type !== OPEN_DESIGN_HOST_CLIENT_TYPES.DESKTOP) return false;
  if (client.platform != null && typeof client.platform !== "string") return false;
  if (client.osLocale != null && typeof client.osLocale !== "string") return false;

  const shell = value.shell;
  if (!isRecord(shell) || !hasFunction(shell, "openExternal") || !hasFunction(shell, "openPath")) return false;

  const browser = value.browser;
  if (!isRecord(browser) || !hasFunction(browser, "clearData")) return false;

  const capture = value.capture;
  if (!isRecord(capture) || !hasFunction(capture, "page")) return false;

  const project = value.project;
  if (
    !isRecord(project) ||
    !hasFunction(project, "pickAndImport") ||
    !hasFunction(project, "pickAndReplaceWorkingDir")
  ) {
    return false;
  }

  const pdf = value.pdf;
  if (!isRecord(pdf) || !hasFunction(pdf, "print")) return false;

  const pet = value.pet;
  if (!isRecord(pet) || !hasFunction(pet, "setVisible")) return false;

  const updater = value.updater;
  if (
    !isRecord(updater) ||
    !hasFunction(updater, "status") ||
    !hasFunction(updater, "check") ||
    !hasFunction(updater, "download") ||
    !hasFunction(updater, "install") ||
    !hasFunction(updater, "quit") ||
    !hasFunction(updater, "subscribe")
  ) {
    return false;
  }

  return true;
}

/**
 * Converts a privileged host adapter's raw project-import result into the
 * host-owned renderer contract. The adapter may internally call daemon APIs,
 * but only project identifiers cross the host bridge.
 */
export function normalizeJoushenStudioHostProjectImportResult(input: unknown): JoushenStudioHostProjectImportResult {
  if (!isRecord(input)) {
    return failure("desktop import returned an invalid response", input);
  }
  if (input.ok !== true) {
    if (input.canceled === true) return { canceled: true, ok: false };
    const reason = typeof input.reason === "string" && input.reason.length > 0
      ? input.reason
      : "unknown failure";
    return failure(reason, input.details);
  }

  const response = input.response;
  if (!isRecord(response)) {
    return failure("daemon import response was not an object", response);
  }
  const project = response.project;
  const rawProjectId = isRecord(project) ? project.id : null;
  const projectId = typeof rawProjectId === "string" ? rawProjectId : null;
  const conversationId = typeof response.conversationId === "string" ? response.conversationId : null;
  const entryFile =
    typeof response.entryFile === "string" || response.entryFile === null
      ? response.entryFile
      : undefined;
  if (projectId == null || conversationId == null || entryFile === undefined) {
    return failure("daemon import response did not include host project identifiers", response);
  }

  return {
    conversationId,
    entryFile,
    ok: true,
    projectId,
  };
}

export function normalizeJoushenStudioHostProjectReplaceWorkingDirResult(
  input: unknown,
): JoushenStudioHostProjectReplaceWorkingDirResult {
  if (!isRecord(input)) {
    return failure("desktop working-dir replace returned an invalid response", input);
  }
  if (input.ok !== true) {
    if (input.canceled === true) return { canceled: true, ok: false };
    const reason = typeof input.reason === "string" && input.reason.length > 0
      ? input.reason
      : "unknown failure";
    return failure(reason, input.details);
  }

  const response = input.response;
  if (!isRecord(response)) {
    return failure("daemon working-dir response was not an object", response);
  }
  const baseDir = typeof response.baseDir === "string" ? response.baseDir : null;
  const entryFile = typeof response.entryFile === "string" ? response.entryFile : null;
  if (baseDir == null) {
    return failure("daemon working-dir response did not include baseDir", response);
  }

  return { baseDir, entryFile, ok: true };
}

export function normalizeJoushenStudioHostPickWorkingDirResult(
  input: unknown,
): JoushenStudioHostPickWorkingDirResult {
  if (!isRecord(input)) {
    return failure("desktop working-dir pick returned an invalid response", input);
  }
  if (input.ok !== true) {
    if (input.canceled === true) return { canceled: true, ok: false };
    const reason = typeof input.reason === "string" && input.reason.length > 0
      ? input.reason
      : "unknown failure";
    return failure(reason, input.details);
  }
  const baseDir = typeof input.baseDir === "string" ? input.baseDir : null;
  const token = typeof input.token === "string" ? input.token : null;
  if (baseDir == null || token == null) {
    return failure("desktop working-dir pick did not include baseDir and token", input);
  }
  return { baseDir, ok: true, token };
}

function candidateFromScope(scope: JoushenStudioHostGlobalScope): unknown {
  if (OPEN_DESIGN_HOST_GLOBAL in scope) return scope[OPEN_DESIGN_HOST_GLOBAL];
  const windowValue = scope.window;
  if (isRecord(windowValue) && OPEN_DESIGN_HOST_GLOBAL in windowValue) {
    return windowValue[OPEN_DESIGN_HOST_GLOBAL];
  }
  return undefined;
}

export function getJoushenStudioHost(scope: JoushenStudioHostGlobalScope = globalThis): JoushenStudioHostBridge | null {
  const candidate = candidateFromScope(scope);
  return isJoushenStudioHostBridge(candidate) ? candidate : null;
}

export function isJoushenStudioHostAvailable(scope: JoushenStudioHostGlobalScope = globalThis): boolean {
  return getJoushenStudioHost(scope) != null;
}

export function detectJoushenStudioHostClientType(scope: JoushenStudioHostGlobalScope = globalThis): JoushenStudioHostClientType | "web" {
  return getJoushenStudioHost(scope)?.client.type ?? "web";
}

function unavailable(reason: string): JoushenStudioHostFailure {
  return failure(reason);
}

export async function openHostExternalUrl(url: string, scope: JoushenStudioHostGlobalScope = globalThis): Promise<JoushenStudioHostActionResult> {
  const host = getJoushenStudioHost(scope);
  if (host == null) return unavailable("Joushen Studio host is not available");
  try {
    return await host.shell.openExternal(url);
  } catch (error) {
    return unavailable(error instanceof Error ? error.message : String(error));
  }
}

export async function openHostProjectPath(projectId: string, scope: JoushenStudioHostGlobalScope = globalThis): Promise<JoushenStudioHostActionResult> {
  const host = getJoushenStudioHost(scope);
  if (host == null) return unavailable("Joushen Studio host is not available");
  try {
    return await host.shell.openPath(projectId);
  } catch (error) {
    return unavailable(error instanceof Error ? error.message : String(error));
  }
}

export async function clearHostBrowserData(
  options?: JoushenStudioHostBrowserClearDataOptions,
  scope: JoushenStudioHostGlobalScope = globalThis,
): Promise<JoushenStudioHostActionResult> {
  const host = getJoushenStudioHost(scope);
  if (host == null) return unavailable("Joushen Studio host is not available");
  try {
    return await host.browser.clearData(options);
  } catch (error) {
    return unavailable(error instanceof Error ? error.message : String(error));
  }
}

export async function captureHostPage(
  options?: JoushenStudioHostCaptureOptions,
  scope: JoushenStudioHostGlobalScope = globalThis,
): Promise<JoushenStudioHostCaptureResult> {
  const host = getJoushenStudioHost(scope);
  if (host == null) return unavailable("Joushen Studio host is not available");
  try {
    return await host.capture.page(options);
  } catch (error) {
    return unavailable(error instanceof Error ? error.message : String(error));
  }
}

export async function pickAndImportHostProject(
  init?: JoushenStudioHostProjectImportInit,
  scope: JoushenStudioHostGlobalScope = globalThis,
): Promise<JoushenStudioHostProjectImportResult> {
  const host = getJoushenStudioHost(scope);
  if (host == null) return unavailable("Joushen Studio host is not available");
  try {
    return await host.project.pickAndImport(init);
  } catch (error) {
    return unavailable(error instanceof Error ? error.message : String(error));
  }
}

export async function pickAndReplaceHostProjectWorkingDir(
  projectId: string,
  scope: JoushenStudioHostGlobalScope = globalThis,
): Promise<JoushenStudioHostProjectReplaceWorkingDirResult> {
  const host = getJoushenStudioHost(scope);
  if (host == null) return unavailable("Joushen Studio host is not available");
  try {
    return await host.project.pickAndReplaceWorkingDir(projectId);
  } catch (error) {
    return unavailable(error instanceof Error ? error.message : String(error));
  }
}

// Picks a folder via the host's native dialog and returns the chosen path
// plus a single-use token, WITHOUT touching any project. The Home flow uses
// this to let the user choose a working directory before the project exists;
// the token is later spent on POST /api/projects/:id/working-dir.
export async function pickHostWorkingDir(
  scope: JoushenStudioHostGlobalScope = globalThis,
): Promise<JoushenStudioHostPickWorkingDirResult> {
  const host = getJoushenStudioHost(scope);
  if (host == null) return unavailable("Joushen Studio host is not available");
  if (typeof host.project.pickWorkingDir !== "function") {
    return unavailable("host build does not support pickWorkingDir");
  }
  try {
    return await host.project.pickWorkingDir();
  } catch (error) {
    return unavailable(error instanceof Error ? error.message : String(error));
  }
}

export async function printHostPdf(
  html: string,
  nonce?: string,
  options?: JoushenStudioHostPdfPrintOptions,
  scope: JoushenStudioHostGlobalScope = globalThis,
): Promise<JoushenStudioHostActionResult> {
  const host = getJoushenStudioHost(scope);
  if (host == null) return unavailable("Joushen Studio host is not available");
  try {
    return await host.pdf.print(html, nonce, options);
  } catch (error) {
    return unavailable(error instanceof Error ? error.message : String(error));
  }
}

export function setHostPetVisible(visible: boolean, scope: JoushenStudioHostGlobalScope = globalThis): JoushenStudioHostActionResult {
  const host = getJoushenStudioHost(scope);
  if (host == null) return unavailable("Joushen Studio host is not available");
  try {
    host.pet.setVisible(visible);
    return { ok: true };
  } catch (error) {
    return unavailable(error instanceof Error ? error.message : String(error));
  }
}

async function runHostUpdaterAction(
  action: JoushenStudioHostUpdaterStatusAction,
  options?: JoushenStudioHostUpdaterActionOptions,
  scope: JoushenStudioHostGlobalScope = globalThis,
): Promise<JoushenStudioHostUpdaterResult> {
  const host = getJoushenStudioHost(scope);
  if (host == null) return unavailable("Joushen Studio host is not available");
  try {
    return {
      ok: true,
      status: await host.updater[action](options),
    };
  } catch (error) {
    return unavailable(error instanceof Error ? error.message : String(error));
  }
}

export async function getHostUpdaterStatus(
  options?: JoushenStudioHostUpdaterActionOptions,
  scope: JoushenStudioHostGlobalScope = globalThis,
): Promise<JoushenStudioHostUpdaterResult> {
  return await runHostUpdaterAction(OPEN_DESIGN_HOST_UPDATER_ACTIONS.STATUS, options, scope);
}

export async function checkHostUpdater(
  options?: JoushenStudioHostUpdaterActionOptions,
  scope: JoushenStudioHostGlobalScope = globalThis,
): Promise<JoushenStudioHostUpdaterResult> {
  return await runHostUpdaterAction(OPEN_DESIGN_HOST_UPDATER_ACTIONS.CHECK, options, scope);
}

export async function downloadHostUpdater(
  options?: JoushenStudioHostUpdaterActionOptions,
  scope: JoushenStudioHostGlobalScope = globalThis,
): Promise<JoushenStudioHostUpdaterResult> {
  return await runHostUpdaterAction(OPEN_DESIGN_HOST_UPDATER_ACTIONS.DOWNLOAD, options, scope);
}

export async function installHostUpdater(
  options?: JoushenStudioHostUpdaterActionOptions,
  scope: JoushenStudioHostGlobalScope = globalThis,
): Promise<JoushenStudioHostUpdaterResult> {
  return await runHostUpdaterAction(OPEN_DESIGN_HOST_UPDATER_ACTIONS.INSTALL, options, scope);
}

export async function quitHostAfterUpdaterInstallerOpen(
  options?: JoushenStudioHostUpdaterActionOptions,
  scope: JoushenStudioHostGlobalScope = globalThis,
): Promise<JoushenStudioHostActionResult> {
  const host = getJoushenStudioHost(scope);
  if (host == null) return unavailable("Joushen Studio host is not available");
  try {
    return await host.updater.quit(options);
  } catch (error) {
    return unavailable(error instanceof Error ? error.message : String(error));
  }
}

export function subscribeHostUpdater(
  listener: JoushenStudioHostUpdaterStatusListener,
  scope: JoushenStudioHostGlobalScope = globalThis,
): () => void {
  const host = getJoushenStudioHost(scope);
  if (host == null) return () => undefined;
  try {
    return host.updater.subscribe(listener);
  } catch {
    return () => undefined;
  }
}
