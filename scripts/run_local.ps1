# Start API + Next.js for local sharing / UI tests.
param(
  [int]$ApiPort = 8000,
  [int]$WebPort = 3000,
  [switch]$Postgres,
  [switch]$Docker,
  [switch]$NoKillPorts
)

$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

if (-not $NoKillPorts) {
  try {
    Push-Location (Join-Path $root "apps\web")
    npx --yes kill-port $ApiPort $WebPort 2>&1 | Out-Null
  } catch { } finally { Pop-Location }
}

$env:LLM_MODE = "off"
# HF embeddings: apps/api/.env.local is loaded by the API (gitignored). Chat stays off.
$env:APP_ENV = "development"
# Always use the documented local password (ignore Vercel .env on your machine).
$env:DEMO_SIGNIN_PASSWORD = "dev-only-change-me"
$env:STAFF_PHONE_OTP_DEMO = "true"
$env:STAFF_PHONE_REGISTER = "true"
$env:BETA_SHARED_STAFF_LOGIN = "true"
if (-not $env:CHECKIN_ENCRYPTION_KEY) { $env:CHECKIN_ENCRYPTION_KEY = "local-dev-checkin-key-32chars!!" }
if (-not $env:AGENT_SERVICE_TOKEN) { $env:AGENT_SERVICE_TOKEN = "local-agent-token" }
if (-not $env:INTEGRATION_WEBHOOK_SECRET) { $env:INTEGRATION_WEBHOOK_SECRET = "local-webhook-secret" }

if ($Docker -or $Postgres) {
  if ($Docker) { docker compose up -d postgres | Out-Null; Start-Sleep -Seconds 3 }
  $env:CONTRACT_STORE = "postgres"
  if (-not $env:DATABASE_URL) { $env:DATABASE_URL = "postgresql://app:app@localhost:5432/church_ai" }
} else {
  $env:CONTRACT_STORE = "memory"
  Remove-Item Env:DATABASE_URL -ErrorAction SilentlyContinue
}
if (-not $env:FEEDBACK_CSV_PATH) { $env:FEEDBACK_CSV_PATH = Join-Path $root "data\rhema-beta-feedback.csv" }

$env:API_BASE_URL = "http://127.0.0.1:$ApiPort"

Write-Host "Starting API on http://127.0.0.1:$ApiPort (CONTRACT_STORE=$env:CONTRACT_STORE)"
$apiEnv = "set DEMO_SIGNIN_PASSWORD=dev-only-change-me&& set APP_ENV=development&& set CONTRACT_STORE=$env:CONTRACT_STORE&& set FEEDBACK_CSV_PATH=$env:FEEDBACK_CSV_PATH&& set STAFF_PHONE_OTP_DEMO=true&& set STAFF_PHONE_REGISTER=true&& set BETA_SHARED_STAFF_LOGIN=true&& set LLM_MODE=off&& "
if ($env:CONTRACT_STORE -eq "postgres" -and $env:DATABASE_URL) {
  $apiEnv += "set DATABASE_URL=$($env:DATABASE_URL)&& "
} elseif ($env:CONTRACT_STORE -eq "memory") {
  $apiEnv += "set DATABASE_URL=&& "
}
$apiArgs = @(
  "/c", "${apiEnv}uv run --package church-ai-api uvicorn app.main:app --app-dir apps/api/src --host 127.0.0.1 --port $ApiPort"
)
$api = Start-Process -PassThru -WindowStyle Hidden -WorkingDirectory $root -FilePath "cmd.exe" -ArgumentList $apiArgs

Start-Sleep -Seconds 3
$devEnvFile = Join-Path $root "apps\web\.env.development.local"
Set-Content -Path $devEnvFile -Encoding utf8 -Value "API_BASE_URL=http://127.0.0.1:$ApiPort"
Write-Host "Wrote $devEnvFile (local API only, not production)"
Write-Host "Starting Next on http://localhost:$WebPort"
$webArgs = @("/c", "cd apps\web && npx next dev -H 127.0.0.1 -p $WebPort")
$web = Start-Process -PassThru -WindowStyle Hidden -WorkingDirectory $root -FilePath "cmd.exe" -ArgumentList $webArgs

Write-Host ""
Write-Host "Open:"
Write-Host "  http://127.0.0.1:$WebPort/local     (app map - one page for every screen)"
Write-Host "  http://127.0.0.1:$ApiPort/api/v1/status  (API direct)"
Write-Host "Sign-in: A-0100 / dev-only-change-me (default); staff P-0233 same password"
Write-Host "Different ports: .\scripts\run_local_demo.ps1  (web :3010, API :8010)"
Write-Host "  or: .\scripts\run_local.ps1 -WebPort 3010 -ApiPort 8010"
Write-Host "Feedback CSV: $env:FEEDBACK_CSV_PATH"
Write-Host "Feedback map: docs/feedback-where.md"
Write-Host ""
Write-Host "API PID $($api.Id)  Web PID $($web.Id)  - stop: Stop-Process -Id $($api.Id),$($web.Id)"
