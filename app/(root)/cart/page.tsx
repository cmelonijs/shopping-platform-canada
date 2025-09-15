import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Package, CreditCard, Truck, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getMyCart } from "@/lib/actions/cart.actions";
import CartItemControls from "@/components/cart/cartItemControls";
import { formatCurrency } from "@/lib/utils";

export default async function CartPage() {
  const cart = await getMyCart();

  if (!cart) {
    // return <div>Your cart is empty</div>;
    return (
      <div className="mx-auto w-full max-w-7xl p-6 h-screen">
        <div>
          <h1 className="text-2xl font-semibold">Shopping Cart</h1>
          <p className="text-muted-foreground">0 items in your cart</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl p-6 h-screen">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Cart Section */}
        <div className="space-y-6 lg:col-span-2">
          <div>
            <h1 className="text-2xl font-semibold">Shopping Cart</h1>
            <p className="text-muted-foreground">
              {cart.items.reduce((total, item) => total + item.qty, 0)} items in
              your cart
            </p>
          </div>

          <div className="space-y-4">
            {cart.items.map((item) => (
              <Card key={item.productId} className="overflow-hidden p-0">
                <CardContent className="p-0">
                  <div className="flex h-full flex-col md:flex-row">
                    <div className="relative h-auto w-full md:w-32">
                      <Link href={`/product/${item.slug}`}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={500}
                          height={500}
                          className="h-full w-full object-cover md:w-32 cursor-pointer hover:opacity-95 transition-opacity"
                        />
                      </Link>
                    </div>

                    <div className="flex-1 p-6 pb-3">
                      <div className="flex justify-between">
                        <Link
                          href={`/product/${item.slug}`}
                          className="font-medium hover:underline"
                        >
                          {item.name}
                        </Link>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <CartItemControls item={item} />

                        <div className="text-right">
                          <div className="font-medium">
                            {formatCurrency(item.price)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        {cart.items.length > 0 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>
                  Review your order details and shipping information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Order Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>{" "}
                    {/*changed shipping/items from Paolo*/}
                    <span>{formatCurrency(cart.itemsPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>{formatCurrency(cart.ShippingPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>{formatCurrency(cart.taxPrice)}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>{formatCurrency(cart.totalPrice)}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4 border-t pt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Package className="text-primary h-4 w-4" />
                    <span>Free returns within 30 days</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="text-primary h-4 w-4" />
                    <span>Secure payment</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Truck className="text-primary h-4 w-4" />
                    <span>Fast delivery</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link href="/shipping-address">
                  <Button className="w-full">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Proceed to Checkout
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
