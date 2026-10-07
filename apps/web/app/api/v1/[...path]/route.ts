import type { NextRequest } from "next/server";

export const runtime = "nodejs";

const hopByHop = new Set(["connection", "keep-alive", "transfer-encoding", "te", "trailer", "upgrade", "host", "content-length"]);

function apiOrigin(): string {
  return (process.env.API_BASE_URL ?? "http://localhost:8000").replace(/\/$/, "");
}

async function proxy(request: NextRequest, context: { params: Promise<{ path?: string[] }> }) {
  const { path = [] } = await context.params;
  const suffix = path.length ? path.join("/") : "";
  const target = `${apiOrigin()}/api/v1/${suffix}${request.nextUrl.search}`;

  const headers = new Headers();
  request.headers.forEach((value, key) => {
    if (hopByHop.has(key.toLowerCase())) return;
    headers.set(key, value);
  });

  const init: RequestInit = {
    method: request.method,
    headers,
    redirect: "manual",
  };
  if (request.method !== "GET" && request.method !== "HEAD" && request.method !== "OPTIONS") {
    init.body = await request.arrayBuffer();
  }

  const upstream = await fetch(target, init);
  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: upstream.headers,
  });
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
export const OPTIONS = proxy;
