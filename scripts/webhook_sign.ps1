# Print X-Signature for POST /api/v1/integrations/webhook/:app (local testing).
param(
  [Parameter(Mandatory = $true)]
  [string]$Body,
  [string]$Secret = $env:INTEGRATION_WEBHOOK_SECRET
)
if (-not $Secret) { $Secret = "local-webhook-secret" }
$bytes = [System.Text.Encoding]::UTF8.GetBytes($Body)
$hmac = [System.Security.Cryptography.HMACSHA256]::new([System.Text.Encoding]::UTF8.GetBytes($Secret))
$sig = [BitConverter]::ToString($hmac.ComputeHash($bytes)).Replace("-", "").ToLower()
Write-Host "X-Signature: $sig"