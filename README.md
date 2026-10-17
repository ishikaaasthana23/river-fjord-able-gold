# MIRAGE-Z demonstration console

Interactive security-operations view of the MIRAGE-Z proposal: ingest and tokenize, attributable honey decoys, a simulated agent sandbox, deterministic egress blocking, and a SHA-256 hash-chain audit log.

This build is a **frontend demonstration**. It does not enforce policy, does not use IBM CPACF, and does not present proposal latency figures as measured results.

## Stack

React, TypeScript, Tailwind CSS, Zustand, Recharts, Lucide. The preview host uses TanStack Router file routes.

## Demo

Open Command Center and use **Launch security simulation**. Pause, resume, step, replay, and reset stay in one store, so Threats, Decoys, Agents, Egress, and Ledger update together.

## Mock versus real

- Detection, Luhn/IBAN checksums, decoy matching, and the hash chain run locally and are labeled as such.
- Benchmarks split proposed targets from a “Not yet measured” panel.
- The golden suite is illustrative, not an official score.
