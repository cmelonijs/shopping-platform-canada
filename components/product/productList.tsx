'use client';

import { useEffect, useState } from 'react';
import ProductCard from './productCard';

export default function ProductList() {
  // State to hold fetched products 
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      // Fetch products from the API endpoint
      const response = await fetch('/api/products');
      // Then convert the response to JSON
      const data = await response.json();
      // Update the state with the fetched products
      setProducts(data);
    };

    // Now we load the products 
     fetchProducts();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Newest Arrivals</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
