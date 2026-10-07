# Print random values for Render Dashboard secrets (church-ai-api).
# Copy each line into Render → church-ai-api → Environment.
Write-Host "Paste these into Render (church-ai-api secrets):"
Write-Host ""
Write-Host "DEMO_SIGNIN_PASSWORD=$([Convert]::ToBase64String((1..24 | ForEach-Object { Get-Random -Maximum 256 })))"
Write-Host "CHECKIN_ENCRYPTION_KEY=$([Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 })))"
Write-Host "AGENT_SERVICE_TOKEN=$([guid]::NewGuid().Guid)"
Write-Host "INTEGRATION_WEBHOOK_SECRET=$([guid]::NewGuid().Guid)"
Write-Host ""
Write-Host "Optional CORS_ORIGINS=https://your-marketing-site.example (comma-separated)"
Write-Host "After deploy: `$env:BASE='https://church-ai-web.onrender.com'; .\scripts\beta_smoke.ps1"
