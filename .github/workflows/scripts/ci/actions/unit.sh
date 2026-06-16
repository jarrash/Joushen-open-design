#!/usr/bin/env bash
set -Eeuo pipefail

source "$(dirname "$0")/../lib.sh"

ci_gate_timed_step "contracts-test" pnpm --filter @joushen-studio/contracts test
ci_gate_timed_step "host-test" pnpm --filter @joushen-studio/host test
ci_gate_timed_step "platform-test" pnpm --filter @joushen-studio/platform test
ci_gate_timed_step "sidecar-test" pnpm --filter @joushen-studio/sidecar test
ci_gate_timed_step "sidecar-proto-test" pnpm --filter @joushen-studio/sidecar-proto test
ci_gate_timed_step "tools-dev-test" pnpm --filter @joushen-studio/tools-dev test
ci_gate_timed_step "tools-pack-test" pnpm --filter @joushen-studio/tools-pack test
