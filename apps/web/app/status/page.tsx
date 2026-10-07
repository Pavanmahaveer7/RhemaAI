"use client";

import { useEffect, useState } from "react";

const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

type Payload = { ok: boolean; status: number; body: unknown; error?: string };

async function load(path: string): Promise<Payload> {
  try {
    const response = await fetch(`${apiBase}${path}`, { cache: "no-store" });
    const body = await response.json();
    return { ok: response.ok, status: response.status, body };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      body: null,
      error: err instanceof Error ? err.message : "request failed",
    };
  }
}

export default function StatusPage() {
  const [health, setHealth] = useState<Payload | null>(null);
  const [ready, setReady] = useState<Payload | null>(null);

  useEffect(() => {
    void load("/health").then(setHealth);
    void load("/ready").then(setReady);
  }, []);

  return (
    <main>
      <p>
        <a href="/">Back to search</a>
      </p>
      <h1>Local status</h1>
      <p>
        API: <code>{apiBase}</code>
      </p>
      <Status title="/health" data={health} />
      <Status title="/ready" data={ready} />
    </main>
  );
}

function Status({ title, data }: { title: string; data: Payload | null }) {
  if (!data) return <p>{title}: loading…</p>;
  const label = data.error ? "unreachable" : data.ok ? "ok" : "not ready";
  return (
    <section>
      <h2>
        {title}: {label}
      </h2>
      <pre>{data.error ?? JSON.stringify(data.body, null, 2)}</pre>
    </section>
  );
}
