import { Shell } from "@/components/Shell";
import Board from "@/boards/Orders";

export default function Page() {
  return (
    <Shell crumbs={["Orders"]}>
      <Board />
    </Shell>
  );
}
