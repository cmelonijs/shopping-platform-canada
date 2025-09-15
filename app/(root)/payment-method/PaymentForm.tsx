"use client";

import { useForm } from "react-hook-form";
import { updatePaymentMethod } from "@/lib/actions/payment.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { paymentMethodSchema } from "@/lib/validator";
import { PaymentMethod } from "@/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function PaymentForm({
  defaultValues,
}: {
  defaultValues?: PaymentMethod;
}) {
  const router = useRouter();

  const form = useForm<PaymentMethod>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: defaultValues || {
      paymentMethod: "cashOnDelivery",
    },
  });

  const onSubmit = async (data: PaymentMethod) => {
    const res = await updatePaymentMethod(data);
    if (res.success) {
      toast.success(res.message);
      router.push("/place-order");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {form.formState.errors.root && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {form.formState.errors.root.message}
          </div>
        )}

        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-lg font-semibold">
                Select Payment Method
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="cashOnDelivery"
                      id="cashOnDelivery"
                    />
                    <FormLabel htmlFor="cashOnDelivery" className="font-normal">
                      Cash on Delivery
                    </FormLabel>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Stripe" id="Stripe" />
                    <FormLabel htmlFor="Stripe" className="font-normal">
                      Credit/Debit Card (Stripe)
                    </FormLabel>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="payPal" id="payPal" />
                    <FormLabel htmlFor="payPal" className="font-normal">
                      PayPal
                    </FormLabel>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting
            ? "Processing..."
            : "Continue to Checkout"}
        </Button>
      </form>
    </Form>
  );
}
