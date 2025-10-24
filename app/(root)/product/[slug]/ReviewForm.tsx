"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createReviewFormSchema } from "@/lib/validator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RatingDropdown } from "@/components/review/RatingDropdown";
import { toast } from "sonner";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { CreateReview } from "@/types";
import { createReview } from "@/lib/actions/review.actions";
import { formatError } from "@/lib/utils";

export default function ReviewForm({
  productId,
  existingReview,
}: {
  productId: string;
  existingReview?: CreateReview | null;
}) {
  const form = useForm<CreateReview>({
    resolver: zodResolver(createReviewFormSchema),
    defaultValues: existingReview || {
      title: "",
      description: "",
      rating: 1,
      productId: productId,
    },
  });

  const onSubmit = async (data: CreateReview) => {
    try {
      const result = await createReview(data);
      if (result.success) {
        toast.success("Review submitted successfully");
      } else {
        form.setError("root", {
          type: "server",
          message: result.message,
        });
      }
    } catch (error) {
      form.setError("root", {
        type: "server",
        message: formatError(error),
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Add a Review</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a Review</DialogTitle>
          <DialogDescription>
            Share your thoughts about this product with other customers.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {form.formState.errors.root && (
              <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {form.formState.errors.root.message}
              </div>
            )}

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <RatingDropdown
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting 
                ? "Submitting..." 
                : "Submit Review"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
