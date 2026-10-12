"use client";
import { Suspense } from "react";
import { AppFrame } from "@/driver/ui";
import Screen from "@/driver/StopDetail";

export default function Page() {
  return (
    <AppFrame>
      <Suspense fallback={null}>
        <Screen />
      </Suspense>
    </AppFrame>
  );
}
