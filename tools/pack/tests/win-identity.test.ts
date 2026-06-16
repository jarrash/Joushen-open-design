import { readFile } from "node:fs/promises";

import { describe, expect, it } from "vitest";

import { resolveWinInstallIdentity } from "../src/win/identity.js";

describe("resolveWinInstallIdentity", () => {
  it("keeps the default namespace on the canonical Windows display name", () => {
    expect(resolveWinInstallIdentity({ namespace: "default" })).toMatchObject({
      displayName: "Joushen Studio",
      shortcutName: "Joushen Studio.lnk",
      uninstallerName: "Uninstall Joushen Studio.exe",
    });
  });

  it("uses the canonical Windows display name for stable release namespaces", () => {
    expect(resolveWinInstallIdentity({ namespace: "release-stable-win" })).toMatchObject({
      appPathsKey: "Software\\Microsoft\\Windows\\CurrentVersion\\App Paths\\Joushen Studio.exe",
      displayName: "Joushen Studio",
      registryKey: "Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Joushen Studio-release-stable-win",
      shortcutName: "Joushen Studio.lnk",
      uninstallerName: "Uninstall Joushen Studio.exe",
    });
  });

  it("uses first-class beta display identity for beta release namespaces", () => {
    expect(resolveWinInstallIdentity({ namespace: "release-beta-win" })).toMatchObject({
      appPathsKey: "Software\\Microsoft\\Windows\\CurrentVersion\\App Paths\\Joushen Studio Beta.exe",
      displayName: "Joushen Studio Beta",
      registryKey: "Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Joushen Studio-release-beta-win",
      shortcutName: "Joushen Studio Beta.lnk",
      uninstallerName: "Uninstall Joushen Studio Beta.exe",
    });
  });

  it("keeps non-release beta-like namespaces isolated from the real beta channel identity", () => {
    expect(resolveWinInstallIdentity({ namespace: "beta-local-flow" })).toMatchObject({
      appPathsKey: "Software\\Microsoft\\Windows\\CurrentVersion\\App Paths\\Joushen Studio beta-local-flow.exe",
      displayName: "Joushen Studio beta-local-flow",
      registryKey: "Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Joushen Studio-beta-local-flow",
      shortcutName: "Joushen Studio beta-local-flow.lnk",
      uninstallerName: "Uninstall Joushen Studio beta-local-flow.exe",
    });
  });

  it("uses first-class preview display identity for preview release namespaces", () => {
    expect(resolveWinInstallIdentity({ namespace: "release-preview-win" })).toMatchObject({
      appPathsKey: "Software\\Microsoft\\Windows\\CurrentVersion\\App Paths\\Joushen Studio Preview.exe",
      displayName: "Joushen Studio Preview",
      registryKey: "Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Joushen Studio-release-preview-win",
      shortcutName: "Joushen Studio Preview.lnk",
      uninstallerName: "Uninstall Joushen Studio Preview.exe",
    });
  });

  it("uses first-class nightly display identity for nightly release versions and namespaces", () => {
    expect(resolveWinInstallIdentity({
      appVersion: "0.8.0.nightly.2",
      namespace: "release-stable-win",
    })).toMatchObject({
      appPathsKey: "Software\\Microsoft\\Windows\\CurrentVersion\\App Paths\\Joushen Studio Nightly.exe",
      displayName: "Joushen Studio Nightly",
      registryKey: "Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Joushen Studio-release-stable-win",
      shortcutName: "Joushen Studio Nightly.lnk",
      uninstallerName: "Uninstall Joushen Studio Nightly.exe",
    });
    expect(resolveWinInstallIdentity({ namespace: "release-nightly-win" })).toMatchObject({
      displayName: "Joushen Studio Nightly",
      shortcutName: "Joushen Studio Nightly.lnk",
    });
  });

  it("keeps the registry DisplayName free of the package version", async () => {
    const source = await readFile(new URL("../src/win/custom-installer.ts", import.meta.url), "utf8");
    expect(source).toContain('WriteRegStr HKCU "${registryKey}" "DisplayName" "${productName}"');
    expect(source).not.toContain('"DisplayName" "${productName} \\${APP_VERSION}"');
  });

  it("checks the silent install target directory for running instances before overwriting files", async () => {
    const source = await readFile(new URL("../src/win/custom-installer.ts", import.meta.url), "utf8");
    const silentCheck = source.slice(source.indexOf("silent_check:"), source.indexOf("IfFileExists \"$INSTDIR\\\\${exeName}\" existing_install"));
    expect(silentCheck).toContain('IfFileExists "$INSTDIR\\\\${exeName}" 0 silent_detect_running_instances');
    expect(silentCheck).toContain('StrCpy $RunningInstancesInstallRoot "$INSTDIR"');
    expect(silentCheck.indexOf('StrCpy $RunningInstancesInstallRoot "$INSTDIR"')).toBeLessThan(
      silentCheck.indexOf("Call DetectRunningInstances"),
    );
  });

  it("syncs launcher runtime metadata after a successful Windows install", async () => {
    const source = await readFile(new URL("../src/win/custom-installer.ts", import.meta.url), "utf8");
    expect(source).toContain("Function SyncLauncherRuntime");
    expect(source).toContain("buildInitialLauncherRuntimeDescriptor(config, packagedVersion)");
    expect(source).toContain('Push "event=launcher_runtime_after_write path=${escapedRuntimePath}"');
    expect(source.indexOf('Push "event=registry_after_write key=${registryKey} appPathsKey=${appPathsKey}"')).toBeLessThan(
      source.indexOf("Call SyncLauncherRuntime"),
    );
    expect(source.indexOf("Call SyncLauncherRuntime")).toBeLessThan(source.indexOf('Push "install section done"'));
  });

  it("keeps installer diagnostic log events ASCII-only for silent overwrite", async () => {
    const source = await readFile(new URL("../src/win/custom-installer.ts", import.meta.url), "utf8");
    expect(source).toContain('Push "existing installation found; silent install will overwrite it"');
    expect(source).not.toContain('Push "$(ExistingInstallSilentOverwrite)"');
  });
});
