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


export default function ProfileForm({ defaultValues }: { defaultValues?: Profile }) {
    const router = useRouter();
    const form = useForm<Profile>({
        resolver: zodResolver(updateProfileNameSchema),
        defaultValues: defaultValues || {
            name: ""
        }
    });
    const onSubmit = async (data: Profile) => {
        console.log("Submitting:", data);

        try {
            const result = await updateProfile(data);
            console.log("Result:", result);

            if (result?.success) {
                router.refresh();
            }
            else {
                form.setError("root", {
                    type: "server",
                    message: result?.message || "Failed to update profile"
                });
            }
        } catch (err) {
            form.setError("root", {
                type: "server",
                message: "An unexpected error occurred. Please try again."
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
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter your full name"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                
                <Button
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? 'Updating...' : 'Update name Information'}
        </Button>
      </form>
    </Form>
  );
}



