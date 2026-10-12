import { Shell } from "@/components/Shell";
import Board from "@/boards/Main";

export default function Page() {
  return (
    <Shell crumbs={["Overview"]}>
      <Board />
    </Shell>
  );
}
