# Local full stack on dedicated ports (avoids 3000/8000 if something else is running).
param(
  [int]$ApiPort = 8010,
  [int]$WebPort = 3010,
  [switch]$Postgres,
  [switch]$Docker,
  [switch]$NoKillPorts
)

if (-not $NoKillPorts) {
  try {
    Push-Location (Join-Path (Split-Path -Parent $PSScriptRoot) "apps\web")
    npx --yes kill-port $ApiPort $WebPort 2>&1 | Out-Null
  } catch { } finally { Pop-Location }
}

& (Join-Path $PSScriptRoot "run_local.ps1") -ApiPort $ApiPort -WebPort $WebPort @PSBoundParameters
