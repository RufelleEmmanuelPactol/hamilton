"use client";
import { Suspense } from "react";
import { AppFrame } from "@/driver/ui";
import Screen from "@/driver/Me";

export default function Page() {
  return (
    <AppFrame tabs>
      <Suspense fallback={null}>
        <Screen />
      </Suspense>
    </AppFrame>
  );
}
