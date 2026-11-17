# Start n8n (workflow automation) on http://localhost:5678 — pastor alerts, SMS glue, integrations.
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

docker compose --profile n8n up -d n8n
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host ""
Write-Host "n8n UI:     http://localhost:5678"
Write-Host "Docs:       docs/n8n.md"
Write-Host "Stop:       docker compose --profile n8n stop n8n"
Write-Host ""
Write-Host "Point the API at your webhook, e.g.:"
Write-Host "  `$env:N8N_WEBHOOK_URL='http://localhost:5678/webhook/rhema-events'"
Write-Host "  (create that Webhook workflow in n8n first)"