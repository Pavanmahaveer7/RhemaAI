"use client";

import { Suspense } from "react";
import KitBoot from "@/src/components/KitBoot";
import ReaderOutlet from "@/src/components/ReaderOutlet";

type Screen = "search" | "term" | "month" | "map" | "settings" | "signin" | "welcome" | "intro" | "staff";

export default function ReaderPage(props: { screen: Screen; term?: string; step?: string }) {
  return (
    <KitBoot>
      <Suspense fallback={<div style={{ minHeight: "100vh", background: "#0b0f0c" }} />}>
        <ReaderOutlet {...props} />
      </Suspense>
    </KitBoot>
  );
}
