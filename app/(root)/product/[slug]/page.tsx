import { Button } from "@/components/ui/button";
import { getProductBySlug } from "@/lib/actions/products.actions";
import { Product } from "@/types";

export default async function DetailsPage({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const test: Product = await getProductBySlug(slug);

    return (
        <div className="container flex flex-col max-w-screen-xl mx-auto p-6 space-y-8">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0">
                <div className="h-full w-full md:w-1/2 overflow-hidden">
                    <img 
                      src={test.images[0]} 
                      alt="Product Image" 
                      className="w-full h-full object-cover p-7"
                    />
                </div>
                
                <div className="flex flex-col p-4 space-y-2 md:w-1/2">
                    <div className="text-xl font-semibold">{test.brand}</div>
                    <div className="text-3xl font-bold">{test.name}</div>
                    <div className="text-md font">{test.rating}</div>
                    <div className="text-xl font-semibold">€{test.price}</div>
                    <div className="text-sm">{test.category}</div>
                    <div className="text-md font-bold">Quantity: {test.stock}</div>

                    <div className="text-sm text-red-400">Quantity Selection Template</div>

                    <div className="flex flex-col space-y-4">
                        <Button variant="default" className="w-full">Add to Cart</Button>
                        <Button variant="secondary" className="w-full">Buy Now</Button>
                    </div>

                    <p className="text-md">{test.description}</p>
                </div>
            </div>

            <div className="border-t pt-6">
                <h2 className="text-2xl font-semibold">Customer Reviews</h2>
            </div>
        </div>
    );
}
