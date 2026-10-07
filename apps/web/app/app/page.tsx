"use client";

import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import { hashToPath } from "@/src/lib/paths";

function RedirectApp() {
  const router = useRouter();
  useEffect(() => {
    router.replace(hashToPath(location.hash) || "/search");
  }, [router]);
  return <div style={{ minHeight: "100vh", background: "#0b0f0c" }} />;
}

export default function LegacyAppPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#0b0f0c" }} />}>
      <RedirectApp />
    </Suspense>
  );
}
