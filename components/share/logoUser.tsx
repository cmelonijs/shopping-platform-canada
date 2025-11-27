"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import logo from "@/assets/images/logo.png";

export default function Logo() {
  const locale = useLocale(); 

  return (
    <div className="flex items-center">
      <Link href={`/${locale}`} className="shirnk-0">
        <Image
          src={logo}
          alt="Logo"
          width={50}
          height={50}
          className="scale-110 object-contain"
        />
      </Link>
    </div>
  );
}