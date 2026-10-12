import { Shell } from "@/components/Shell";
import Board from "@/boards/Drivers";

export default function Page() {
  return (
    <Shell crumbs={["Drivers", "Jun Reyes"]}>
      <Board />
    </Shell>
  );
}
