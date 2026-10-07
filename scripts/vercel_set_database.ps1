# Attach Postgres so beta feedback, signups, and check-ins survive redeploys (Neon / Vercel Postgres).
param(
  [Parameter(Mandatory = $true)]
  [string]$DatabaseUrl,
  [string]$ApiProject = "rhema-ai-api"
)

$root = Split-Path -Parent $PSScriptRoot
Set-Location $root
$ErrorActionPreference = "Continue"

if ($DatabaseUrl -notmatch "^postgres") {
  Write-Error "DATABASE_URL must start with postgres:// or postgresql://"
  exit 1
}

& npx --yes vercel@latest link --yes --project $ApiProject --cwd $root 2>&1 | Out-Host
$DatabaseUrl | & npx --yes vercel@latest env add DATABASE_URL production --force --yes --cwd $root 2>&1 | Out-Host
"postgres" | & npx --yes vercel@latest env add CONTRACT_STORE production --force --type config --cwd $root 2>&1 | Out-Host

Write-Host "`nRedeploying API..."
& npx --yes vercel@latest deploy --prod --yes --cwd $root 2>&1 | Out-Host

Write-Host "`nVerify (Database should be 'up' after ~30s):"
Write-Host "  Invoke-WebRequest https://rhema-ai-web.vercel.app/api/v1/status -UseBasicParsing | Select -Expand Content"
