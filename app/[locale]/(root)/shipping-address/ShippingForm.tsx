"use client";

import { updateAddress } from "@/lib/actions/address.actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { ShippingAddress } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertShippingAddressSchema } from "@/lib/validator";
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

export default function ShippingForm({
  defaultValues,
  context = "profile",
}: {
  defaultValues?: ShippingAddress;
  context?: "profile" | "checkout";
}) {
  const router = useRouter();

  const form = useForm<ShippingAddress>({
    resolver: zodResolver(insertShippingAddressSchema),
    defaultValues: defaultValues || {
      fullName: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
    },
  });

  const onSubmit = async (data: ShippingAddress) => {
    try {
      const result = await updateAddress(data);
      if (result.success) {
        if (context === "checkout") {
          router.push("/payment-method");
        } else {
          toast.success("Shipping address updated successfully");
        }
      } else {
        form.setError("root", {
          type: "server",
          message: result.message,
        });
      }
    } catch {
      form.setError("root", {
        type: "server",
        message: "An unexpected error occurred. Please try again.",
      });
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
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter your address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your city" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postal Code</FormLabel>
                <FormControl>
                  <Input placeholder="Enter postal code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input placeholder="Enter your country" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting
            ? "Updating..."
            : "Update Shipping Information"}
        </Button>
      </form>
    </Form>
  );
}
