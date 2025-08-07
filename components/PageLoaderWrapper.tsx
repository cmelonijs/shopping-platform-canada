// app/components/PageLoaderWrapper.tsx
"use client"; 

import { usePathname } from "next/navigation"; 
import { useEffect, useState } from "react";
import Loading from "../app/loading"; 

export default function PageLoaderWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Applies a short loading effect every time the route changes
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 400); // timeout setable

    return () => clearTimeout(timeout);
  }, [pathname]);

  return <>{loading ? <Loading /> : children}</>;
}