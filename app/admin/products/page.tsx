import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllProducts, deleteProductById } from "@/lib/actions/admin.actions";
import { formatCurrency, formatId } from "@/lib/utils";
import DeleteButton from "@/components/admin/DeleteButton";
import Link from "next/link";
import ClearSearchBar from "@/components/admin/ClearSearchBar";

export default async function ProductAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const sp = await searchParams;
  const q = sp?.q;
  const product = await getAllProducts(q);

  return (
    <div className="container mx-auto px-3 py-3">
      <div className="sm:col-col-1 md:flex justify-between items-center mb-4 px-3">
        <div className="flex items-center gap-4 ">
          <h1 className="font-bold text-xl">Product</h1>
          <ClearSearchBar path="/admin/products" query={q} />
        </div>
        <Button className="bg-gray-800 text-white px-4 py-2 rounded">
          <Link href="/admin/products/create">Add Product</Link>
        </Button>
      </div>
      <div className="w-full h-full px-3 pb-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {product.map((product) => (
              <TableRow key={product.id}>
                <TableCell title={product.id}>{formatId(product.id)}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{formatCurrency(product.price)}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.rating}</TableCell>
                <TableCell className="flex gap-2">
                  <Button variant="secondary">Edit</Button>
                  <DeleteButton
                    action={deleteProductById}
                    itemId={product.id}
                    itemType="productId"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
