import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { getProductBySlug } from "@/lib/actions/products.actions";
import { Product } from "@/types";
import { Star, StarHalf } from 'lucide-react';

export default async function DetailsPage({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const test: Product = await getProductBySlug(slug);
    const renderStars = () => {
        const rating = parseFloat(test.rating);
        const stars = [];
        
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<Star key={i} className="text-yellow-500 fill-yellow-500" />);
            }
            else if (i - 0.5 <= rating) {
                stars.push(<StarHalf key={i} className="text-yellow-500 fill-yellow-500" />);
            }
            else {
                stars.push(<Star key={i} className="text-yellow-500" />);
            }
        }
        
        return stars;
    };

    const checkStock = (stock: number) => {
        if (stock > 0) {
            return <span >{stock}</span>;
        } else {
            return <span className="text-red-400">Out of Stock</span>;
        }
    };

    const isOutOfStock = test.stock === 0;

    return (
        <div className="container flex flex-col max-w-screen-xl mx-auto p-6 space-y-8">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-10">
                
                <div className="relative h-full w-full md:w-1/2 px-8 md:px-0">
                    <Carousel className="h-full w-full">
                        <CarouselContent>
                            {Array.from({ length: 2 }).map((_, index) => (
                            <CarouselItem key={index}>
                                <img 
                                src={test.images[index]} 
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
                
                <div className="flex flex-col p-4 space-y-2 md:w-1/2 md:pl-10">
                    <div className="text-xl font-semibold">{test.brand}</div>
                    <div className="text-3xl font-bold">{test.name}</div>
                    {/* Render the star rating */}
                    <div className="flex space-x-1">
                        {renderStars()}
                    </div>
                    <div className="text-xl font-semibold">€{test.price}</div>
                    <div className="text-sm">{test.category}</div>
                    <div className="text-md">Quantity: {checkStock(test.stock)}</div>

                    <div className="flex flex-col space-y-4">
                        <Button 
                            variant="default" 
                            className="w-full" 
                            disabled={isOutOfStock}
                        >
                            {isOutOfStock ? "Unavailable" : "Add to Cart"}
                        </Button>
                    </div>

                    <p className="text-md pt-6">{test.description}</p>
                </div>
            </div>

            <div className="border-t pt-6">
                <h2 className="text-2xl font-semibold">Customer Reviews</h2>
            </div>
        </div>
    );
}
