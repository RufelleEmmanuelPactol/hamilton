import { Shell } from "@/components/Shell";
import Board from "@/boards/Plan";

export default function Page() {
  return (
    <Shell crumbs={["Dispatch", "Mon 12 Oct plan"]}>
      <Board />
    </Shell>
  );
}
