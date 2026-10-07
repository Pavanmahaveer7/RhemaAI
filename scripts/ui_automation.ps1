# Full UI automation: headless screen smoke + optional flow page (browser flows need manual or flows runner).
param(
  [string]$Base = $env:BASE,
  [switch]$SkipFlows,
  [switch]$InstallBrowser
)

$root = Split-Path -Parent $PSScriptRoot
if (-not $Base) { $Base = "http://127.0.0.1:3000" }
$Base = $Base.TrimEnd("/")
$env:BASE = $Base

Set-Location $root

try {
  $ping = Invoke-WebRequest -Uri "$Base/design/ui_kits/landing/index.html" -UseBasicParsing -TimeoutSec 8
  if ($ping.StatusCode -ne 200) { throw "status $($ping.StatusCode)" }
} catch {
  Write-Host "Web not reachable at $Base — start with: .\scripts\run_local.ps1 or pnpm dev:web"
  exit 1
}

if ($InstallBrowser) {
  Write-Host "Installing Playwright Chromium..."
  pnpm exec playwright install chromium
}

Write-Host "UI screen smoke (headless) -> $Base`n"
pnpm exec node scripts/ui_smoke.mjs
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

if (-not $SkipFlows) {
  Write-Host "`nUI guardrails (input + flows.html, headless) -> $Base"
  pnpm exec node scripts/ui_guardrails.mjs
  if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}

Write-Host "`nAll automated UI checks passed."
