import React, { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useWishlistStore } from '../../store/useWishlistStore';
import { WishlistItemCard } from './wishListItemCard';

export const Wishlist: React.FC = () => {
    // 1. Get the list of IDs from the Wishlist store
    // Zustand automatically loads this from localStorage for you!
    const { items: wishlistItems, isLoading, fetchWishlist } = useWishlistStore(state => ({
        items: state.items,
        isLoading: state.isLoading,
        fetchWishlist: state.fetchWishlist,
    }));


    useEffect(() => {
        fetchWishlist();
    }, [fetchWishlist]);

    const totalItems = wishlistItems.length;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">

            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 pb-4 border-b">
                My Wishlist ({totalItems})
            </h1>

            <div className="flex flex-col">
                <div className="w-full space-y-4">
                    {/* Handle Loading State */}
                    {isLoading && totalItems === 0 && (
                        <div className="flex justify-center items-center h-48">
                            <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
                        </div>
                    )}

                    {/* Handle Empty State */}
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
                        // Render the items directly from the store
                        wishlistItems.map(item => (
                            <WishlistItemCard
                                key={item.id}
                                item={item}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};