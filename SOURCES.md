# Sources & provenance

What in this repo came from where. Everything project-specific (rules, skills, schemas, evals,
plan prompts, guardrail design) was written for this project by applying these sources.

| Source | What we took | Where it shows up |
|---|---|---|
| gstack (github.com/garrytan/gstack, MIT) | Sprint process (Think → Plan → Build → Review → Test → Ship → Reflect), skill-as-Markdown pattern, which skills to use when | `docs/gstack-workflow.md`, `.cursor/skills/*` (same SKILL.md format), `AGENTS.md` workflow |
| YC Startup School — "How To Get The Most Out Of Vibe Coding" (Tom Blomfield + X25 founders) | Plan in a repo markdown file, section-by-section build, tests first, commit/reset, future-ideas section | `docs/prompting-playbook.md` §A, `.cursor/plan-prompts/*` |
| YC Lightcone — "State-of-the-Art Prompting for AI Agents" (via third-party write-up) | Parahelp-style structured prompts, metaprompting, escape hatches, debug field, evals as the asset | `docs/prompting-playbook.md` §B, `07-metaprompt-agent.md`, agent prompt template |
| Cursor docs — Plan Mode, "Best practices for coding with agents" | Plan Mode flow, save plans to `.cursor/plans/`, revert-and-replan | `.cursor/plan-prompts/*`, playbook §A |
| Anthropic — Prompting best practices | Be explicit, give reasons, XML tags, 3–5 examples | Playbook §A5–A6, §B6; all plan prompts |
| Our architecture diagram (built in chat from the reference bank diagram) | Layout, SWE vs AI colour split | `docs/architecture-diagram.png/.svg`, `docs/architecture.md` |
| Reference guardrails architecture (video diagram) | Input / output / tool guardrail layers | `docs/guardrails.md`, `.cursor/rules/guardrails.mdc` |
| Your build plan document | Three layers, agents, cut list, demo flow — kept verbatim in `docs/build-plan.md` | `docs/build-plan.md`, `AGENTS.md`, `docs/architecture.md`, `docs/api.md`, `docs/demo-script.md` |

gstack itself is **not** vendored here — install it with `./setup --host cursor` (see `docs/gstack-workflow.md`).
