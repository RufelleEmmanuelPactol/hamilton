import { Shell } from "@/components/Shell";
import Board from "@/boards/Activity";

export default function Page() {
  return (
    <Shell crumbs={["Governance", "Audit log"]}>
      <Board />
    </Shell>
  );
}
