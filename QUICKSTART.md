# Quickstart

<p align="center"><b>English</b> · <a href="docs/i18n/QUICKSTART.pt-BR.md">Português (Brasil)</a> · <a href="docs/i18n/QUICKSTART.de.md">Deutsch</a> · <a href="docs/i18n/QUICKSTART.fr.md">Français</a> · <a href="docs/i18n/QUICKSTART.ja-JP.md">日本語</a> · <a href="docs/i18n/QUICKSTART.zh-CN.md">简体中文</a> · <a href="docs/i18n/QUICKSTART.zh-TW.md">繁體中文</a></p>

Run the full product locally.

## Environment requirements

- **Node.js:** `~24` (Node 24.x). The repo enforces this through `package.json#engines`.
- **pnpm:** `10.33.x`. The repo pins `pnpm@10.33.2` through `packageManager`; use Corepack so the pinned version is selected automatically.
- **OS:** macOS, Linux, and WSL2 are the primary paths. Windows native is supported; see [`docs/windows-troubleshooting.md`](docs/windows-troubleshooting.md) for common setup gotchas.
- **Optional local agent CLI:** Claude Code, Codex, Devin for Terminal, Gemini CLI, OpenCode, Cursor Agent, Qwen, Qoder CLI, GitHub Copilot CLI, etc. If none are installed, use the BYOK API mode from Settings.

### Local agent CLI and PATH

The daemon scans your **`PATH`** (plus common user toolchain directories). If you install a CLI with **`npm install -g`** or **Homebrew** and Joushen Studio still shows it as *not installed*, the GUI may be starting with a minimal `PATH` that does not include your global npm or Homebrew `bin` directory (common on macOS when the app is not launched from a full login shell). Ensure the executable’s directory is on `PATH` for the process that runs the daemon, then use **Rescan** in **Settings → Execution mode**.

