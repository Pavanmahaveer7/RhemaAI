# Vibe security — use when we build

Saved so the build follows these checks. Not implemented yet, except the three items marked already true.

Two sources:

- [Vibe Security skill](https://github.com/raroque/vibe-security-skill) — a checklist an agent reads. It does not run on our server. Markdown only. No instruction in that repo to send code or keys anywhere.
- [A simple security checklist](https://gist.github.com/mattppal/5c01ef4447e94515a03314db1ef2403e) — frontend, backend, and habits.

Our stack ([ADR-004](adr/ADR-004-tech-stack.md)): Next.js, FastAPI, Postgres and Auth on Supabase (planned, not wired), Redis, Memgraph, Anthropic through `packages/llm-gateway` only, Cloudflare, Vercel, Railway or Render. Local dev is Docker Postgres, Redis, and Memgraph. `.env.example` has `AUTH_PROVIDER=supabase`. No Supabase or Firebase package is imported yet.

Firebase, Firestore, and Convex are not in this stack. There is no Stripe checkout. The phone app is later.

## Use from the Vibe Security skill

- **Secrets and environment variables.** The model key and any church secret stay in the API. The browser may know the API address (`NEXT_PUBLIC_API_BASE_URL`) and nothing else. `.env` stays gitignored.
- **Auth.** When Supabase Auth is on, FastAPI verifies the token. A role sent from the browser is not trusted. Pastor, reviewer, and leader routes check the caller on the server. Layer 1 stays public.
- **Supabase row security.** Once Auth is on, the public key cannot read check-ins. Pastor rows stay behind the API.
- **Rate limits.** Cap the model call and the public write routes (compare, monthly answer). Return a clear error when the cap is hit. Redis holds the counters. Cloudflare is the edge limit.
- **Deployment.** HTTPS on the site and the API. Cloudflare in front for DDoS protection. No debug mode and no source maps that expose the server.
- **Database access.** Queries stay parameterized. No raw SQL built from user text.
- **AI rules.** The model is called only from the gateway. Cap use. Check-in text cannot steer the packet. The model’s reply is not the decision. One retry, then fail closed. Do not render model text as HTML.

## Use from the simple checklist

- HTTPS everywhere, once deployed. Local dev may stay on localhost.
- Validate input. Public text fields stay within the API limits (body ≤ 16 KB, free text ≤ 1,000 characters).
- Do not store pastor notes, packets, or alerts in `localStorage`. A search may stay in the tab until it closes. A downloaded dictionary may stay on the device. Secrets never stay in the browser.
- When cookie sign-in exists: `HttpOnly`, `Secure`, and `SameSite` cookies, and protection against cross-site posts on any request that changes data.
- Authorization before every pastor, reviewer, and leader action.
- Security headers: `X-Frame-Options`, `X-Content-Type-Options`, and HSTS. `next.config.ts` does not set these yet.
- Errors stay a code, a short message, and a request id. No stack trace to the client.
- Update dependencies before a deploy.
- Rate limit authentication and the model call.

## Already true — do not undo

- Dictionary search uses parameters (`%s` in `packages/mcp/vocab`).
- The web app does not put a model key in the browser. Pages only read `NEXT_PUBLIC_API_BASE_URL`.
- Screen errors use `ApiError` from `contract/types.ts`: a kind, a code, a short message, `requestId`, and `retryable`. No stack trace. `/health` and `/ready` still use `request_id` until those callers move.

## Skip

- Firebase, Firestore, and Convex rules.
- Payment and webhook checks. There is no checkout.
- Mobile secure-storage and deep-link checks, until the phone app exists.
- File-upload rules, until a screen accepts a file. Evidence stays as links.

## Ours — not in those checklists

These still apply. The checklists do not cover them.

- The plain page, Close, and Escape. A region alert is raised by a leader and confirmed by a second leader. It does not detect a visitor.
- The church name stays off the reviewer list. The reviewer sees a pseudonym and a broad region.
- Acknowledging a held check-in does not close the review and does not move a stage.
- The model does not invent Scripture or a verse reference. An uncovered block says the lexicon does not cover it yet.

## When we build the packet

The packet routes have to match this file before they are called done: a real sign-in check, a rate limit on the model call, and no pastor note left in the browser.

## Provider errors

Starting set. These can change while building if the demo shows a better fit. They are not frozen.

The browser never calls Gloo. A 429, timeout, 5xx, or 401 becomes "Unavailable" on the packet screen after a few retries with backoff. The gateway does not fill the packet from another provider and label it Gloo.

- 429, timeout, 500, 502, 503, 529: retry a few times, then fail closed.
- 401 or 403: bad key. Fix the API environment variable. Do not retry.
- 400 or context length: send the stripped week and the month counts only. No chat history.
- CORS and Vercel timeouts: the model call stays on the FastAPI service, not in a Next.js route.
- Streaming is not used for the packet. One finished reply, or unavailable.
- A retried check-in or ack uses the existing client id or idempotency key so it does not write twice.
- Hosted Postgres uses the Supabase pooler when Auth is on. The October 7 demo uses the fixture database.
