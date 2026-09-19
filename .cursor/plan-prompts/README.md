# Plan Mode prompt pack

Paste these into Cursor **Plan Mode** (Shift+Tab) in order. Each one:
- anchors on the repo's source-of-truth docs,
- forbids writing code until you approve,
- demands open questions instead of assumptions,
- saves its plan to `.cursor/plans/` (click "Save to workspace").

| # | File | When |
|---|---|---|
| 00 | `00-load-context.md` | Start of every new chat/session |
| 01 | `01-master-plan.md` | Once — whole-project plan |
| 02 | `02-architecture-lock.md` | Once — lock stack, API, data model; produce ADRs |
| 03 | `03-slice-plan.md` | Before every vertical slice |
| 04 | `04-execute-step.md` | Agent mode — execute one approved plan section |
| 05 | `05-agent-build.md` | Planning one of the 4 AI agents |
| 06 | `06-guardrails-plan.md` | Planning the gateway + guardrail pipeline |
| 07 | `07-metaprompt-agent.md` | Improving an agent's system prompt (paste into a strong model) |
| 08 | `08-debug-reset.md` | When the agent is looping on a bug |
| 09 | `09-review-plan-vs-code.md` | Before merging a slice |

Replace `{{...}}` placeholders before sending.
