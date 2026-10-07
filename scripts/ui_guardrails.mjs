#!/usr/bin/env node
/**
 * Headless input/guardrail tests: tests.html (CAInput, CAGuard) + flows.html (monthly gibberish, injection, PII, …).
 * Usage: BASE=http://127.0.0.1:3000 node scripts/ui_guardrails.mjs
 * Requires: pnpm exec playwright install chromium (once)
 */
import { chromium } from "playwright";

const BASE = (process.env.BASE || "http://127.0.0.1:3000").replace(/\/$/, "");
const TESTS_TIMEOUT_MS = Number(process.env.UI_TESTS_TIMEOUT_MS || 120_000);
const FLOWS_TIMEOUT_MS = Number(process.env.UI_FLOWS_TIMEOUT_MS || 600_000);
const failFast = process.env.UI_GUARDRAILS_FAIL_FAST === "1";

async function runHarness({ name, path, globalKey, timeoutMs }) {
  const url = `${BASE}${path}`;
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const consoleErrors = [];
  page.on("pageerror", (e) => consoleErrors.push(String(e.message || e).slice(0, 200)));
  page.on("console", (msg) => {
    if (msg.type() !== "error") return;
    const t = msg.text();
    if (/Warning:|DevTools|babel|in-browser|Failed to load resource/i.test(t)) return;
    consoleErrors.push(t.slice(0, 200));
  });

  console.log(`\n=== ${name} ===\n${url}\n`);
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60_000 });
  await page.waitForFunction(
    (key) => {
      const r = window[key];
      if (!r || typeof r.total !== "number") return false;
      const fails = Array.isArray(r.fails) ? r.fails.length : r.total - r.pass;
      return r.pass + fails >= r.total;
    },
    globalKey,
    { timeout: timeoutMs, polling: 500 }
  );

  const result = await page.evaluate((key) => window[key], globalKey);
  await browser.close();

  const failCount = Array.isArray(result.fails) ? result.fails.length : result.total - result.pass;
  const ok = failCount === 0 && consoleErrors.length === 0;
  console.log(`${ok ? "OK " : "FAIL"}  ${result.pass} / ${result.total} passed`);
  if (failCount > 0) {
    for (const row of result.fails.slice(0, 15)) {
      const line = Array.isArray(row) ? row.join(" — ") : String(row);
      console.log(`  · ${line}`);
    }
    if (result.fails.length > 15) console.log(`  · … and ${result.fails.length - 15} more`);
  }
  if (consoleErrors.length > 0) {
    console.log(`  console errors: ${consoleErrors[0]}`);
  }
  return { ok, result, consoleErrors };
}

let failed = 0;

const input = await runHarness({
  name: "Input & guard component tests (tests.html)",
  path: "/design/ui_kits/tests.html",
  globalKey: "__tests",
  timeoutMs: TESTS_TIMEOUT_MS,
});
if (!input.ok) {
  failed++;
  if (failFast) process.exit(1);
}

const flows = await runHarness({
  name: "Sanitization flow tests (flows.html)",
  path: "/design/ui_kits/flows.html",
  globalKey: "__flows",
  timeoutMs: FLOWS_TIMEOUT_MS,
});
if (!flows.ok) failed++;

console.log(`\n--- Guardrails UI: ${failed === 0 ? "all passed" : failed + " harness(es) failed"} ---`);
process.exit(failed > 0 ? 1 : 0);
