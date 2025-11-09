import { CreditCard, DollarSign, Headset, ShoppingBag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useTranslations } from "next-intl";
export default function BrandPolicy() {
  const t = useTranslations("brandPolicy");
  return (
    <Card>
      <div className="container mx-auto px-2 py-2 grid grid-cols-1 md:grid-cols-4 gap-2 text-sm w-full">
        <div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag /> {t("freeHead")}{" "}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            {t("freeSub")}
          </CardContent>
        </div>
        <div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign />
              {t("moneyHead")}{" "}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            {" "}
            {t("moneySub")}
          </CardContent>
        </div>
        <div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard />
              {t("flexHead")}
               </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            {t("flexSub")}
            </CardContent>
        </div>
        <div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Headset />
              {t("supportHead")}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            {t("supportSub")}
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
