import DeleteButton from "@/components/admin/DeleteButton";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteProductById, getAllUsers } from "@/lib/actions/admin.actions";
import { formatId } from "@/lib/utils";
import { deleteUserById } from "@/lib/actions/admin.actions";

export default async function ProductAdminPage() {
  const users = await getAllUsers();
  return (
    <div className="container mx-auto px-3 py-3">
      <div className="flex justify-between items-center mb-4 px-3">
        <h1 className="font-bold text-xl">Users</h1>
      </div>
      <div className="w-full h-full px-3 pb-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell title={user.id}>{formatId( user.id)}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell className="flex gap-2">
                <Button variant="secondary">Edit</Button>  
                <DeleteButton
                  action={deleteUserById}
                  itemId={user.id}
                  itemType="userId"
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
