import React, { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
// Import your stores
import { useWishlistStore } from '../../store/useWishlistStore';
import { useProductStore } from '../../store/useProductStore';
import { WishlistItemCard } from './wishListItemCard';
// Corrected import path/casing

// This interface should match the Product interface from your useProductStore
interface WishlistItem {
    id: number;
    imageUrls: string[]; // Use imageUrls array to match store
    title: string;
    price: number;
    stock: number; // Use stock from store
    available: boolean; // This will be derived from stock
    // Add other properties from your Product store interface as needed
    description: string;
    comparePrice?: number;
    rating: number;
    reviewCount: number;
    availableColors: string[];
    availableSizes: string[];
    category?: string;
}

export const Wishlist: React.FC = () => {
    // 1. Get the list of IDs from the Wishlist store
    // Zustand automatically loads this from localStorage for you!
    const wishlistIds = useWishlistStore(state => state.wishlistIds);

    // 2. Get the full product catalog and fetch action from the Product store
    const { catalog, fetchProducts, isLoading } = useProductStore((state) => ({
        catalog: state.catalog,
        fetchProducts: state.fetchProducts,
        isLoading: state.isLoading,
    }));

    // 3. Fetch the catalog if it's not already loaded
    useEffect(() => {
        // This effect runs when the component mounts
        // If the catalog is empty AND we are not already loading, fetch products.
        if (catalog.length === 0 && !isLoading) {
            fetchProducts({}); // Fetch all products with default filters
        }
        // --- CORRECTED DEPENDENCY ARRAY ---
        // This ensures the effect runs again if 'fetchProducts' changes, but not on every render.
    }, [catalog, fetchProducts, isLoading]);

    // 4. Filter the main catalog to find only the wishlisted items
    const wishlistItems = React.useMemo(() => {
        return catalog
            .filter(product => wishlistIds.includes(product.id))
            .map(product => ({
                ...product,
                available: product.stock > 0, // Derive availability from stock
                imageUrl: product.imageUrls[0] // Get first image for the card
            }));
    }, [catalog, wishlistIds]); // This re-runs only if the catalog or wishlist IDs change

    const totalItems = wishlistItems.length;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">

            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 pb-4 border-b">
                My Wishlist ({totalItems})
            </h1>

            <div className="flex flex-col">
                <div className="w-full space-y-4">
                    {/* Handle Loading State (while catalog is being fetched) */}
                    {isLoading && catalog.length === 0 && (
                        <div className="flex justify-center items-center h-48">
                            <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
                            <span className="ml-3 text-lg text-gray-600">Loading products...</span>
                        </div>
                    )}

                    {/* Handle Empty State (finished loading, no items) */}
                    {!isLoading && totalItems === 0 ? (
                        <div className="text-center p-10 bg-white rounded-lg shadow-md">
                            <p className="text-xl text-gray-600">Your wishlist is empty.</p>
                            <p className="text-sm text-gray-500 mt-2">Click the heart icon on any product to save it here.</p>
                            <a
                                href="/shop"
                                className="mt-4 inline-block py-2 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
                            >
                                Start Shopping
                            </a>
                        </div>
                    ) : (
                        // Render the filtered list of items
                        wishlistItems.map(item => (
                            <WishlistItemCard
                                key={item.id}
                                // Pass the full product object to the card
                                item={item}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};