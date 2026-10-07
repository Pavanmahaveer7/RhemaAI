# Dump Postgres using DATABASE_URL. Install PostgreSQL client tools for pg_dump.
param([string]$OutFile = "")
if (-not $env:DATABASE_URL) { throw "Set DATABASE_URL first." }
if ($OutFile) {
  pg_dump $env:DATABASE_URL --no-owner --no-acl -F c -f $OutFile
  Write-Host "Wrote $OutFile"
} else {
  pg_dump $env:DATABASE_URL --no-owner --no-acl
}
