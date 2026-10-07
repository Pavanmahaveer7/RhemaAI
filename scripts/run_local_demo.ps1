# Local full stack on dedicated ports (use when 3000/8000 are taken).
# Demo: http://127.0.0.1:3010/local
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

$splat = @{ ApiPort = $ApiPort; WebPort = $WebPort; NoKillPorts = $true }
if ($Postgres) { $splat.Postgres = $true }
if ($Docker) { $splat.Docker = $true }
& (Join-Path $PSScriptRoot "run_local.ps1") @splat
