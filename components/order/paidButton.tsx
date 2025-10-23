"use client";

import { Button } from "@/components/ui/button";
import { markOrderAsPaid } from "@/lib/actions/order.actions";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { CheckCircle } from "lucide-react";

export default function MarkAsPaidButton({ orderId }: { orderId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleMarkPaid = () => {
    startTransition(async () => {
      const result = await markOrderAsPaid(orderId);
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
      onClick={handleMarkPaid}
      disabled={isPending}
      className="bg-primary w-full"
    >
      {isPending ? "Processing..." : "Mark as Paid"}
      <CheckCircle className="ml-2 h-4 w-4 animate-pulse" />
    </Button>
  );
}
