import { Phone } from "@/components/Phone";
import Board from "@/boards/DriverIncident";

export default function Page() {
  return (
    <Phone caption="Driver app · report an issue">
      <Board />
    </Phone>
  );
}