[`nvm`](https://github.com/nvm-sh/nvm) / [`fnm`](https://github.com/Schniz/fnm) are optional convenience tools, not required project setup. If you use one, install/select Node 24 before running pnpm:

```bash
# nvm
nvm install 24
nvm use 24

# fnm
fnm install 24
fnm use 24
```

Then enable Corepack and let the repo select pnpm:

```bash
corepack enable
corepack pnpm --version   # should print 10.33.2
```

## Docker Setup

Run Joushen Studio in a fully containerised environment without installing Node.js or pnpm locally.

### Requirements

* Docker Desktop
* Docker Compose v2

Verify Docker is installed correctly:

```bash
docker compose version
```

---

## Start Joushen Studio

From the repository root:

1. Change to the deploy directory and copy the environment template:

   ```bash
   cd deploy
   cp .env.example .env
   ```

2. Generate a secure token:

   ```bash
   openssl rand -hex 32
   ```

3. Open `.env` in your editor, find `OD_API_TOKEN=`, and paste the generated token there.

Then start the service:

```bash
docker compose up -d
```

Open the app in your browser:

```text
http://localhost:7456
```

The first startup may take a few seconds while Docker pulls the latest image.

---

## Common Docker Commands

### View logs

```bash
docker compose logs -f
```

### Restart containers

```bash
docker compose restart
```

### Stop containers

```bash
docker compose down
```

### Pull the latest image

```bash
docker compose pull
docker compose up -d
```

### Remove all local app data

```bash
docker compose down -v
```

---

## Environment Configuration

Create a `deploy/.env` file to override the default configuration. Start from the provided example:

```bash
cp deploy/.env.example deploy/.env
```

Edit `deploy/.env` to set your own token and adjust other values as needed:

```env
# Port exposed on the host
OPEN_DESIGN_PORT=7456

# Container memory limit
OPEN_DESIGN_MEM_LIMIT=384m

# Allowed CORS origins
OPEN_DESIGN_ALLOWED_ORIGINS=https://yourdomain.com

# Docker image tag
OPEN_DESIGN_IMAGE=docker.io/vanjayak/open-design:latest

# Required API token for daemon security
# Generate one with: openssl rand -hex 32
OD_API_TOKEN=
```

---

## Persistent Storage

Before documenting, changing, or choosing any persistent daemon storage path,
you MUST read the root `AGENTS.md` section **Daemon data directory contract**.
This Quickstart MUST NOT restate that contract or define storage paths.

---

## Notes

* Docker mode is ideal for contributors who do not want a local Node.js or pnpm setup.
* The container exposes the production daemon build directly on port `7456`.
* For development workflows and advanced local setup, see the rest of this Quickstart guide.

---

## One-shot (dev mode)

```bash
corepack enable
pnpm install
pnpm tools-dev run web # starts daemon + web in the foreground
# open the web URL printed by tools-dev
```

For the desktop shell and all managed sidecars in the background:

```bash
pnpm tools-dev # starts daemon + web + desktop in the background
```

On first load, the app detects your installed code-agent CLI (Claude Code / Codex / Devin for Terminal / Gemini / OpenCode / Cursor Agent / Qwen / Qoder CLI), picks it automatically, and defaults to `web-prototype` skill + `Neutral Modern` design system. Type a prompt and hit **Send**. The agent streams into the left pane; the `<artifact>` tag is parsed out and the HTML renders live on the right. Before documenting or changing any artifact storage path, you MUST read `AGENTS.md` → **Daemon data directory contract**.

The **Design system** dropdown ships with 71 built-in systems — 2 hand-authored starters (Neutral Modern, Warm Editorial) and 69 product systems imported from [`awesome-design-md`](https://github.com/VoltAgent/awesome-design-md), grouped by category (AI & LLM, Developer Tools, Productivity, Backend, Design Tools, Fintech, E-Commerce, Media, Automotive). Pick one to skin every prototype in that brand's aesthetic, and another set of 57 design skills sourced from [`awesome-design-skills`](https://github.com/bergside/awesome-design-skills).

The **Skill** dropdown groups by mode (Prototype / Deck / Template / Design system) and shows the default skill per mode with a `· default` suffix. Bundled skills:

- **Prototype** — `web-prototype` (generic), `saas-landing`, `dashboard`, `pricing-page`, `docs-page`, `blog-post`, `mobile-app`.
- **Deck / PPT** — `simple-deck` (single-file horizontal swipe) and `magazine-web-ppt` (the `guizang-ppt` bundle from [`op7418/guizang-ppt-skill`](https://github.com/op7418/guizang-ppt-skill) — default for deck mode, ships its own assets/template + 4 references). Skills with side files get an automatic "Skill root (absolute)" preamble so the agent can resolve `assets/template.html` and `references/*.md` against the real on-disk path instead of its CWD.

Pair a skill with a design system and a single prompt produces a layout-appropriate prototype or deck in the chosen visual language.

## Other scripts

```bash
pnpm tools-dev                 # daemon + web + desktop in the background
pnpm tools-dev start web       # daemon + web in the background
pnpm tools-dev run web         # daemon + web in the foreground (e2e/dev server)
pnpm tools-dev restart         # restart daemon + web + desktop
pnpm tools-dev restart --daemon-port 7457 --web-port 5175
pnpm tools-dev status          # inspect managed runtimes
pnpm tools-dev logs            # show daemon/web/desktop logs
pnpm tools-dev check           # status + recent logs + common diagnostics
pnpm tools-dev stop            # stop managed runtimes
pnpm --filter @joushen-studio/daemon build  # build apps/daemon/dist/cli.js for `od`
pnpm --filter @joushen-studio/web build     # build the web package when needed
pnpm typecheck                 # workspace typecheck
```

`pnpm tools-dev` is the only local lifecycle entry point. Do not use the removed legacy root aliases (`pnpm dev`, `pnpm dev:all`, `pnpm daemon`, `pnpm preview`, `pnpm start`).

During local development, `tools-dev` starts the daemon first, passes its port into `apps/web`, and `apps/web/next.config.ts` rewrites `/api/*`, `/artifacts/*`, and `/frames/*` to that daemon port so the App Router app can talk to the sibling Express process without CORS setup.

## Media generation / agent dispatcher checks

Image, video, audio, and HyperFrames skills call the local `od` CLI through environment variables injected by the daemon when it spawns an agent:

- `OD_BIN` — absolute path to `apps/daemon/dist/cli.js`.
- `OD_DAEMON_URL` — the running daemon URL.
- `OD_PROJECT_ID` — the active project id.
- `OD_PROJECT_DIR` — the active project's file directory.

If media generation fails with `OD_BIN: parameter not set`, `apps/daemon/dist/cli.js` missing, or `failed to reach daemon at http://127.0.0.1:0`, rebuild the daemon CLI and restart the managed runtime:

```bash
pnpm --filter @joushen-studio/daemon build
pnpm tools-dev restart --daemon-port 7457 --web-port 5175
ls -la apps/daemon/dist/cli.js
curl -s http://127.0.0.1:7457/api/health
```

Then open the project from the Joushen Studio app again instead of resuming an old terminal agent session. A daemon-spawned agent should see values like:

```bash
echo "OD_BIN=$OD_BIN"
echo "OD_PROJECT_ID=$OD_PROJECT_ID"
echo "OD_PROJECT_DIR=$OD_PROJECT_DIR"
echo "OD_DAEMON_URL=$OD_DAEMON_URL"
ls -la "$OD_BIN"
```

`OD_DAEMON_URL` must be a real daemon port such as `http://127.0.0.1:7457`, not `http://127.0.0.1:0`. The `:0` value is only an internal "pick a free port" launch hint and should not leak into agent sessions.

For the daemon-only production mode, the daemon serves the static Next.js export itself at `http://localhost:7456`, so no reverse proxy is involved.

If you place nginx in front of the daemon, keep SSE routes unbuffered and uncompressed. A common failure is the browser console showing `net::ERR_INCOMPLETE_CHUNKED_ENCODING 200 (OK)` after 80-90 seconds because nginx `gzip on` buffers chunked SSE responses even when the daemon sends `X-Accel-Buffering: no`.

```nginx
location /api/ {
    proxy_pass http://127.0.0.1:7456;

    proxy_buffering off;
    gzip off;

    proxy_read_timeout 86400s;
    proxy_send_timeout 86400s;
    proxy_http_version 1.1;
    proxy_set_header Connection "";

    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

## Two execution modes

| Mode | Picker value | How a request flows |
|---|---|---|
| **Local CLI** (default when daemon detects an agent) | "Local CLI" | Frontend → daemon `/api/chat` → `spawn(<agent>, ...)` → stdout → SSE → artifact parser → preview |
| **API mode** (fallback / no CLI) | "Anthropic API" / "OpenAI API" / "Azure OpenAI" / "Google Gemini" | Frontend → daemon `/api/proxy/{provider}/stream` → provider SSE normalized to `delta/end/error` → artifact parser → preview |

Both modes feed the **same** `<artifact>` parser and the **same** sandboxed iframe. The only thing that differs is the transport and the system-prompt delivery (local CLIs have no separate system channel, so the composed prompt is folded into the user message).

## Prompt composition

For every send, the app builds a system prompt from three layers and sends it to the provider:

```
BASE_SYSTEM_PROMPT   (output contract: wrap in <artifact>, no code fences)
   + active design system body  (DESIGN.md — palette/type/layout)
   + active skill body          (SKILL.md — workflow and output rules)
```

Swap the skill or the design system in the top bar and the next send uses the new stack. Bodies are cached in-memory per session so this is a single daemon fetch per pick.

## File map

```
open-design/
├── apps/
│   ├── daemon/                # Node/Express — spawns local agents + serves APIs
│   │   └── src/
│   │       ├── cli.ts             # `od` bin entry
│   │       ├── server.ts          # /api/* + static serving
│   │       ├── agents.ts          # PATH scanner for claude/codex/devin/gemini/opencode/cursor-agent/qwen/qoder/copilot
│   │       ├── skills.ts          # SKILL.md loader (frontmatter parser)
│   │       └── design-systems.ts  # DESIGN.md loader
│   │   ├── sidecar/           # tools-dev daemon sidecar wrapper
│   │   └── tests/             # daemon package tests
│   ├── web/                   # Next.js 16 App Router + React client
│       ├── app/               # App Router entrypoints
│       ├── src/               # React + TypeScript client/runtime modules
│       │   ├── App.tsx        # orchestrates mode / skill / DS pickers + send
│       │   ├── providers/     # daemon + BYOK API transports
│       │   ├── prompts/       # system, discovery, directions, deck framework
│       │   ├── artifacts/     # streaming <artifact> parser + manifests
│       │   ├── runtime/       # iframe srcdoc, markdown, export helpers
│       │   └── state/         # localStorage + daemon-backed project state
│       ├── sidecar/           # tools-dev web sidecar wrapper
│       └── next.config.ts     # tools-dev rewrites + prod apps/web/out export config
│   └── desktop/               # Electron runtime, launched/inspected by tools-dev
├── packages/
│   ├── contracts/             # shared web/daemon app contracts
│   ├── sidecar-proto/         # Joushen Studio sidecar protocol contract
│   ├── sidecar/               # generic sidecar runtime primitives
│   └── platform/              # generic process/platform primitives
├── tools/dev/                 # `pnpm tools-dev` lifecycle and inspect CLI
├── e2e/                       # Playwright UI + external integration/Vitest harness
├── skills/                    # SKILL.md — drops in from any Claude Code skill repo
│   ├── web-prototype/         # generic single-screen prototype (default for prototype mode)
│   ├── saas-landing/          # marketing page (hero / features / pricing / CTA)
│   ├── dashboard/             # admin / analytics dashboard
│   ├── pricing-page/          # standalone pricing + comparison
│   ├── docs-page/             # 3-column documentation layout
│   ├── blog-post/             # editorial long-form
│   ├── mobile-app/            # phone-frame single screen
│   ├── simple-deck/           # minimal horizontal-swipe deck
│   └── guizang-ppt/           # magazine-web-ppt — bundled deck/PPT default
│       ├── SKILL.md
│       ├── assets/template.html
│       └── references/{themes,layouts,components,checklist}.md
├── design-systems/            # DESIGN.md — 9-section schema (awesome-claude-design)
│   ├── default/               # Neutral Modern (starter)
│   ├── warm-editorial/        # Warm Editorial (starter)
│   ├── README.md              # catalog overview
│   └── …129 systems           # 2 starters · 70 product systems · 57 design skills
├── scripts/sync-design-systems.ts    # re-import from upstream getdesign tarball
├── docs/                      # product vision + spec
├── pnpm-workspace.yaml        # apps/* + packages/* + tools/* + e2e
└── package.json               # root quality scripts + `od` bin
```

## Troubleshooting

- **`better-sqlite3` fails to load / ABI mismatch after a Node.js version change** — `pnpm install` re-runs `postinstall` automatically and rebuilds the native addon for the current Node.js. To rebuild manually or verify the fix: `pnpm --filter @joushen-studio/daemon rebuild better-sqlite3` then `pnpm --filter @joushen-studio/daemon exec node -e "require('better-sqlite3')"`. Requires build tools: `python3`, `make`, `g++` (or `clang++`). If you have `ignore-scripts=true` in your `.npmrc`, run `node scripts/postinstall.mjs` after `pnpm install`.
- **"no agents found on PATH"** — install one of: `claude`, `codex`, `devin`, `gemini`, `opencode`, `cursor-agent`, `qwen`, `qodercli`, `copilot`. Or switch to API mode in Settings and paste a provider key.
- **Claude Code exits with code 1** — Joushen Studio was able to start `claude`, but the spawned non-interactive run failed before producing a response. From the same shell or app environment that starts Joushen Studio, check:
  ```bash
  claude --version
  claude auth status --text
  printf 'hello' | claude -p --output-format stream-json --verbose --permission-mode bypassPermissions
  ```
  If the smoke test reports `401`, `apiKeySource: "none"`, or another auth error without a custom endpoint, run `claude`, use `/login`, exit Claude, and retry Joushen Studio. If you use multiple Claude profiles, set **Settings -> Execution mode -> Claude Code config directory** to the profile path such as `~/.claude-2`. If `ANTHROPIC_BASE_URL` or a proxy is set, check the endpoint URL, proxy credentials, endpoint auth environment, and model access; remove the custom endpoint only if you want to retry with standard Claude Code auth. On Windows, native PowerShell and WSL use separate Claude installs and credential stores; re-authenticate in the same environment Joushen Studio uses, and check Windows Credential Manager if `/login` does not repair native Windows credentials.
- **daemon 500 on /api/chat** — check the daemon terminal for the stderr tail; usually the CLI rejected its args. Different CLIs take different argv shapes; see `apps/daemon/src/agents.ts` `buildArgs` if you need to tweak.
- **media generation says `OD_BIN` is missing or daemon URL is `:0`** — run the media dispatcher checks above. Do not resume the old CLI session; reopen the project from the Joushen Studio app so the daemon can inject fresh `OD_*` variables.
- **Codex loads too much plugin context** — start Joushen Studio with `OD_CODEX_DISABLE_PLUGINS=1 pnpm tools-dev` to make daemon-spawned Codex processes run with `--disable plugins`.
- **artifact never renders** — the model produced text without wrapping in `<artifact>`. Confirm the system prompt is going through (check daemon log) and consider switching to a more capable model or a stricter skill.
- **`Authorization: Bearer <OD_API_TOKEN>` required on macOS** — Docker Desktop bridge networking makes the daemon see requests as non-loopback. Enable host networking in Docker Desktop and use `network_mode: host`. See [`deploy/README.md` — Docker Desktop on macOS](deploy/README.md#docker-desktop-on-macos).

## Mapping back to the vision

This Quickstart is the runnable seed of the spec in [`docs/`](docs/). The spec describes where this grows (see [`docs/roadmap.md`](docs/roadmap.md)). Highlights:

- `docs/architecture.md` describes the shipped stack: Next.js 16 App Router in front, local daemon behind it, and `apps/web/next.config.ts` rewrites in dev to keep the browser talking to the same `/api` surface.
- `docs/skills-protocol.md` describes the full `od:` frontmatter (typed inputs, sliders, capability gating). This MVP reads `name` / `description` / `triggers` / `od.mode` / `od.design_system.requires` only — extend `apps/daemon/src/skills.ts` to add the rest.
- `docs/agent-adapters.md` foresees richer dispatch (capability detection, streaming tool-calls). Our `apps/daemon/src/agents.ts` is a minimal dispatcher — enough to prove the wiring.
- `docs/modes.md` lists four modes: prototype / deck / template / design-system. We ship skills for the first two; the picker already filters by `mode`.
