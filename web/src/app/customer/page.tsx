import { Phone } from "@/components/Phone";
import Board from "@/boards/CustomerThread";

export default function Page() {
  return (
    <Phone caption="What the customer sees on WhatsApp">
      <Board />
    </Phone>
  );
}
