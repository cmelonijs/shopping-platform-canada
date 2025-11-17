import { useTranslations } from "next-intl";

export default function Footer() {
  const date = new Date();
  const year = date.getFullYear(); 
  const t = useTranslations("footer")
  return (
    <div className="w-full border-t py-4 text-center text-sm">
      © {year} SimpleShop. {t("rights")}
    </div>
  );
}
