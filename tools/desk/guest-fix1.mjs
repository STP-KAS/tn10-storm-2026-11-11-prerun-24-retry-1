// guest-fix1.mjs (pre-run 24 retry 1, fix during the run). The kit's arm-guest.sh read the lane id from the DA state, which has
// no lane_id field (only lane_subnet), so ttflow got TT_LANE_ID="undefined" and panicked before sending anything. This runs
// ttflow once more in the same container (ttd still up, same lane), with the lane id ttd itself logged, then confirms exactly as
// guest24.mjs does and rewrites private/guest-total.json. At GUEST-STOP it runs stop-guest.sh and removes the container.
// guest24.mjs (pre-run 24 retry 1): the tic-tac-toe guest line as a desk runner kid. TESTNET-10 ONLY. No compile.
// It runs the guest kit (tools/ttt-guest-runner in STP-KAS/tn10-target-plan, binaries already built) inside a local
// Docker Desktop Linux container on the desk, whose send node is the desk's own TN10 node reached through Docker's
// host gateway (set in the kit's private run.env, never in git; nothing is published or forwarded outward).
// Steps: write ARM-GUEST into the guest run dir, start the container (arm-guest.sh --live: gates, ttd in exec mode, one
// ttflow match, one carrier at a time), wait for its end, then confirm on the desk node itself: every carrier id that ttflow
// logged is looked up in the accepted-transaction ids of the desk's virtual chain since the guest started. At control/GUEST-STOP
// (RETURN) or PROBE-STOP it runs stop-guest.sh (one DA read) and removes the container. Writes private/guest-total.json and
// logs/guest.jsonl (counts and sanitized texts only; no id, key, address, host or port).
import fs from "node:fs"; import { spawnSync } from "node:child_process";
const { CFG, P, sleep, to, connect } = await import("file:///" + String(process.env.STORM_KIT).replace(/\\/g, "/") + "/lib.mjs");
const G = CFG.guest_dir; const GR = G + "\\" + (CFG.guest_run_sub || "run"); const LIVE = CFG.guest_mode !== "dry"; /* the offline rehearsal sets guest_mode "dry": the kit's gate only, nothing sent */ const IMG = CFG.guest_image || "ttt-guest-kit:local"; const NAME = CFG.guest_container || "ttt-guest-r1";
const DOCKER = CFG.docker_exe || "C:\\Program Files\\Docker\\Docker\\resources\\bin\\docker.exe";
const OUT = P("logs", "guest.jsonl"); const TOT = P("private", "guest-total.json");
const clean = (s) => String(s).replace(/wss?:\/\/\S+/g, "<url>").replace(/https?:\/\/\S+/g, "<url>").replace(/\b\d{1,3}(\.\d{1,3}){3}(:\d+)?\b/g, "<ip>").replace(/[0-9a-f]{64}/gi, "<id>").replace(/kaspatest:[a-z0-9]+/g, "<addr>").replace(/\b(?:[a-z0-9-]+\.)+[a-z]{2,}(:\d+)?\b/gi, "<host>").replace(/:\d{4,5}\b/g, ":<port>").replace(/C:\\Users\\[^\\]+/gi, "C:\\Users\\Fermi").slice(0, 300);
const note = (o) => fs.appendFileSync(OUT, JSON.stringify({ ts: new Date().toISOString(), ...o }) + "\n");
const phase = (s) => fs.appendFileSync(P("logs", "phase.log"), new Date().toISOString().replace(/\.\d+Z$/, "Z") + " " + s + "\n");
const dk = (args, ms = 120000) => spawnSync(DOCKER, args, { encoding: "utf8", timeout: ms });
const gphase = () => { try { return fs.readFileSync(GR + "\\logs\\guest-phase.log", "utf8"); } catch { return ""; } };
const rpc = await connect(CFG.main_node_url, 3);
const startSink = (await to(rpc.getBlockDagInfo(), 10000)).sink;
const total = JSON.parse(fs.readFileSync(TOT, "utf8")); total.fix1 = { started: new Date().toISOString(), why: "kit read TT_LANE_ID as undefined (DA state has no lane_id); ttflow panicked before any send" };
note({ ev: "fix1_start", why: total.fix1.why }); phase("GUEST fix1 ttflow again with the lane id ttd logged (first ttflow panicked on TT_LANE_ID before any send)");
const inner = 'set -e; set -a; . /workspace/ttt-runner/private/run.env; set +a; cd /run24r1/private/guest; mv -f ttflow.log ttflow-1-lane-id-bug.log; ' +
  'LANE=$(grep -oP "lane id=\\K[0-9]+" ttd.log | head -1); COV=$(node -e "console.log(require(\'/run24r1/private/guest/da-state.json\').covenant_id)"); ' +
  'OPK=$(node -e "console.log(require(\'/home/box/secure/ttt-guest-keys.json\').operator)"); [ -n "$LANE" ] && [ -n "$COV" ]; ' +
  'echo "$(date -u +%Y-%m-%dT%H:%M:%SZ) GUEST fix1 ttflow start (lane id from ttd log)" >> /run24r1/logs/guest-phase.log; ' +
  'set +e; TT_NETWORK=tn10 TT_LANE_ID=$LANE TT_COVENANT_ID=$COV TTFLOW_PRIVATE_KEY=$OPK TTFLOW_STEP_DELAY_MS=2000 RUST_LOG=info timeout 900 /workspace/tmp/bin-pr165/ttflow > ttflow.log 2>&1; RC=$?; ' +
  'N=$(grep -cE "Step [0-9.]+ \\(.*\\) accepted" ttflow.log); echo "$(date -u +%Y-%m-%dT%H:%M:%SZ) GUEST fix1 ttflow exit=$RC carriers_submit_ok=$N" >> /run24r1/logs/guest-phase.log';
