import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Button } from "@/components/ui/button";
import { getProductBySlug } from "@/lib/actions/products.actions";
import { Product } from "@/types";

export default async function DetailsPage({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const test: Product = await getProductBySlug(slug);

    return (
        <div className="flex flex-col max-w-screen-xl mx-auto p-6 space-y-8">
            <ResizablePanelGroup direction="horizontal" className="border">
                <ResizablePanel defaultSize={50} minSize={300}>
                    <div className="h-full w-full overflow-hidden border p-10">
                        <img 
                          src={test.images[0]} 
                          alt="Product Image" 
                          className="w-full h-full object-cover p-7"
                        />
                    </div>
                </ResizablePanel>
                <ResizableHandle />

                <ResizablePanel defaultSize={50} minSize={300}>
                    <div className="flex flex-col p-4 space-y-2">

                        <div className="text-xl font-semibold">{test.brand}</div>
                        <div className="text-3xl font-bold text-gray-800">{test.name}</div>
                        <div className="text-md font">{test.rating}</div>
                        <div className="text-xl font-semibold">${test.price}</div>
                        <div className="text-sm">{test.category}</div>
                        <div className="text-md font-bold">Quanity: {test.stock}</div>

                        <div className="text-sm text-red-400">Quanity Selection Template</div>

                        <div className="flex flex-col space-y-4 m-6">
                            <Button variant="default" className="w-full ">Add to Cart</Button>
                            <Button variant="secondary" className="w-full">Buy Now</Button>
                        </div>
                        <p className="text-md">{test.description}</p>
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>

            <div className="border-t pt-6">
                <h2 className="text-2xl font-semibold text-gray-800">Customer Reviews</h2>
            </div>
        </div>
    );
}
