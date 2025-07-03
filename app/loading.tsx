import Image from "next/image";
import loader from "@/assets/loader.gif";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
        <Image
          src={loader}
          alt="Loading"
          width={200}
          height={200}
        />
    </div>
  );
}