const r = dk(["exec", NAME, "bash", "-c", inner], 960000);
note({ ev: "fix1_exec", status: r.status, err: clean(r.stderr || "") });
const ph = gphase(); for (const l of ph.split("\n").filter((x) => /fix1/.test(x))) note({ ev: "kit", line: clean(l) });
const em = ph.match(/fix1 ttflow exit=(\d+) carriers_submit_ok=(\d+)/); if (em) { total.ttflow_exit = Number(em[1]); total.submit_ok = Number(em[2]); }
const fl = (() => { try { return fs.readFileSync(GR + "\\private\\guest\\ttflow.log", "utf8"); } catch { return ""; } })();
const steps = []; for (const m of fl.matchAll(/(Step [0-9.]+ \([^)]*\)) accepted:\s*([0-9a-f]{64})/g)) steps.push({ step: m[1], id: m[2] });
total.ids_logged = steps.length;
const rj = [...new Set(fl.split("\n").filter((l) => /rejected|not submitted|Rejected|panic|error/i.test(l)).map((l) => clean(l.replace(/\x1b\[[0-9;]*m/g, ""))))].slice(0, 6);
total.reject_texts = rj; total.first_error = rj[0] || null;
fs.writeFileSync(P("private", "guest-ids.json"), JSON.stringify(steps));
const want = new Map(steps.map((s) => [s.id, s.step])); const got = new Set(); const cEnd = Date.now() + 4 * 60000; let cursor = startSink;
while (want.size && Date.now() < cEnd) {
  try { for (let k = 0; k < 50; k++) { const vc = await to(rpc.getVirtualChainFromBlock({ startHash: cursor, includeAcceptedTransactionIds: true }), 60000);
      for (const a of vc.acceptedTransactionIds || []) for (const id of a.acceptedTransactionIds || []) if (want.has(id)) got.add(id);
      const add = vc.addedChainBlockHashes || []; if ((vc.removedChainBlockHashes || []).length) cursor = startSink; if (!add.length) break; cursor = add[add.length - 1]; if (add.length < 1000) break; } }
  catch (e) { note({ ev: "vc_read_error", why: clean(e?.message || e) }); cursor = startSink; }
  if (got.size === want.size) break; await sleep(15000);
}
total.accepted_on_desk = got.size; total.accepted_steps = steps.filter((s) => got.has(s.id)).map((s) => s.step); total.not_accepted_steps = steps.filter((s) => !got.has(s.id)).map((s) => s.step);
total.confirmed_at = new Date().toISOString(); total.gate = "gate ok";
note({ ev: "confirm", fix1: true, submit_ok: total.submit_ok, ids_logged: total.ids_logged, accepted_on_desk: total.accepted_on_desk });
phase(`GUEST confirm (fix1) submit_ok=${total.submit_ok} ids_logged=${total.ids_logged} accepted_on_desk=${total.accepted_on_desk}`);
fs.writeFileSync(TOT, JSON.stringify(total, null, 1));
while (!fs.existsSync(P("control", "GUEST-STOP")) && !fs.existsSync(P("control", "PROBE-STOP"))) await sleep(3000);
const s2 = dk(["exec", NAME, "bash", "/workspace/ttt-runner/stop-guest.sh", "/run24r1"], 60000);
total.da_games = clean((s2.stdout || "").trim().replace(/\n/g, "; "));
dk(["rm", "-f", NAME], 60000);
total.stopped = new Date().toISOString(); fs.writeFileSync(TOT, JSON.stringify(total, null, 1)); note({ ev: "stopped", da_games: total.da_games });
phase("GUEST stopped (DA read, container removed)");
try { await rpc.disconnect(); } catch {}
process.exit(0);
