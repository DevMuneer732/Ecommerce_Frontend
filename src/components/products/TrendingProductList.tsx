import React, { useEffect } from 'react';
import { useProductStore } from '../../store/useProductStore'; // Import the store
import { Loader2 } from 'lucide-react';
import { ProductCard } from './productCard';

// Note: The ProductData interface is no longer needed here, 
// as the 'Product' type is inferred from the store.

export const TrendingProductList: React.FC = () => {
    // 1. Fetch data and actions from the Zustand store
    const { catalog, fetchProducts, isLoading } = useProductStore((state) => ({
        catalog: state.catalog,
        fetchProducts: state.fetchProducts,
        isLoading: state.isLoading,
    }));

    // 2. Fetch products when the component mounts (if catalog is empty)
    useEffect(() => {
        if (catalog.length === 0) {
            fetchProducts({}); // Fetch with default filters
        }
    }, [catalog, fetchProducts]);

    // 3. Determine the "trending" products
    // Here, we define "trending" as the top 4 products sorted by rating.
    const trendingProducts = React.useMemo(() => {
        return [...catalog]
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 4); 
    }, [catalog]);

    if (isLoading && catalog.length === 0) {
        return (
            <div className="flex justify-center items-center h-48">
                <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
            </div>
        );
    }

    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {trendingProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        productId={product.id}
                        title={product.title}
                        imageUrl={product.imageUrls[0]}
                        price={product.price}
                        comparePrice={product.comparePrice}
                        rating={product.rating}
                        reviewCount={product.reviewCount}
                    />
                ))}
            </div>
        </div>
    );
};