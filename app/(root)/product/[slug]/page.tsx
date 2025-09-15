import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getProductBySlug } from "@/lib/actions/products.actions";
import { getMyCart } from "@/lib/actions/cart.actions";
import { Product } from "@/types";
import Image from "next/image";
import AddToCart from "@/components/cart/addToCart";
import { RenderStars } from "@/components/share/stars";
import { formatCurrency } from "@/lib/utils";

const DetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const product: Product = await getProductBySlug(slug);

  // Get current cart to check if item exists
  const cart = await getMyCart();

  return (
    <div className="container flex flex-col max-w-screen-xl mx-auto p-6 space-y-8">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-10">
        {/* Product Images */}
        <div className="relative h-full w-full md:w-1/2 px-8 md:px-0">
          <Carousel className="h-full w-full">
            <CarouselContent>
              {Array.from({ length: 2 }).map((_, index) => (
                <CarouselItem key={index}>
                  <Image
                    src={product.images[index]}
                    width={500}
                    height={500}
                    alt="Product Image"
                    className="w-full h-full object-cover p-7"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-8 md:-left-4" />
            <CarouselNext className="-right-8 md:-right-4" />
          </Carousel>
        </div>

        {/* Info  */}
        <div className="flex flex-col p-4 space-y-2 md:w-1/2 md:pl-10">
          <div className="text-xl font-semibold">{product.brand}</div>
          <div className="text-3xl font-bold">{product.name}</div>

          {/* Render product rating stars */}
          <div className="flex space-x-1">
            <RenderStars rating={product.rating} />
          </div>

          {/* Display product price and category */}
          <div className="text-xl font-semibold">
            {formatCurrency(product.price)}
          </div>
          <div className="text-sm">{product.category}</div>

          {/* Add to Cart button with current quantity */}
          <div className="flex flex-col space-y-4 pt-4">
            <AddToCart
              cart={cart}
              item={{
                productId: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                qty: 1,
                image: product.images![0],
              }}
            />
          </div>

          <p className="text-md pt-6">{product.description}</p>
        </div>
      </div>

      <div className="border-t pt-6">
        <h2 className="text-2xl font-semibold">Customer Reviews</h2>
      </div>
    </div>
  );
};
export default DetailsPage;
