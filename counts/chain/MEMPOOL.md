> **Experimental. We are just trying this.** [Disclaimer](../../DISCLAIMER.md) · Kaspa Testnet-10 only; tKAS has no value. Counts only.

> **Our own testing.** What this page shows is what our probe read on our own desk node in this run; it is not a claim of how TN10 behaves in general.

# Mempool and template timeline, pre-run 24 retry 1

Read by the probe on the desk's private TN10 node every 20 s, read-only; each cell is the median of that minute's samples. Pre-run 17: ready count and ready mass come from the full mempool read up to 10,000 entries and from the node's own figures (getFeeEstimateExperimental, verbose) above that, where the per-class columns stay blank (the node's wRPC replies are capped at 128 MiB, about 12,500 entries). Ready means no parent in the mempool: in rusty-kaspa v2.1.0 only those are in the selector's frontier. Ready mass is compared with one block's mass limit (500,000): at or under 1 the selector takes all ready transactions best-first; over 1 it samples at random weighted by (fee/mass)^3 (over 4, sample_inplace). Mass is the larger of compute and storage mass, as the v2.1.0 selector normalises it (transient mass is not in the RPC). Other traffic is every mempool entry not in our sender logs (our heavy lane is its own class, our heavy); its fee rate is the node's fee over that mass. Template transactions carry no id in the RPC, so each is matched to a mempool entry by its first input. The template is the desk node's own getBlockTemplate (never submitted): what this node would put in a block at that moment, not a miner's template. The fee estimate is the node's getFeeEstimate, read only; no sender reads it. Public mempool is getInfo's mempool size on each kept public kaspad.

## The run

Step is the runner's step at the minute's start (see TIMELINE.md).

