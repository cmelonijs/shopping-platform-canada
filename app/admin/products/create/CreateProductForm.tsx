"use client";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import Image from "next/image";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { createProduct } from "@/lib/actions/admin.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CreateProduct } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProductSchema } from "@/lib/validator";
import { formatError } from "@/lib/utils";
import { UploadButton } from "@/lib/uploadthing";
import { X } from "lucide-react";

export default function CreateProductForm({
  defaultValues,
  context = "create",
}: {
  defaultValues?: CreateProduct;
  context?: "create" | "edit";
}) {
  const router = useRouter();
  const form = useForm<CreateProduct>({
    resolver: zodResolver(createProductSchema),
    defaultValues: defaultValues || {
      name: "",
      slug: "",
      category: "",
      brand: "",
      price: 0,
      stock: 0,
      images: [],
      isFeatured: false,
      description: "",
    },
  });

  const onSubmit = async (data: CreateProduct) => {
    try {
      const result = await createProduct(data);
      if (result.success) {
        if (context === "create") {
          toast.success("Product created successfully");
          router.push("/admin/products");
        } else {
          toast.success("Product updated successfully");
        }
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {form.formState.errors.root && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {form.formState.errors.root.message}
          </div>
        )}
        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter product name"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter product slug"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="Category" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand</FormLabel>
                <FormControl>
                  <Input placeholder="Brand" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Stock Quantity"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Images</FormLabel>
              <FormControl>
                <div className="border rounded-md p-4 space-y-4">
                  <UploadButton
                    endpoint="productImage"
                    onClientUploadComplete={(res) => {
                      const urls = res.map((file) => file.url);
                      field.onChange([...field.value, ...urls]);
                      toast.success("Upload completed!");
                    }}
                    onUploadError={(error: Error) => {
                      toast.error(`Error: ${error.message}`);
                    }}
                    className="ut-button:bg-primary ut-button:text-primary-foreground ut-button:hover:bg-primary/90 ut-button:px-6 ut-button:py-3 ut-label:text-foreground"
                  />
                  {field.value && field.value.length > 0 && (
                    <div className="grid grid-cols-4 gap-4">
                      {field.value.map((url, index) => (
                        <div key={index} className="relative group">
                          {/* we should use next <Image> here */}
                          <Image
                            src={url}
                            width={200}
                            height={200}
                            priority
                            alt={`Product ${index + 1}`}
                            className="w-full h-32 object-contain rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newImages = field.value.filter(
                                (_, i) => i !== index,
                              );
                              field.onChange(newImages);
                            }}
                            className="absolute top-0 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isFeatured"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="mb-0">Featured</FormLabel>
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
                <Textarea placeholder="Product Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting
            ? context === "create"
              ? "Creating..."
              : "Updating..."
            : context === "create"
              ? "Create Product"
              : "Update Product"}
        </Button>
      </form>
    </Form>
  );
}
