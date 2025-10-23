"use client";

import { Button } from "@/components/ui/button";
import { markOrderAsDelivered } from "@/lib/actions/order.actions";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { Truck } from "lucide-react";

export default function MarkAsDeliveredButton({
  orderId,
}: {
  orderId: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleMarkDelivered = () => {
    startTransition(async () => {
      const result = await markOrderAsDelivered(orderId);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }

      if (result.redirectTo) {
        router.push(result.redirectTo);
      }
    });
  };

  return (
    <Button
      onClick={handleMarkDelivered}
      disabled={isPending}
      className="bg-green-600 w-full hover:bg-green-700 transition"
    >
      {isPending ? "Processing..." : "Mark as Delivered"}
      <Truck className="ml-2 h-4 w-4 animate-pulse" />
    </Button>
  );
}
