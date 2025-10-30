import CreateProductForm from "../create/CreateProductForm";
import { getProductById } from "@/lib/actions/admin.actions";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
      <CreateProductForm
        context="edit"
        productId={id}
        defaultValues={product}
      />
    </div>
  );
}