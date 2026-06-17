export const PRODUCT_NAME = "Joushen Studio";

export const INTERNAL_PACKAGES = [
  { directory: "packages/components", name: "@joushen-studio/components" },
  { directory: "packages/contracts", name: "@joushen-studio/contracts" },
  { directory: "packages/registry-protocol", name: "@joushen-studio/registry-protocol" },
  { directory: "packages/sidecar-proto", name: "@joushen-studio/sidecar-proto" },
  { directory: "packages/launcher-proto", name: "@joushen-studio/launcher-proto" },
  { directory: "packages/sidecar", name: "@joushen-studio/sidecar" },
  { directory: "packages/platform", name: "@joushen-studio/platform" },
  { directory: "packages/download", name: "@joushen-studio/download" },
  { directory: "packages/host", name: "@joushen-studio/host" },
  { directory: "packages/agui-adapter", name: "@joushen-studio/agui-adapter" },
  { directory: "packages/plugin-runtime", name: "@joushen-studio/plugin-runtime" },
  { directory: "packages/diagnostics", name: "@joushen-studio/diagnostics" },
  { directory: "apps/daemon", name: "@joushen-studio/daemon" },
  { directory: "apps/web", name: "@joushen-studio/web" },
  { directory: "apps/desktop", name: "@joushen-studio/desktop" },
  { directory: "apps/packaged", name: "@joushen-studio/packaged" },
] as const;

export const DESKTOP_LOG_ECHO_ENV = "OD_DESKTOP_LOG_ECHO";
export const WEB_STANDALONE_HOOK_CONFIG_ENV = "OD_TOOLS_PACK_WEB_STANDALONE_HOOK_CONFIG";
export const WEB_STANDALONE_RESOURCE_NAME = "open-design-web-standalone";
export const ELECTRON_BUILDER_ASAR = false;
export const ELECTRON_BUILDER_BUILD_DEPENDENCIES_FROM_SOURCE = false;
export const ELECTRON_REBUILD_MODE = "sequential" as const;
export const ELECTRON_REBUILD_NATIVE_MODULES = ["better-sqlite3"] as const;
export const ELECTRON_BUILDER_FILE_PATTERNS = [
  "**/*",
  "!**/node_modules/.bin",
  "!**/node_modules/electron{,/**/*}",
  "!**/*.map",
  "!**/*.tsbuildinfo",
  "!**/.next/cache",
  "!**/.next/cache/**",
  "!**/node_modules/better-sqlite3/build/Release/obj",
  "!**/node_modules/better-sqlite3/build/Release/obj/**",
  "!**/node_modules/better-sqlite3/deps",
  "!**/node_modules/better-sqlite3/deps/**",
] as const;
// Keep Electron native UI resources aligned with the Web UI locale set.
// Electron uses underscore-separated locale ids; its base "es" resource
// covers the app's es-ES dictionary.
export const MAC_ELECTRON_LANGUAGES = [
  "en",
  "de",
  "zh_CN",
  "zh_TW",
  "pt_BR",
  "es",
  "ru",
  "fa",
  "ar",
  "ja",
  "ko",
  "pl",
  "hu",
  "fr",
  "uk",
  "tr",
] as const;
