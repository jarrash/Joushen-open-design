#!/usr/bin/env bash
set -Eeuo pipefail

source "$(dirname "$0")/../lib.sh"

ci_gate_timed_step "web-build-sidecar" pnpm --filter @joushen-studio/web build:sidecar
ci_gate_timed_step "web-test" pnpm --filter @joushen-studio/web test
