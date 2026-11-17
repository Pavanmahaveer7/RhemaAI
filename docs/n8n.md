# n8n workflows (pastor layer + integrations)

[n8n](https://n8n.io/) runs **outside** the Rhema app. Use it for SMS OTP, email/Slack alerts, and Planning Center glue — not for storing Care notes or map data.

## Start n8n locally

```powershell
cd church-ai-stack
.\scripts\run_n8n.ps1
```

Open **http://localhost:5678**, create an owner account on first visit.

Requires Docker Desktop.

## Two directions

| Direction | Use |
|-----------|-----|
| **Rhema → n8n** | Crisis check-in, new beta survey — small JSON, no struggles/wins text |
| **n8n → Rhema** | Push ministry/community **rows** into `imported_rows` (signed webhook) |

## Rhema → n8n (outbound)

Set on the API (local `run_local.ps1` or Vercel env):

| Variable | Example |
|----------|---------|
| `N8N_WEBHOOK_URL` or `ESCALATION_NOTIFY_WEBHOOK` | `http://localhost:5678/webhook/rhema-events` |
| `INTEGRATION_WEBHOOK_SECRET` | Same as inbound; optional `X-Signature` HMAC on outbound |

Events (see `app/v1/workflow_events.py`):

| Event | When |
|-------|------|
| `checkin.crisis` | Pastor check-in matched crisis rules |
| `feedback.beta_survey` | Beta survey saved (metadata only; not free-text answers) |

**In n8n:** Workflow → **Webhook** trigger → path `rhema-events` → respond 200 → add Slack/Email/SMS nodes as needed.

For **staff OTP via Twilio**, use n8n: Webhook ← Rhema SMS trigger (future) or call Twilio node after `auth/staff/phone/send` is extended to call n8n.

## n8n → Rhema (inbound)

```http
POST http://127.0.0.1:8000/api/v1/integrations/webhook/n8n
Content-Type: application/json
X-Signature: <hmac-sha256 of body with INTEGRATION_WEBHOOK_SECRET>
```

Body example (no `stage`, no names on the map):

```json
{
  "kind": "activity",
  "churchId": "church-us",
  "payload": { "title": "Youth group", "when": "Sunday" }
}
```

Sign locally:

```powershell
.\scripts\webhook_sign.ps1 -Body '{"kind":"activity","churchId":"church-us","payload":{}}'
```

## Suggested pastor workflows (import ideas)

1. **Crisis ping** — Webhook `rhema-events` → IF `event == checkin.crisis` → email mentor list.
2. **Beta digest** — `feedback.beta_survey` → append row to Google Sheet (no user comment field).
3. **OTP SMS** — (when Twilio creds exist) HTTP from API or n8n sub-workflow on `staff.otp.requested`.
4. **Planning Center** — Schedule sync → transform → inbound webhook `n8n` (ministry rows only).

## Production

- Do **not** expose n8n on the public internet without auth/TLS.
- On Vercel, point `N8N_WEBHOOK_URL` at your hosted n8n webhook URL (n8n cloud or self-hosted).
- Care note text never appears in workflow payloads.

See also: `contract/api.md` (integrations), `docs/beta-pastor-invite.md`, `.env.example`.