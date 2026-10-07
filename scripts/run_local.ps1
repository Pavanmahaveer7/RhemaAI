# Start API + Next.js for local sharing / UI tests.
param(
  [int]$ApiPort = 8000,
  [int]$WebPort = 3000,
  [switch]$Postgres
)

$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

$env:LLM_MODE = "off"
$env:APP_ENV = "development"
if (-not $env:DEMO_SIGNIN_PASSWORD) { $env:DEMO_SIGNIN_PASSWORD = "dev-only-change-me" }
if (-not $env:CHECKIN_ENCRYPTION_KEY) { $env:CHECKIN_ENCRYPTION_KEY = "local-dev-checkin-key-32chars!!" }
if (-not $env:AGENT_SERVICE_TOKEN) { $env:AGENT_SERVICE_TOKEN = "local-agent-token" }
if (-not $env:INTEGRATION_WEBHOOK_SECRET) { $env:INTEGRATION_WEBHOOK_SECRET = "local-webhook-secret" }

if ($Postgres) {
  $env:CONTRACT_STORE = "postgres"
  if (-not $env:DATABASE_URL) { $env:DATABASE_URL = "postgresql://app:app@localhost:5432/church_ai" }
} else {
  $env:CONTRACT_STORE = "memory"
}

$env:API_BASE_URL = "http://127.0.0.1:$ApiPort"

Write-Host "Starting API on http://127.0.0.1:$ApiPort (CONTRACT_STORE=$env:CONTRACT_STORE)"
$apiArgs = @(
  "/c", "uv run --package church-ai-api uvicorn app.main:app --app-dir apps/api/src --host 127.0.0.1 --port $ApiPort"
)
$api = Start-Process -PassThru -WindowStyle Hidden -WorkingDirectory $root -FilePath "cmd.exe" -ArgumentList $apiArgs

Start-Sleep -Seconds 3
Write-Host "Starting Next on http://localhost:$WebPort"
$webArgs = @("/c", "corepack enable && pnpm --filter web exec next dev -H 127.0.0.1 -p $WebPort")
$web = Start-Process -PassThru -WindowStyle Hidden -WorkingDirectory $root -FilePath "cmd.exe" -ArgumentList $webArgs

Write-Host ""
Write-Host "Open:"
Write-Host "  http://localhost:$WebPort/app"
Write-Host "  http://localhost:$WebPort/pastor"
Write-Host "  http://localhost:$WebPort/design/ui_kits/smoke.html"
Write-Host "Sign-in: A-0100 / dev-only-change-me (default)"
Write-Host ""
Write-Host "API PID $($api.Id)  Web PID $($web.Id)  - stop: Stop-Process -Id $($api.Id),$($web.Id)"
