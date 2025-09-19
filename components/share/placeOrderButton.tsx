"use client";
import { Button } from "@/components/ui/button";
import { createOrder } from "@/lib/actions/order.actions";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

export default function PlaceOrderButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleCreateOrder = () => {
    startTransition(async () => {
      const result = await createOrder();
      if (result.success && result.redirectTo) {
        toast.success(result.message);
        router.push(result.redirectTo);
      } else {
        toast.error(result.message);
        if (result.redirectTo) {
          router.push(result.redirectTo);
        }
      }
    });
  };

  return (
    <Button
      onClick={handleCreateOrder}
      disabled={isPending}
      className="bg-primary"
    >
      {isPending ? "Creating order..." : "Place order"}
      <ArrowRight className="animate-bounce"/>
    </Button>
  );
}
