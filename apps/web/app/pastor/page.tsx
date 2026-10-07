"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { hashToPath, roleHome } from "@/src/lib/paths";

export default function LegacyPastorPage() {
  const router = useRouter();
  useEffect(() => {
    const fromHash = hashToPath(location.hash);
    if (fromHash && fromHash !== "/search") {
      router.replace(fromHash);
      return;
    }
    router.replace(roleHome(undefined) === "/search" ? "/care" : roleHome(undefined));
  }, [router]);
  return <div style={{ minHeight: "100vh", background: "#0b0f0c" }} />;
}
