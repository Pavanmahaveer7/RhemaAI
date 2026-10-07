"use client";

import { useEffect, useState } from "react";
import { bootKit } from "@/src/lib/kit-boot";

export default function KitBoot({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  useEffect(() => {
    bootKit()
      .then(() => setReady(true))
      .catch((e: unknown) => setErr(e instanceof Error ? e.message : "Could not start the app"));
  }, []);
  if (err) {
    return (
      <div style={{ minHeight: "100vh", padding: 32, background: "#0b0f0c", color: "#e8ece4", fontFamily: "system-ui" }}>
        <p>{err}</p>
        <p>
          <a href="/local" style={{ color: "#cfda5c" }}>
            Back to app map
          </a>
        </p>
      </div>
    );
  }
  if (!ready) {
    return <div style={{ minHeight: "100vh", background: "#0b0f0c" }} aria-busy="true" />;
  }
  return <>{children}</>;
}
