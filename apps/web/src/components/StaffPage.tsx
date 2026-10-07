"use client";

import { Suspense } from "react";
import KitBoot from "@/src/components/KitBoot";
import StaffOutlet from "@/src/components/StaffOutlet";

export default function StaffPage() {
  return (
    <KitBoot>
      <Suspense fallback={<div style={{ minHeight: "100vh", background: "#0b0f0c" }} />}>
        <StaffOutlet />
      </Suspense>
    </KitBoot>
  );
}
