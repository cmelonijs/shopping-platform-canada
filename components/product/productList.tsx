import ProductCard from "./productCard";
import product1 from "@/assets/images/sample-products/p1-1.jpg";
import product2 from "@/assets/images/sample-products/p2-1.jpg";
import product3 from "@/assets/images/sample-products/p3-1.jpg";
import product4 from "@/assets/images/sample-products/p4-1.jpg";
import product5 from "@/assets/images/sample-products/p5-1.jpg";
import product6 from "@/assets/images/sample-products/p6-1.jpg";

const products = [
    {
        id: 1,
        name: "Blue Dress Shirt",
        price: 140.00,
        description: "Made from breathable cotton with a tailored fit—perfect for casual or smart-casual looks.",
        image: product1,
    },
    {
        id: 2,
        name: "Stripe Brown Dress Shirt",
        price: 140.00,
        description: "Timeless plaid style, great for layering or wearing solo—crafted for comfort and versatility.",
        image: product2,
    },
    {
        id: 3,
        name: "Beige Check Dress Shirt",
        price: 120.00,
        description: "Understated check pattern with a classic cut—easy to dress up or down.",
        image: product3,
    },
    {
        id: 4,
        name: "Olive Green Dress Shirt",
        price: 180.00,
        description: "Military-inspired style with utility pockets—adds an edge to any outfit.",
        image: product4,
    },
    {
        id: 5,
        name: "Blue Striped Dress Shirt",
        price: 200.00,
        description: "A modern take on a classic pinstripe—sharp and versatile for office or weekend wear.",
        image: product5,
    },
    {
        id: 6,
        name: "Pink Hoodie",
        price: 90.00,
        description: "Soft, cozy, and casual—this pink hoodie is perfect for relaxed days.",
        image: product6,
    },
]

export default function ProductList() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Newest Arrivals</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}