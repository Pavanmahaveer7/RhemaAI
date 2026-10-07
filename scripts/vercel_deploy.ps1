# Deploy API + Web to Vercel (production). Requires: npx vercel login OR $env:VERCEL_TOKEN
param(
  [string]$ApiProject = "rhema-ai-api",
  [string]$WebProject = "rhema-ai-web",
  [string]$ApiBaseUrl = $env:VERCEL_API_BASE_URL,
  [string]$WebAlias = "https://rhema-ai-web.vercel.app",
  [string]$ApiAlias = "https://rhema-ai-api.vercel.app"
)

$root = Split-Path -Parent $PSScriptRoot
Set-Location $root
# Vercel CLI prints its banner on stderr; do not treat that as a terminating error.
$ErrorActionPreference = "Continue"

function Invoke-Vercel {
  param([Parameter(ValueFromRemainingArguments = $true)][string[]]$CliArgs)
  & npx --yes vercel@latest @CliArgs 2>&1 | Out-Host
  if ($LASTEXITCODE -ne 0) { throw "vercel failed ($LASTEXITCODE): $CliArgs" }
}

$prevEap = $ErrorActionPreference
$ErrorActionPreference = "Continue"
$who = (& npx --yes vercel@latest whoami 2>&1 | Out-String)
$ErrorActionPreference = $prevEap
if ($who -match "Logged out" -and -not $env:VERCEL_TOKEN) {
  Write-Host "Not logged in. Run:  npx vercel login"
  Write-Host "Or set VERCEL_TOKEN from https://vercel.com/account/tokens then re-run this script."
  exit 1
}

$secretFile = Join-Path $root ".vercel-demo.env.local"
if (-not (Test-Path $secretFile)) {
  $demo = "Demo$(Get-Random -Maximum 999999)!"
  @"
DEMO_SIGNIN_PASSWORD=$demo
CHECKIN_ENCRYPTION_KEY=$([Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 })))
AGENT_SERVICE_TOKEN=$([guid]::NewGuid())
INTEGRATION_WEBHOOK_SECRET=$([guid]::NewGuid())
"@ | Set-Content $secretFile -Encoding utf8
  Write-Host "Wrote secrets to .vercel-demo.env.local"
}
Get-Content $secretFile | ForEach-Object {
  if ($_ -match '^([A-Z_]+)=(.*)$') { Set-Item -Path "env:$($Matches[1])" -Value $Matches[2].Trim() }
}

function Set-VercelEnv {
  param([string]$Name, [string]$Value, [string]$Cwd, [string]$Type = "secret")
  $vercelArgs = @("env", "add", $Name, "production", "--force", "--yes", "--cwd", $Cwd)
  if ($Type -eq "config") { $vercelArgs += "--type", "config" }
  $Value | & npx --yes vercel@latest @vercelArgs 2>&1 | Out-Host
}

function Set-VercelAlias {
  param([string]$DeploymentUrl, [string]$AliasHost)
  $hostOnly = ($AliasHost -replace "^https?://", "").TrimEnd("/")
  & npx --yes vercel@latest alias set $DeploymentUrl $hostOnly 2>&1 | Out-Host
}

Write-Host "=== Deploy API ($ApiProject) from repo root (monorepo bundle) ==="
& npx --yes vercel@latest link --yes --project $ApiProject --cwd $root 2>&1 | Out-Host
foreach ($k in @("DEMO_SIGNIN_PASSWORD", "CHECKIN_ENCRYPTION_KEY", "AGENT_SERVICE_TOKEN", "INTEGRATION_WEBHOOK_SECRET")) {
  Set-VercelEnv -Name $k -Value (Get-Item "env:$k").Value -Cwd $root
}
$dbUrl = $env:DATABASE_URL
if (-not $dbUrl -and (Test-Path $secretFile)) {
  $line = Get-Content $secretFile | Where-Object { $_ -match '^DATABASE_URL=' } | Select-Object -First 1
  if ($line -match '^DATABASE_URL=(.*)$') { $dbUrl = $Matches[1].Trim() }
}
if ($dbUrl) {
  Write-Host "Setting DATABASE_URL + CONTRACT_STORE=postgres on API"
  Set-VercelEnv -Name "DATABASE_URL" -Value $dbUrl -Cwd $root
  Set-VercelEnv -Name "CONTRACT_STORE" -Value "postgres" -Cwd $root -Type config
} else {
  Write-Host "No DATABASE_URL - beta data stays in memory until you run scripts/vercel_set_database.ps1 (see docs/vercel-live.md)"
}
$apiOut = (& npx --yes vercel@latest deploy --prod --yes --cwd $root 2>&1 | Out-String)
Write-Host $apiOut
if ($apiOut -match "(https://[\w\-]+\.vercel\.app)") { $ApiBaseUrl = $Matches[1] }
if (-not $ApiBaseUrl) { throw "Could not detect API URL. Pass -ApiBaseUrl or set VERCEL_API_BASE_URL." }
Write-Host "API URL: $ApiBaseUrl"

Write-Host "`n=== Deploy Web ($WebProject) ==="
# Project Root Directory is apps/web — deploy from monorepo root so that path exists on Vercel.
& npx --yes vercel@latest link --yes --project $WebProject --cwd $root 2>&1 | Out-Host
Set-VercelEnv -Name "API_BASE_URL" -Value ($ApiAlias.TrimEnd("/")) -Cwd $root -Type config
$webOut = (& npx --yes vercel@latest deploy --prod --yes --cwd $root 2>&1 | Out-String)
Write-Host $webOut
$webUrl = $null
if ($webOut -match "(https://[\w\-]+\.vercel\.app)") { $webDeploy = $Matches[1] }

if ($webDeploy) {
  Write-Host "`n=== Aliases (stable share URLs) ==="
  Set-VercelAlias -DeploymentUrl $webDeploy -AliasHost $WebAlias
  if ($ApiBaseUrl) { Set-VercelAlias -DeploymentUrl $ApiBaseUrl -AliasHost $ApiAlias }
  $shareWeb = $WebAlias.TrimEnd("/")
  $shareApi = $ApiAlias.TrimEnd("/")

  Write-Host "`n=== Set APP_BASE_URL + API_BASE_URL ==="
  & npx --yes vercel@latest link --yes --project $ApiProject --cwd $root 2>&1 | Out-Null
  Set-VercelEnv -Name "APP_BASE_URL" -Value $shareWeb -Cwd $root -Type config
  & npx --yes vercel@latest link --yes --project $WebProject --cwd $root 2>&1 | Out-Null
  Set-VercelEnv -Name "API_BASE_URL" -Value $shareApi -Cwd $root -Type config
  Invoke-Vercel deploy --prod --yes --cwd $root
  & npx --yes vercel@latest link --yes --project $ApiProject --cwd $root 2>&1 | Out-Null
  Invoke-Vercel deploy --prod --yes --cwd $root

  Write-Host "`n=== Live app (share these) ==="
  Write-Host "Home:        $shareWeb/"
  Write-Host "App:         $shareWeb/app"
  Write-Host "Beta survey: $shareWeb/beta-survey"
  Write-Host "Staff:       $shareWeb/app#r=signin&staff=l3"
  Write-Host "Admin:       A-0100 (password in .vercel-demo.env.local)"
  Write-Host "Docs:        docs/beta-testers.md  docs/vercel-live.md"
  Write-Host "Smoke:       `$env:BASE='$shareWeb'; .\scripts\beta_smoke.ps1"
}
