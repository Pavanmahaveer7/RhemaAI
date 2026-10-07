#!/usr/bin/env node
/**
 * Headless UI smoke: every screen in screens-manifest.json (fixture api=0 on staff routes).
 * Usage: BASE=http://127.0.0.1:3000 node scripts/ui_smoke.mjs
 * Requires: pnpm exec playwright install chromium (once)
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = join(root, "apps/web/public/design/ui_kits/screens-manifest.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const BASE = (process.env.BASE || "http://127.0.0.1:3000").replace(/\/$/, "");
const kit = manifest.basePath || "/design/ui_kits/";
const WAIT_MS = Number(process.env.UI_SMOKE_WAIT_MS || 4500);
const failFast = process.env.UI_SMOKE_FAIL_FAST === "1";

let failed = 0;
const results = [];

async function checkScreen(page, screen) {
  const url = `${BASE}${kit}${screen.url}`;
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e.message || e).slice(0, 160)));
  page.on("console", (msg) => {
    if (msg.type() !== "error") return;
    const t = msg.text();
    if (/Warning:|DevTools|babel|in-browser|Failed to load resource/i.test(t)) return;
    errors.push(t.slice(0, 160));
  });
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(WAIT_MS);
    const text = ((await page.locator("body").innerText()) || "").trim();
    const blank = text.length < 20 && !/plain\.html/.test(page.url());
    const expectRe = new RegExp(screen.expect, "i");
    const contentOk = screen.expect === "." ? text.length >= 20 : expectRe.test(text);
    const ok = !blank && errors.length === 0 && contentOk;
    let detail = ok ? `${text.length} chars` : blank ? "blank page" : errors[0] || `expected /${screen.expect}/`;
    if (!ok && !blank && errors.length === 0 && !contentOk) {
      detail = `missing /${screen.expect}/ · ${text.replace(/\s+/g, " ").slice(0, 100)}`;
    }
    return { ok, detail };
  } catch (e) {
    return { ok: false, detail: String(e.message || e).slice(0, 200) };
  }
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 390, height: 844 } });

for (const screen of manifest.screens) {
  const page = await context.newPage();
  const { ok, detail } = await checkScreen(page, screen);
  await page.close();
  results.push({ name: screen.name, ok, detail });
  const mark = ok ? "OK " : "FAIL";
  console.log(`${mark}  ${screen.name} — ${detail}`);
  if (!ok) {
    failed++;
    if (failFast) break;
  }
}

await browser.close();

console.log(`\n--- ${manifest.screens.length - failed} / ${manifest.screens.length} screens passed ---`);
if (failed > 0) process.exit(1);
