import { Shell } from "@/components/Shell";
import Board from "@/boards/Messages";

export default function Page() {
  return (
    <Shell crumbs={["Customer messages"]}>
      <Board />
    </Shell>
  );
}
