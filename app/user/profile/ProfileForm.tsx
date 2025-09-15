//profile-form
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileNameSchema } from "@/lib/validator";
import { Profile } from "@/types";
import { updateProfile } from "@/lib/actions/profile.actions";
import { useRouter } from "next/navigation";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ProfileForm({
  defaultValues,
}: {
  defaultValues?: Profile;
}) {
  const router = useRouter();

  const form = useForm<Profile>({
    resolver: zodResolver(updateProfileNameSchema),
    defaultValues: defaultValues || {
      name: "",
      email: "",
    },
  });

  const onSubmit = async (data: Profile) => {
    const res = await updateProfile(data);

    if (res.success) {
      toast.success(res.message);
      router.refresh();
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email address" disabled {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Updating..." : "Update Profile"}
        </Button>
      </form>
    </Form>
  );
}
