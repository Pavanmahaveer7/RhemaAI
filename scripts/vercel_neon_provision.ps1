# Provision Neon on Vercel and wire DATABASE_URL to rhema-ai-api (free tier).
param(
  [string]$ApiProject = "rhema-ai-api",
  [string]$Region = "iad1"
)

$root = Split-Path -Parent $PSScriptRoot
Set-Location $root
$ErrorActionPreference = "Continue"

$termsUrl = "https://vercel.com/pavansingara-9546s-projects/~/integrations/accept-terms/neon?source=cli"
Write-Host "1) Accept Neon marketplace terms in your browser (one time):"
Write-Host "   $termsUrl"
Start-Process $termsUrl

Read-Host "2) Press Enter after you accepted the terms in the browser"

& npx --yes vercel@latest link --yes --project $ApiProject --cwd $root 2>&1 | Out-Host
$add = & npx --yes vercel@latest integration add neon --plan free_v3 -m "region=$Region" -m auth=false -n rhema-ai-beta-db -e production 2>&1 | Out-String
Write-Host $add
if ($add -match "action_required") {
  Write-Host "Terms not accepted yet. Open the URL above and run this script again."
  exit 1
}

Write-Host "`n3) Redeploying API with Postgres..."
& $PSScriptRoot\vercel_deploy.ps1 -ApiProject $ApiProject

Write-Host "`n4) Check database status:"
Write-Host "   (Invoke-WebRequest https://rhema-ai-web.vercel.app/api/v1/status -UseBasicParsing).Content"
