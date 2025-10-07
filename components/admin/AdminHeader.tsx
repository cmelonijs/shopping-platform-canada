import Menu from "@/components/share/menu";
import Navbar from "./Navbar";

export default function AdminHeader() {
  return (
    <div className="w-full border-b ">
      <div className="text-3xl font-bold text-center py-1">Administration</div>
      <div className="container mx-auto px-3 flex flex-col sm:flex-row justify-between sm:items-center py-3 gap-4">
        <div >
          <Navbar />
        </div>
        <div className="flex gap-2">
          <Menu />
        </div>
      </div>
    </div>

  );
}
