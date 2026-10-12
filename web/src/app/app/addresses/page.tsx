import { Shell } from "@/components/Shell";
import Board from "@/boards/AddressBook";

export default function Page() {
  return (
    <Shell crumbs={["Address book"]}>
      <Board />
    </Shell>
  );
}
