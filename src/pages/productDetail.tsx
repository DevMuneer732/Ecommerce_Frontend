import React, { useEffect } from 'react';
// Import useParams from react-router-dom to get the ID from the URL
import { useParams } from 'react-router-dom';

import { Loader2 } from 'lucide-react';
// Import the Product Store
import { useProductStore } from '../store/useProductStore';
import { ProductDetailCard } from '../components/products/productDetailCard';

export const ProductDetail: React.FC = () => {
    // --- Get productId from URL using useParams ---
    // The key 'productId' MUST match the parameter name in your route definition (e.g., path: '/shop/:productId')

    const { productId } = useParams<{ productId: string }>();
    console.log("productId", productId);

    // --- Select state and actions from the Product Store ---
    const {
        selectedProduct,
        isLoading,
        error,
        fetchSingleProduct
    } = useProductStore((state) => ({
        selectedProduct: state.selectedProduct,
        isLoading: state.isLoading,
        error: state.error,
        fetchSingleProduct: state.fetchSingleProduct,
    }));

    // --- Fetch data when the component mounts or productId changes ---
    useEffect(() => {
        if (productId) {
            fetchSingleProduct(Number(productId));
        }
        // Dependency array ensures this runs when the ID from the URL changes
    }, [productId]);

    // --- Render Loading State ---
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <Loader2 className="animate-spin h-10 w-10 text-blue-600" />
                <span className="ml-3 text-xl text-gray-600">Loading product details...</span>
            </div>
        );
    }

    // --- Render Error State (e.g., Product Not Found) ---
    if (error || !selectedProduct) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className='p-12 bg-white rounded-xl shadow-lg text-center'>
                    <h1 className="text-3xl font-bold text-red-600">404: Product Not Found</h1>
                    <p className="mt-2 text-gray-600">{error || "The product you are looking for does not exist."}</p>
                    {/* Add a link back to the shop */}
                    <a href="/shop" className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Back to Shop
                    </a>
                </div>
            </div>
        );
    }

    return <ProductDetailCard product={selectedProduct} />;
};

