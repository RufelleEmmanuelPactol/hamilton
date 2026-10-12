import { Shell } from "@/components/Shell";
import Board from "@/boards/Approvals";

export default function Page() {
  return (
    <Shell crumbs={["Approvals"]}>
      <Board />
    </Shell>
  );
}
