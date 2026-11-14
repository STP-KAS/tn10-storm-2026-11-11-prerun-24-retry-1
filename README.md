> **Experimental. We are just trying this.** [Disclaimer](DISCLAIMER.md) · Kaspa Testnet-10 only; tKAS has no value.
>
> **This is a pre-run. Pre-run 24, retry 1.** It is not the Wednesday run. It is not the Tuesday run. It is not pre-run 1 to 23, and it does not edit pre-run 24's repo. A read does not start a runner.

# tn10-storm-2026-11-11-prerun-24-retry-1

**Retry 1 of pre-run 24 of the Wednesday neuron.** The neuron stays [tn10-storm-2026-11-11](https://github.com/STP-KAS/tn10-storm-2026-11-11). This repo does not edit that repo, does not write `REVIEW_CLOSED`, and does not set or move a clock for it. [tn10-storm-2026-11-10](https://github.com/STP-KAS/tn10-storm-2026-11-10) (Tuesday) is not edited from here either.

> **Our own testing.** This is our own Kaspa Testnet-10 testing, run on our own machines and nodes. What these pages report is what we observed in this run; it is not a claim of how TN10 or Kaspa behave in general.

| Field | Value |
|---|---|
| Target | one covenant hop, one KCC-20 mint and one tic-tac-toe guest carrier, each accepted on the desk node in the same open window ([target plan](https://github.com/STP-KAS/tn10-target-plan/blob/main/plan/PLAN.md), pre-run 24 card; unchanged) |
| Met or not met | **met**: 7,139 covenant hops, 30 of 30 mints and 8 of 8 guest carriers accepted on the desk node in one open window (23:46:07–00:17:04 UTC) |
| Retry count | 1 (retries [pre-run 24](https://github.com/STP-KAS/tn10-storm-2026-11-11-prerun-24), which missed the guest line) |
| Core tags | 1 (mempool rotation, issue #1146: a light 60-second id sample, not a full dump) |
| Status | done |

**Where this starts.** From [pre-run 24's locks/LOCKED.md](https://github.com/STP-KAS/tn10-storm-2026-11-11-prerun-24/blob/main/locks/LOCKED.md), copied here as [locks/LOCKED.md](locks/LOCKED.md), with a retry 1 section added at the end. Pre-runs 1 to 23 are in [tn-master](https://github.com/STP-KAS/tn-master).

## Result

All three lines met in the same open window, read on the desk node ([counts/desk/TARGET.md](counts/desk/TARGET.md)): 7,139 covenant hops (families 1–4 at the floor), 30 of 30 mints (median accept 1,020 ms), and one tic-tac-toe match: 8 of 8 carriers (Init, two deposits, create, join, two turns, withdraw) found among the desk node's accepted ids; the lane's DA read at RETURN showed 1 game finished. Mini read 16 of 16 minutes in full with the same family counts. Rotation sample: 869 ids checked, 0 still listed. The bot, on the desk this time, read HOLD-3 3 s after it reached origin, found a free node before the pin and sent 37 payments in the pinned minute (37 OK). The guest line needed one fix during the run ([locks](locks/LOCKED.md#locked-during-pre-run-24-retry-1)): the kit read the lane id from a field the DA state does not have, so the first `ttflow` stopped on its config before sending anything; it was run again in the same container with the lane id `ttd` logged. Details: [logs/LESSONS.md](logs/LESSONS.md).

## The one change

Pre-run 24 missed the guest line. Its first write-up said no runner or guest binary was on the box; that was wrong and is corrected in pre-run 24's LESSONS: the guest binaries had been built on the box earlier (26 Sep), but no runner kit around them existed. Since then TN10 ops added a small guest kit, [tools/ttt-guest-runner in tn10-target-plan](https://github.com/STP-KAS/tn10-target-plan/tree/main/tools/ttt-guest-runner) (commit `04db647`), which uses those binaries as they are. **No compile tonight.**

So retry 1 is pre-run 24's load, unchanged, **plus one tic-tac-toe match**: the kit's `arm-guest.sh --live` runs `ttd` in exec mode (no prover) on a fresh lane and `ttflow` sends one scripted match, one carrier at a time (Init, two deposits, create, join, two turns, withdraw). Everything else (four floor families at 100, the fresh KCC-20 launch with its one-at-a-time mint line capped at 30, the rotation sampler, the steps, the bot's rule, the Mini's second read) is pre-run 24's.

- **Where the guest runs.** The binaries are Linux builds. They run in a local Linux container on the desk, and their send node is the desk's own TN10 node. Nothing is exposed outside the desk and nothing about the route is in this repo.
- **Funding.** The guest's two keys were funded from our own mining wallet as one logged step: 1,000 tKAS in six coins (four of 200 to the operator key, two of 100 to the issuer key). The genesis keys got one fresh coin each from key 0 (four coins, about 87 tKAS in all). `BUDGET_CHECK` is run again by the desk runner before genesis.
- **How a carrier counts.** Only when the id that `ttflow` logged is among the desk node's own accepted transaction ids. `ttflow` saying "accepted" means the node took the submit; it is not counted alone.
- **If the node rejects the carriers,** the exact text is kept (ids removed), the guest line is `not met` with that reason, and the guest line is not retried again tonight.
- **Disk floor, written before the open:** desk and Mini 100 GB free, box 20 GB. Below that, nothing starts.

## Machines

| Machine | Go file | First sentence |
|---|---|---|
| Desk | [GO-DESK.md](GO-DESK.md) | DESK. I send and count on pre-run 24 retry 1. This is not Wednesday. |
| Mini | [GO-MINI.md](GO-MINI.md) | MINI. I count pre-run 24 retry 1 as the second read. I do not send. This is not Wednesday. |
| Bot | [GO-BOT.md](GO-BOT.md) | GROKBOT. I send payments on the pre-run 24 retry 1 HOLD-4 only. I do not count. This is not Wednesday. |

**Bot on the desk.** By the operator's standing rule of 14 Nov 00:30 Brussels (heavy work on the desk; the bot's machine stalled about 5 minutes in pre-run 24), the bot's waiter, free check and sender run on the desk for this retry, same rule ([tools/bot](tools/bot/README.md)). The guest kit runs on the desk too.

The arm is in [RULES.md](RULES.md). [PLAYBOOK.md](PLAYBOOK.md) has the gates and the status when this repo was opened.

## Gates, in order

1. Disk floor held.
2. Mini's and the desk's TN10 nodes up from their own data, synced, DAA moving.
3. No other runner or waiter up. Key 0 passes `BUDGET_CHECK`.
4. The guest kit's gate (`arm-guest.sh --dry`) passes against the desk node: testnet-10, synced, DAA moving, issuer 2 coins, operator 4 coins, each at least 20 tKAS.
5. `hashes/SIXTEEN.md` on origin (five rows, fresh launch names) with an On origin line.
6. The offline rehearsal passed on the changed files.
7. The desk pushes `logs/PRE-RUN-OPEN.md`; Mini pushes `logs/MINI-ARMED.md`.
8. Probe and counter up; genesis; families; mint line; rotation sampler; the guest kid; the steps.

A miss stays in this repo. A next attempt is a new repo and starts from this repo's lock file.

**Part of [tn-master](https://github.com/STP-KAS/tn-master).** This retry is its own row.
