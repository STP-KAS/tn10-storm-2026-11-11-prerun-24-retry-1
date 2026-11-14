> **Experimental. We are just trying this.** [Disclaimer](../DISCLAIMER.md) · Kaspa Testnet-10 only. Counts only.

# Lessons, pre-run 24 retry 1

Target: one covenant hop, one KCC-20 mint and one tic-tac-toe guest carrier accepted on the desk node in one open window. **Met.** Retry count 1 (retries pre-run 24, which missed the guest line).

| Line | Accepted on the desk node | Met |
|---|---:|---|
| Covenant hop (families 1–4, floor 100) | 7,139 | met |
| KCC-20 mint (family 5, one at a time, cap 30) | 30 of 30 | met |
| Tic-tac-toe guest carrier (one match) | 8 of 8 | met |

Per step, floor hops / kcc mints accepted (desk counter; Mini the same): BASE 999 / 12, HOLD-1 972 / 11, HOLD-2 961 / 3, HOLD-3 913 / 0, HOLD-4 322 / 0, RETURN 940 / 0. Mini READ 16 of 16.

1. **The guest line works against kaspad 2.1.0 on our own TN10 node.** One match from the kit's existing binaries (no compile): 8 carriers, v1 transactions on the match's lane subnetwork, all taken and all accepted, about 2 s apart, next to about 320 floor hops a minute. We saw no reject. This is one match on one node, not a claim about TN10.
2. **The kit had a lane-id bug.** It read the lane id from a DA-state field that is not there; the first `ttflow` stopped on its config before it sent anything. A second `ttflow` in the same container with the lane id `ttd` logged ran clean. The rehearsal could not catch it: in the offline rehearsal the kit runs in dry mode and never reaches `ttflow`. Fix the kit (lane id from `ttd`, or the first four bytes of the lane subnetwork, big-endian) and drop `pipefail` around its result greps.
3. **Count carriers on the node, not on the driver.** `ttflow`'s "accepted" means the node took the submit. Here every logged id was also among the desk node's accepted ids within 15 s of the last submit. Keep that check.
4. **Where the guest ran.** The binaries are Linux builds. They ran in a local Linux container on the desk (Docker Desktop's own Linux VM, already installed; no reboot, no compile), sent to the desk's own TN10 node. Nothing was exposed outside the desk. The box could not reach the desk node privately (no inbound route either way), so the box route was dropped.
5. **Docker Desktop brought other containers up.** Starting it auto-started an older local stack (12 containers, restart policy unless-stopped) that filled its 3–4 GB VM; the VM froze twice until those were stopped. They were stopped by hand at 23:19 UTC and stayed stopped through the run. A desk-side container run should start the engine with that stack stopped first.
6. **The bot on the desk was on time.** By the operator's 00:30 rule the bot's waiter, free check and sender ran on the desk. It read HOLD-3 3 s after origin (pre-run 24: 245 s late on the box), found a free distinct public kaspad 37 s before the pin and sent 37 payments in the minute, all OK (the pay key had 37 coins). Keep the bot on the desk.
7. **Funding.** Guest keys: 1,000 tKAS from our own mining wallet in one transaction (4 × 200 operator, 2 × 100 issuer). Genesis coins: four from key 0. `BUDGET_CHECK` at the run: key 0 130,513 usable, projected end 111,513 (abort 18,000, margin 8,000): pass. After the run: 123,210 usable in 3,399 coins. Family fees 292.94 tKAS for 7,143 submit-OK hops (1,652 submits rejected as already spent or orphan, as in pre-run 24); mint fees 1.22 tKAS.
8. **Rotation (#1146):** 23 samples, 869 of our accepted ids checked 60 s or more after acceptance, 0 still listed.
