export const PRODUCT_NAME = "Joushen Studio";
export const DESKTOP_LOG_ECHO_ENV = "OD_DESKTOP_LOG_ECHO";
export const WEB_STANDALONE_HOOK_CONFIG_ENV = "OD_TOOLS_PACK_WEB_STANDALONE_HOOK_CONFIG";
export const WEB_STANDALONE_RESOURCE_NAME = "open-design-web-standalone";
export const ELECTRON_BUILDER_ASAR = false;
export const ELECTRON_BUILDER_BUILD_DEPENDENCIES_FROM_SOURCE = false;
export const ELECTRON_BUILDER_NODE_GYP_REBUILD = false;
export const ELECTRON_BUILDER_NPM_REBUILD = false;
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
export const NSIS_INSTALLER_LANGUAGE_BY_WEB_LOCALE = {
  en: "en_US",
  fa: "fa_IR",
  "pt-BR": "pt_BR",
  ru: "ru_RU",
  "zh-CN": "zh_CN",
  "zh-TW": "zh_TW",
} as const;
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
