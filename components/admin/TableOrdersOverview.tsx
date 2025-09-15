import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function TableOrdersOverview() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className=" text-center">BUYER</TableHead>
          <TableHead className=" text-center">DATE</TableHead>
          <TableHead className=" text-center">TOTAL</TableHead>
          <TableHead className=" text-center">ACTION</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Mario Rossi</TableCell>
          <TableCell>11/09/2025</TableCell>
          <TableCell>€120</TableCell>
          <TableCell>
            <Button variant={"link"}>Details</Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
