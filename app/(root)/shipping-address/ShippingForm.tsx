"use client";

import { updateAddress } from "@/lib/actions/address.actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { ShippingAddress } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertShippingAddressSchema } from "@/lib/validator";
import { useRouter } from "next/navigation";
import { shippingAddressDefaultValue } from "@/lib/constants";

export default function ShippingForm() {
  const router = useRouter();
  
  const { 
    register, 
    handleSubmit, 
    setError,
    formState: { errors, isSubmitting }, 
  } = useForm<ShippingAddress>({
    resolver: zodResolver(insertShippingAddressSchema),
    defaultValues: {
      fullName: "",
      address: "",
      city: "",
      postalCode: "",
      country: ""
    }
  });

  const onSubmit = async (data: ShippingAddress) => {
    try {
      const result = await updateAddress(data);
      if (result.success) {
        // Redirect or show success message
        router.push("/payment-method");
      } else {
        setError("root", {
          type: "server",
          message: result.message || "Failed to update shipping address"
        });
      }
    } catch (err) {
      setError("root", {
        type: "server",
        message: "An unexpected error occurred. Please try again."
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Display root error if exists */}
      {errors.root && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {errors.root.message}
        </div>
      )}

      <div>
        <label htmlFor="fullName" className="block text-sm font-medium mb-2">
          Full Name
        </label>
        <Input
          {...register('fullName')}
          type="text"
          id="fullName"
          placeholder="Enter your full name"
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium mb-2">
          Address
        </label>
        <Input
          {...register('address')}
          type="text"
          id="address"
          placeholder="Enter your address"
          defaultValue={shippingAddressDefaultValue.streetAddress}
        />
        {errors.address && (
          <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="city" className="block text-sm font-medium mb-2">
            City
          </label>
          <Input
            {...register('city')}
            type="text"
            id="city"
            placeholder="Enter your city"
            defaultValue={shippingAddressDefaultValue.city}
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="postalCode" className="block text-sm font-medium mb-2">
            Postal Code
          </label>
          <Input
            {...register('postalCode')}
            type="text"
            id="postalCode"
            placeholder="Enter postal code"
            defaultValue={shippingAddressDefaultValue.postalCode}
          />
          {errors.postalCode && (
            <p className="mt-1 text-sm text-red-600">{errors.postalCode.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="country" className="block text-sm font-medium mb-2">
          Country
        </label>
        <Input
          {...register('country')}
          type="text"
          id="country"
          placeholder="Enter your country"
          defaultValue={shippingAddressDefaultValue.country}
        />
        {errors.country && (
          <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-1/2"
      >
        {isSubmitting ? 'Updating...' : 'Update Shipping Information'}
      </Button>
    </form>
  );
}