| Minute (UTC) | Step | Samples | Mempool | Ready (no parent in mempool) | Ready mass, blocks of 500k | Other traffic in mempool | Other ready | Other at 100, n | Other at 100, mean mass | Our payments in mempool | Our heavy in mempool / ready | Floor in mempool / ready | Kcc in mempool / ready | Template txs | Template storage mass | Template txs over 100k storage mass | Template: payments | Template: our heavy | Template: floor | Template: kcc | Template: other | Fee estimate priority / normal / low | Public 1 mempool | Public 5 mempool |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---:|---:|
| 2026-11-13T23:48 | families | 1 | 0 | 0 | 0.00 | 0 | 0 | - | - | 0 | 0 / 0 | 0 / 0 | 0 / 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 100.0 / 100.0 / 100.0 | 0 | 0 |
| 2026-11-13T23:49 | BASE | 3 | 3 | 4 | 0.33 | 0 | 0 | - | - | 0 | 0 / 0 | 4 / 4 | 0 / 0 | 4 | 163,632 | 0 | 0 | 0 | 4 | 0 | 0 | 100.0 / 100.0 / 100.0 | 3 | 0 |
| 2026-11-13T23:50 | BASE | 3 | 4 | 4 | 0.33 | 0 | 0 | - | - | 0 | 0 / 0 | 4 / 4 | 0 / 0 | 4 | 164,451 | 0 | 0 | 0 | 4 | 0 | 0 | 100.0 / 100.0 / 100.0 | 0 | 1 |
| 2026-11-13T23:51 | BASE | 3 | 3 | 3 | 0.25 | 0 | 0 | - | - | 0 | 0 / 0 | 3 / 3 | 0 / 0 | 3 | 122,746 | 0 | 0 | 0 | 3 | 0 | 0 | 100.0 / 100.0 / 100.0 | 1 | 0 |
| 2026-11-13T23:52 | BASE | 3 | 3 | 3 | 0.24 | 0 | 0 | - | - | 0 | 0 / 0 | 3 / 3 | 0 / 0 | 3 | 121,599 | 0 | 0 | 0 | 3 | 0 | 0 | 100.0 / 100.0 / 100.0 | 0 | 0 |
| 2026-11-13T23:53 | HOLD-1 | 3 | 4 | 4 | 0.33 | 0 | 0 | - | - | 0 | 0 / 0 | 4 / 4 | 0 / 0 | 4 | 164,437 | 0 | 0 | 0 | 4 | 0 | 0 | 100.0 / 100.0 / 100.0 | 0 | 0 |
| 2026-11-13T23:54 | HOLD-1 | 3 | 0 | 2 | 0.16 | 0 | 0 | - | - | 0 | 0 / 0 | 2 / 2 | 0 / 0 | 2 | 81,315 | 0 | 0 | 0 | 2 | 0 | 0 | 100.0 / 100.0 / 100.0 | 0 | 0 |
| 2026-11-13T23:55 | HOLD-1 | 3 | 3 | 3 | 0.25 | 0 | 0 | - | - | 0 | 0 / 0 | 3 / 3 | 0 / 0 | 3 | 122,819 | 0 | 0 | 0 | 3 | 0 | 0 | 100.0 / 100.0 / 100.0 | 0 | 0 |
| 2026-11-13T23:56 | HOLD-2 | 3 | 4 | 6 | 0.47 | 2 | 2 | - | - | 0 | 0 / 0 | 4 / 4 | 0 / 0 | 5 | 166,085 | 0 | 0 | 0 | 4 | 0 | 1 | 100.0 / 100.0 / 100.0 | 6 | 1 |
| 2026-11-13T23:57 | HOLD-2 | 3 | 4 | 4 | 0.33 | 0 | 0 | - | - | 0 | 0 / 0 | 4 / 4 | 0 / 0 | 4 | 163,437 | 0 | 0 | 0 | 4 | 0 | 0 | 100.0 / 100.0 / 100.0 | 0 | 0 |
| 2026-11-13T23:58 | HOLD-2 | 3 | 0 | 4 | 0.32 | 0 | 0 | - | - | 0 | 0 / 0 | 4 / 4 | 0 / 0 | 4 | 162,472 | 0 | 0 | 0 | 4 | 0 | 0 | 100.0 / 100.0 / 100.0 | 1 | 1 |
| 2026-11-13T23:59 | HOLD-3 | 3 | 4 | 5 | 0.36 | 1 | 1 | 1 | 17,910 | 0 | 0 / 0 | 4 / 4 | 0 / 0 | 5 | 164,516 | 0 | 0 | 0 | 4 | 0 | 1 | 100.0 / 100.0 / 100.0 | 6 | 1 |
| 2026-11-14T00:00 | HOLD-3 | 3 | 4 | 5 | 0.52 | 1 | 1 | - | - | 0 | 0 / 0 | 4 / 4 | 0 / 0 | 5 | 163,641 | 0 | 0 | 0 | 4 | 0 | 1 | 100.0 / 100.0 / 100.0 | 1 | 2 |
| 2026-11-14T00:01 | HOLD-3 | 3 | 4 | 11 | 0.46 | 7 | 7 | - | - | 0 | 0 / 0 | 4 / 4 | 0 / 0 | 11 | 164,427 | 0 | 0 | 0 | 4 | 0 | 7 | 100.0 / 100.0 / 100.0 | 0 | 0 |
| 2026-11-14T00:02 | HOLD-4 | 3 | 0 | 4 | 0.32 | 0 | 0 | - | - | 0 | 0 / 0 | 4 / 4 | 0 / 0 | 4 | 161,763 | 0 | 0 | 0 | 4 | 0 | 0 | 100.0 / 100.0 / 100.0 | 5 | 1 |
| 2026-11-14T00:03 | HOLD-4 | 3 | 4 | 4 | 0.33 | 0 | 0 | - | - | 0 | 0 / 0 | 4 / 4 | 0 / 0 | 4 | 162,971 | 0 | 0 | 0 | 4 | 0 | 0 | 100.0 / 100.0 / 100.0 | 0 | 0 |
| 2026-11-14T00:04 | HOLD-4 | 3 | 4 | 11 | 0.46 | 7 | 7 | - | - | 0 | 0 / 0 | 4 / 4 | 0 / 0 | 11 | 163,327 | 0 | 0 | 0 | 4 | 0 | 7 | 100.0 / 100.0 / 100.0 | 5 | 1 |
| 2026-11-14T00:05 | HOLD-4 | 3 | 3 | 3 | 0.25 | 0 | 0 | - | - | 0 | 0 / 0 | 3 / 3 | 0 / 0 | 3 | 123,597 | 0 | 0 | 0 | 3 | 0 | 0 | 100.0 / 100.0 / 100.0 | 0 | 1 |
| 2026-11-14T00:06 | HOLD-4 | 3 | 4 | 4 | 0.33 | 0 | 0 | - | - | 0 | 0 / 0 | 4 / 4 | 0 / 0 | 4 | 163,432 | 0 | 0 | 0 | 4 | 0 | 0 | 100.0 / 100.0 / 100.0 | 0 | 0 |
| 2026-11-14T00:07 | RETURN | 3 | 4 | 4 | 0.33 | 0 | 0 | - | - | 0 | 0 / 0 | 4 / 4 | 0 / 0 | 4 | 164,249 | 0 | 0 | 0 | 4 | 0 | 0 | 100.0 / 100.0 / 100.0 | 54 | 50 |
| 2026-11-14T00:08 | RETURN | 3 | 4 | 5 | 0.35 | 1 | 1 | - | - | 0 | 0 / 0 | 4 / 4 | 0 / 0 | 5 | 163,109 | 0 | 0 | 0 | 4 | 0 | 1 | 100.0 / 100.0 / 100.0 | 1 | 1 |
| 2026-11-14T00:09 | RETURN | 3 | 0 | 4 | 0.33 | 0 | 0 | - | - | 0 | 0 / 0 | 4 / 4 | 0 / 0 | 4 | 162,758 | 0 | 0 | 0 | 4 | 0 | 0 | 100.0 / 100.0 / 100.0 | 1 | 8 |
| 2026-11-14T00:10 | RETURN | 3 | 0 | 0 | 0.00 | 0 | 0 | - | - | 0 | 0 / 0 | 0 / 0 | 0 / 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 100.0 / 100.0 / 100.0 | 2 | 1 |
| 2026-11-14T00:11 | tail | 3 | 0 | 0 | 0.00 | 0 | 0 | - | - | 0 | 0 / 0 | 0 / 0 | 0 / 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 100.0 / 100.0 / 100.0 | 0 | 0 |
| 2026-11-14T00:12 | tail | 3 | 0 | 1 | 0.06 | 1 | 1 | - | - | 0 | 0 / 0 | 0 / 0 | 0 / 0 | 1 | 30,994 | 0 | 0 | 0 | 0 | 0 | 1 | 100.0 / 100.0 / 100.0 | 1 | 1 |
| 2026-11-14T00:13 | tail | 3 | 0 | 0 | 0.00 | 0 | 0 | - | - | 0 | 0 / 0 | 0 / 0 | 0 / 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 100.0 / 100.0 / 100.0 | 8 | 8 |
| 2026-11-14T00:14 | tail | 3 | 0 | 7 | 0.13 | 7 | 7 | - | - | 0 | 0 / 0 | 0 / 0 | 0 / 0 | 7 | 0 | 0 | 0 | 0 | 0 | 0 | 7 | 100.0 / 100.0 / 100.0 | 0 | 0 |
| 2026-11-14T00:15 | tail | 3 | 0 | 0 | 0.00 | 0 | 0 | - | - | 0 | 0 / 0 | 0 / 0 | 0 / 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 100.0 / 100.0 / 100.0 | 50 | 8 |
| 2026-11-14T00:16 | tail | 3 | 0 | 0 | 0.00 | 0 | 0 | - | - | 0 | 0 / 0 | 0 / 0 | 0 / 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 100.0 / 100.0 / 100.0 | 1 | 1 |
