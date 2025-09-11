import Link from "next/link";
import Menu from "@/components/share/menu";
import Navbar from "@/components/share/navbar";



export default function AdminHeader(){
    
    return (
        <div className="w-full border-b">
            <div className="container mx-auto px-3 flex justify-between items-center py-3">
                <div className="flex items-center  gap-4">
                    
                  <Navbar/>  
                </div>
                <Menu />
            </div>
        </div>
    );
}


// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import Menu from "@/components/share/menu";

// export default function AdminHeader() {
//   const pathname = usePathname();

//   const navItems = [
//     { label: "Overview", href: "/admin/overview" },
//     { label: "Product", href: "/admin/product" },
//     { label: "Orders", href: "/admin/orders" },
//     { label: "Users", href: "/admin/users" },
//   ];

//   return (
//     <div className="w-full border-b">
//       <div className="container mx-auto px-3 flex justify-between items-center py-3">
//         <div className="flex items-center gap-4">
//           {navItems.map(({ label, href }) => {
//             const isActive = pathname === href;
//             return (
//               <Link
//                 key={href}
//                 href={href}
//                 className={`text-l py-2 px-3 rounded-md transition-colors ${
//                   isActive ? "bg-black text-white" : "hover:bg-gray-200"
//                 }`}
//               >
//                 <span className="text-xl">{label}</span>
//               </Link>
//             );
//           })}
//         </div>
//         <Menu />
//       </div>
//     </div>
//   );
// }