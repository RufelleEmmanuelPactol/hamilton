"use client";
import { Suspense } from "react";
import { Phone } from "@/components/Phone";
import Board, { useDriverParam } from "@/boards/DriverRoute";

/** Demo affordance: switch between Jun's and Ana's phone. Kept small and in the caption. */
function DriverSwitch() {
  const d = useDriverParam();
  const link = (id: "jun" | "ana", label: string) =>
    d === id ? (
      <b style={{ color: "var(--ink2)", fontWeight: 600 }}>{label}</b>
    ) : (
      <a href={`/driver/?d=${id}`} style={{ color: "var(--mute)" }}>
        {label}
      </a>
    );
  return (
    <span>
      Driver app · {link("jun", "Jun")} / {link("ana", "Ana")}
    </span>
  );
}

export default function Page() {
  return (
    <Phone
      caption={
        <Suspense fallback="Driver app">
          <DriverSwitch />
        </Suspense>
      }
    >
      <Suspense fallback={null}>
        <Board />
      </Suspense>
    </Phone>
  );
}
