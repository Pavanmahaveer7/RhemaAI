# Link GitHub repo to Vercel for deploy-on-push (run after GitHub is connected to your Vercel account).
param(
  [string]$Repo = "https://github.com/Pavanmahaveer7/RhemaAI",
  [string]$ApiProject = "rhema-ai-api",
  [string]$WebProject = "rhema-ai-web"
)

$root = Split-Path -Parent $PSScriptRoot
Set-Location $root
$ErrorActionPreference = "Continue"

$connectionsUrl = "https://vercel.com/account/login-connections"
Write-Host "Step 1: Connect GitHub to Vercel (one time, in browser):"
Write-Host "  $connectionsUrl"
Write-Host "  Click GitHub -> Connect / Authorize Vercel."
Start-Process $connectionsUrl
Read-Host "Press Enter after GitHub shows Connected on that page"

function Connect-Project {
  param([string]$Project)
  Write-Host "`nConnecting $Repo -> $Project ..."
  & npx --yes vercel@latest link --yes --project $Project --cwd $root 2>&1 | Out-Host
  & npx --yes vercel@latest git connect $Repo --yes --cwd $root 2>&1 | Out-Host
  if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed for $Project. Finish GitHub connection or link the repo in the Vercel dashboard."
    return $false
  }
  return $true
}

$okApi = Connect-Project $ApiProject
$okWeb = Connect-Project $WebProject

Write-Host "`nStep 2: Confirm Root Directory in Vercel dashboard (monorepo):"
Write-Host "  $ApiProject  -> Settings -> General -> Root Directory: .  (repo root)"
Write-Host "  $WebProject  -> Settings -> General -> Root Directory: apps/web"
Write-Host "  Production branch: main for both."

if ($okApi -and $okWeb) {
  Write-Host "`nDone. Push to main to trigger deploys:"
  Write-Host "  git push origin main"
} else {
  Write-Host "`nDashboard fallback: Project -> Settings -> Git -> Connect Repository -> $Repo"
}
