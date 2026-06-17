#!/usr/bin/env bash
set -Eeuo pipefail

source "$(dirname "$0")/../lib.sh"

ci_gate_timed_step "daemon-build" pnpm --filter @joushen-studio/daemon build
ci_gate_timed_step "desktop-build" pnpm --filter @joushen-studio/desktop build
ci_gate_timed_step "web-build-sidecar" pnpm --filter @joushen-studio/web build:sidecar
ci_gate_timed_step "workspace-build" pnpm -r --filter '!@joushen-studio/landing-page' --workspace-concurrency=1 --if-present run build
