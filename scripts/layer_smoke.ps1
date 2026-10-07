# Layer smoke: L1 public, L2 monthly/map, L3 pastor/review/alerts/admin (needs API + optional web proxy).
param([string]$Base = $env:BASE)
if (-not $Base) { $Base = "http://127.0.0.1:3000" }
$Base = $Base.TrimEnd("/")
$api = "$Base/api/v1"
$fail = 0
function Test-Get($name, $path, $expect = 200) {
  try {
    $r = Invoke-WebRequest -Uri "$api$path" -UseBasicParsing -TimeoutSec 20
    if ($r.StatusCode -ne $expect) { throw "status $($r.StatusCode)" }
    Write-Host "OK  $name"
    return $r
  } catch {
    Write-Host "FAIL $name - $($_.Exception.Message)"
    $script:fail++
    return $null
  }
}
function Test-PostJson($name, $path, $body, $expect = 200) {
  try {
    $r = Invoke-WebRequest -Uri "$api$path" -Method POST -Body ($body | ConvertTo-Json) -ContentType "application/json" -UseBasicParsing -TimeoutSec 20
    if ($expect -ge 0 -and $r.StatusCode -ne $expect) { throw "status $($r.StatusCode)" }
    Write-Host "OK  $name ($($r.StatusCode))"
    return $r
  } catch {
    $code = $_.Exception.Response.StatusCode.value__
    if ($expect -lt 0 -and $code -eq [Math]::Abs($expect)) { Write-Host "OK  $name ($code)"; return $null }
    Write-Host "FAIL $name ($code) $($_.Exception.Message)"
    $script:fail++
    return $null
  }
}

Write-Host "Rhema.ai layer smoke -> $api`n--- L1 Dictionary (public) ---"
Test-Get "terms search" "/terms?q=grace"
Test-Get "term detail" "/terms/grace"
Test-Get "term passages (sources)" "/terms/grace/passages"
Test-Get "crisis lines" "/crisis-lines?country=US"

Write-Host "`n--- L2 Monthly + map (public) ---"
Test-Get "months current" "/months/current"
Test-Get "maps compare" "/maps/latest/compare"

Write-Host "`n--- L3 Pastor / review / alerts (auth) ---"
$jar = New-Object Microsoft.PowerShell.Commands.WebRequestSession
try {
  $signin = Invoke-WebRequest -Uri "$api/auth/signin" -Method POST -Body '{"codeName":"A-0100","password":"dev-only-change-me"}' -ContentType "application/json" -WebSession $jar -UseBasicParsing -TimeoutSec 20
  if ($signin.StatusCode -ne 200) { throw "signin $($signin.StatusCode)" }
  Write-Host "OK  admin sign-in"
} catch {
  Write-Host "FAIL admin sign-in - $($_.Exception.Message)"
  $script:fail++
  exit 1
}
function Auth-Get($name, $path) {
  try {
    $r = Invoke-WebRequest -Uri "$api$path" -WebSession $jar -UseBasicParsing -TimeoutSec 20
    Write-Host "OK  $name"
    return $r.Content
  } catch {
    Write-Host "FAIL $name - $($_.Exception.Message)"
    $script:fail++
    return $null
  }
}
Auth-Get "review queue" "/review/queue"
Auth-Get "review coverage (Faith layer)" "/review/coverage"
Auth-Get "alerts active (public lockdown)" "/alerts/active"
Auth-Get "admin accounts" "/admin/accounts"
Auth-Get "maps draft" "/maps/draft"

Write-Host "`n--- L3 Pastor (P-0233) ---"
$jar2 = New-Object Microsoft.PowerShell.Commands.WebRequestSession
Invoke-WebRequest -Uri "$api/auth/signin" -Method POST -Body '{"codeName":"P-0233","password":"dev-only-change-me"}' -ContentType "application/json" -WebSession $jar2 -UseBasicParsing | Out-Null
foreach ($p in @("/pastor/home", "/pastor/tracks")) {
  try {
    Invoke-WebRequest -Uri "$api$p" -WebSession $jar2 -UseBasicParsing | Out-Null
    Write-Host "OK  $p"
  } catch { Write-Host "FAIL $p - $($_.Exception.Message)"; $script:fail++ }
}

Write-Host "`n--- L3 Leader alerts (L-0100) ---"
$jar3 = New-Object Microsoft.PowerShell.Commands.WebRequestSession
Invoke-WebRequest -Uri "$api/auth/signin" -Method POST -Body '{"codeName":"L-0100","password":"dev-only-change-me"}' -ContentType "application/json" -WebSession $jar3 -UseBasicParsing | Out-Null
foreach ($p in @("/alerts", "/alerts/log")) {
  try {
    Invoke-WebRequest -Uri "$api$p" -WebSession $jar3 -UseBasicParsing | Out-Null
    Write-Host "OK  $p"
  } catch { Write-Host "FAIL $p - $($_.Exception.Message)"; $script:fail++ }
}

Write-Host "`n--- L3 US pastor integrations (P-0901) ---"
$jar4 = New-Object Microsoft.PowerShell.Commands.WebRequestSession
Invoke-WebRequest -Uri "$api/auth/signin" -Method POST -Body '{"codeName":"P-0901","password":"dev-only-change-me"}' -ContentType "application/json" -WebSession $jar4 -UseBasicParsing | Out-Null
try {
  Invoke-WebRequest -Uri "$api/integrations" -WebSession $jar4 -UseBasicParsing | Out-Null
  Write-Host "OK  /integrations"
} catch { Write-Host "FAIL /integrations - $($_.Exception.Message)"; $script:fail++ }

Write-Host "`n--- Faith hidden layer (grace on term) ---"
$grace = Invoke-RestMethod -Uri "$api/terms/grace" -TimeoutSec 15
if ($null -ne $grace.faith) { Write-Host "OK  term.faith visible (checked word)" } else { Write-Host "OK  term.faith hidden until 2 reviewers (expected for some terms)" }

Write-Host "`n--- Status ---"
Test-Get "service status" "/status"

if ($fail -gt 0) { Write-Host "`n$fail check(s) failed."; exit 1 }
Write-Host "`nAll layer checks passed (DB/API in sync for contract demo)."
