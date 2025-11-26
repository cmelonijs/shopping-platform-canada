// components/share/breadcrumbBoard.tsx

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useTranslations } from "next-intl";
function BreadcrumbBoard({ step }: { step: string }) {
  const t= useTranslations('breadcrumb')
  return (
    <Breadcrumb className="mx-auto my-4 text-lg">
      <BreadcrumbList className="flex flex-col  md:flex-row items-center gap-4 md:gap-3 ">
        <BreadcrumbItem>
          <span
            className={`text-xl ${step === "home" ? "bg-gray-300 rounded-3xl px-4 py-2" : ""}`}
          >
            {t("login")}
          </span>
        </BreadcrumbItem>

        <BreadcrumbSeparator>
          <div className="h-px bg-gray-300 w-10" />
        </BreadcrumbSeparator>

        <BreadcrumbItem>
          <span
            className={`text-xl ${step === "shipping" ? "bg-gray-300 rounded-3xl px-4 py-2" : ""}`}
          >
            {t("shipping")}
          </span>
        </BreadcrumbItem>

        <BreadcrumbSeparator>
          <div className="h-px bg-gray-300 w-10" />
        </BreadcrumbSeparator>

        <BreadcrumbItem>
          <span
            className={`text-xl ${step === "payment" ? "bg-gray-300 rounded-3xl px-4 py-2" : ""}`}
          >
            {t("payment")}
          </span>
        </BreadcrumbItem>

        <BreadcrumbSeparator>
          <div className="h-px bg-gray-300 w-10" />
        </BreadcrumbSeparator>

        <BreadcrumbItem>
          <span
            className={`text-xl ${step === "order" ? "bg-gray-300 rounded-3xl px-4 py-2" : ""}`}
          >
            {t("place")}
          </span>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
export default BreadcrumbBoard;
