> **Experimental. We are just trying this.** [Disclaimer](../../DISCLAIMER.md) · Kaspa Testnet-10 only; tKAS has no value. Counts only. No id, txid or address in this file.

# KCC-20 mint line, pre-run 24 retry 1

One fresh KCC-20 public-mint launch (family 5 in the hash file; a launch name not used before). One mint at a time: the line builds one mint at the floor rate on the node's own mass, submits it to the desk's private node, and waits until the node shows the next minter (the mint accepted on the virtual chain) before the next one, then 15 s. Cap 30 accepted mints. A reject is kept with the node's text; the fee is not raised.

- Mints submitted OK: 30; accepted (next minter seen on the desk node): 30; rejected: 0; accept timeouts (120 s): 0; build failures: 0.
- Accept time, submit to next minter seen: min 503 ms, median 1020 ms, max 1028 ms.
- Node rate (fee / node mass): 100.03–100.3; node mass 40378–41722; fees 1.2229 tKAS in all.
- Accepted mints by step: families 1, BASE 15, HOLD-1 11, HOLD-2 3.
- End state: cap.

No reject text.

