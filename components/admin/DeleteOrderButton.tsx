"use client";

import { useTransition } from "react";
import { deleteOrderById } from "@/lib/actions/order.actions";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type Props = {
  orderId: string;
};

export default function DeleteOrderButton({ orderId }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    startTransition(async () => {
      await deleteOrderById(orderId);
      router.refresh(); 
    });
  };

  return (
    <Button
      onClick={handleDelete}
      disabled={isPending}
      className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
    >
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  );
}
