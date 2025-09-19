
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllUsers } from "@/lib/actions/administration.actions";
import { formatId } from "@/lib/utils";

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
                <Button className="bg-gray-200 text-black px-3 py-1 rounded text-sm hover:bg-gray-300">
                  Edit
                </Button>
                <Button className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
