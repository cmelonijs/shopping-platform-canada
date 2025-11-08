import CreateProductForm from "./CreateProductForm";

export default function CreateProductAdminPage() {
  return (
    <div className="container mx-auto max-w-4xl px-6 py-8">
      <CreateProductForm context="create" defaultValues={undefined} />
    </div>
  );
}
