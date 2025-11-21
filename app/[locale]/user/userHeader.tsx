import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import Menu from "@/components/share/menu";
import { Button } from "@/components/ui/button";
import LocaleSwitcher from "@/components/share/LocaleSwitcher";
import { useTranslations } from "next-intl";

export default function UserHeader() {
  const t= useTranslations("userHeader");
  return (
    <div className="w-full border-b">
      <div className="container mx-auto px-3 flex justify-between items-center py-3">
        <div className="flex items-center  gap-4">
          <Link href="/" className="shirnk-0">
            <Image
              src={logo}
              alt="Logo"
              width={50}
              height={50}
              className="scale-110 object-contain"
            />
          </Link>
          <Button asChild variant={"ghost"}>
            <Link href="/user/profile">{t('profile')}</Link>
          </Button>
          <Button asChild variant={"ghost"}>
            <Link href="/user/orders">{t('order')}</Link>
          </Button>
        </div>
        <div className="flex gap-2 items-center">
        <Menu />
        <LocaleSwitcher />
      </div>
      </div>
    </div>
  );
}
