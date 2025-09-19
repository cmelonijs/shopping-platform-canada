import Menu from "@/components/share/menu";
import Navbar from "./Navbar";

export default function AdminHeader() {
  return (
    <div className="w-full border-b">
      <div className="text-3xl font bold text-center py-1">Administration</div>
      <div className="container mx-auto px-3 flex justify-between items-center py-3">
        <div className="flex items-center gap-4">
          <Navbar />
        </div>
        <Menu />
      </div>
    </div>
  );
}
