import { Shell } from "@/components/Shell";
import Board from "@/boards/Autonomy";

export default function Page() {
  return (
    <Shell crumbs={["Governance", "Autonomy policies"]}>
      <Board />
    </Shell>
  );
}
