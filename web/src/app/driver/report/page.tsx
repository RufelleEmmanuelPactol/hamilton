"use client";
import { Phone } from "@/components/Phone";
import Board from "@/boards/DriverIncident";
import { useScenario, useHydrated } from "@/lib/store";

/** After Jun sends the report, point the presenter to the admin console (the demo bridge). */
function Caption() {
  const hydrated = useHydrated((s) => s.hydrated);
  const reported = useScenario((s) => s.phase !== "before");
  return (
    <span>
      Driver app · report an issue
      {hydrated && reported && (
        <span className="ham-in" style={{ display: "inline-block", marginLeft: "4px" }}>
          ·{" "}
          <a href="/app/approvals" style={{ fontWeight: 600 }}>
            Now check the admin console →
          </a>
        </span>
      )}
    </span>
  );
}

export default function Page() {
  return (
    <Phone caption={<Caption />}>
      <Board />
    </Phone>
  );
}
