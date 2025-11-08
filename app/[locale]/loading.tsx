import Image from "next/image";
import Loader2 from "@/assets/Loader3.gif";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Image src={Loader2} alt="Loading" width={150} height={150} />
    </div>
  );
}
