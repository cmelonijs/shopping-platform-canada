import { CreditCard, DollarSign, Headset, ShoppingBag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
export default function BrandPolicy() {
  return (
    <Card>
      <div className="container mx-auto px-2 py-2 grid grid-cols-1 md:grid-cols-4 gap-2 text-sm w-full">
        <div>
          <CardHeader >
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag /> Free Shipping </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Free Shipping on orders above 100$
          </CardContent>
        </div>
        <div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign />Money Back Guarantee </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground"> Within 30 days of purchase
          </CardContent>
        </div>
        <div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard />Flexible Payments
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Pay with credit card, PayPal, or cash on delivery
          </CardContent>
        </div>
        <div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Headset />24/7 Support
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Get support at any time
          </CardContent>
        </div>
      </div>
    </Card>

  );
}
