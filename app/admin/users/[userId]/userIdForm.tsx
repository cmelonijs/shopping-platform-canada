//Admin/RoleForm
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUsersProfileNameSchema } from "@/lib/validator";
import { UsersProfile } from "@/types";
import { updateUserRole } from "@/lib/actions/admin.actions";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectValue,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

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

export default function ProfileUsersForm({
  defaultValues,
}: {
  defaultValues?: UsersProfile;
}) {
  const form = useForm<UsersProfile>({
    resolver: zodResolver(updateUsersProfileNameSchema),
    defaultValues: defaultValues || {
      id: "",
      name: "",
      email: "",
      role: "user",
    },
  });
  const router = useRouter();

  const onSubmit = async (data: UsersProfile) => {
    const res = await updateUserRole(data);

    if (res.success) {
      toast.success(res.message);
      router.refresh();
      router.push(res.redirectTo);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="container mx-auto p-4 mt-2">
      <div className="mb-4">
        <h1 className="text-center text-2xl font-bold mb-4">Update User:</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {form.formState.errors.root && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {form.formState.errors.root.message}
            </div>
          )}
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
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger ref={field.ref} className="w-full">
                      <SelectValue placeholder="Choose a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="p-0 max-h-40 overflow-y-auto">
                    <SelectItem value="user" className="py-1 px-2 text-sm">
                      user
                    </SelectItem>
                    <SelectItem value="admin" className="py-1 px-2 text-sm">
                      admin
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
