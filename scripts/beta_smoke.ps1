# Quick beta smoke against the web origin (Next rewrites /api/v1 to the API).
param([string]$Base = $env:BASE)
if (-not $Base) { $Base = "http://localhost:3000" }
$Base = $Base.TrimEnd("/")
$api = "$Base/api/v1"
$fail = 0
function Test-Json($name, $method, $path, $body) {
  try {
    $params = @{ Uri = "$api$path"; Method = $method; Headers = @{ Accept = "application/json" }; UseBasicParsing = $true }
    if ($body) { $params.Body = ($body | ConvertTo-Json); $params.ContentType = "application/json" }
    $r = Invoke-WebRequest @params
    Write-Host "OK  $name ($($r.StatusCode))"
  } catch {
    $code = $_.Exception.Response.StatusCode.value__
    Write-Host "FAIL $name ($code) $($_.Exception.Message)"
    $script:fail++
  }
}
Write-Host "Beta smoke -> $api"
Test-Json "terms search" GET "/terms?q=faith" $null
Test-Json "months current" GET "/months/current" $null
Test-Json "service status" GET "/status" $null
try {
  $st = (Invoke-WebRequest -Uri "$api/status" -UseBasicParsing).Content | ConvertFrom-Json
  $db = ($st | Where-Object { $_.name -eq "Database" } | Select-Object -First 1).status
  if ($db -eq "up") { Write-Host "OK  database persistence ($db)" }
  elseif ($db -eq "degraded") { Write-Host "WARN database in-memory ($db) - add Postgres: docs/vercel-live.md" }
  else { Write-Host "WARN database ($db)" }
} catch { Write-Host "WARN could not read database status" }
try {
  $r = Invoke-WebRequest -Uri "$api/feedback/beta-survey" -Method POST -Body '{"version":"smoke","answers":{"interest":"curious"},"from":"beta_smoke.ps1"}' -ContentType "application/json" -UseBasicParsing
  if ($r.StatusCode -eq 204) { Write-Host "OK  beta survey (204)" } else { Write-Host "FAIL beta survey ($($r.StatusCode))"; $fail++ }
} catch {
  Write-Host "FAIL beta survey $($_.Exception.Message)"; $fail++
}
if ($fail -gt 0) { exit 1 }
Write-Host "All smoke checks passed."
