import React from 'react';
import { ShoppingCart, Trash } from 'lucide-react';
// Import the stores for actions
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';

// This interface must match the object being passed from Wishlist.tsx
interface WishlistItemCardProps {
    item: {
        id: number;
        imageUrl: string; // This is now the first image from imageUrls
        title: string;
        price: number;
        available: boolean;
        stock: number;
        availableSizes: string[];
    };
}

export const WishlistItemCard: React.FC<WishlistItemCardProps> = ({ item }) => {
    // --- Get actions from the stores ---
    const removeFromWishlist = useWishlistStore(state => state.removeFromWishlist);
    const addItemToCart = useCartStore(state => state.addItem);

    // --- Define Event Handlers ---

    const handleRemoveFromWishlist = () => {
        removeFromWishlist(item.id);
        console.log(`Removed ${item.title} from wishlist.`);
    };

    const handleMoveToCart = () => {
        // Add item to cart
        addItemToCart({
            id: item.id,
            title: item.title,
            price: item.price,
            selectedSize: item.availableSizes[0] || 'One Size', // Default to first size or 'One Size'
            stock: item.stock,
            imageUrl: item.imageUrl,
            quantity: 1,
        });
    };

    return (
        <div className="flex p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 items-center border border-gray-100">

            {/* Image */}
            <div className="w-24 h-24 overflow-hidden rounded-lg mr-6 flex-shrink-0">
                <img
                    src={item.imageUrl} // Use the single imageUrl
                    alt={item.title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Details */}
            <div className="flex-grow">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-2xl font-extrabold text-gray-900">${item.price.toFixed(2)}</p>
                <div className="mt-1">
                    {item.available ? (
                        <span className="text-sm font-medium text-green-600">In Stock</span>
                    ) : (
                        <span className="text-sm font-medium text-red-600">Out of Stock</span>
                    )}
                </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-3 ml-4 flex-shrink-0 items-center">

                {/* Add to Cart Button (Wired up) */}
                {item.available ? (
                    <button
                        className="p-3 bg-gray-700 text-white rounded-lg hover:bg-blue-700 transition duration-200 shadow-md"
                        onClick={handleMoveToCart}
                        title="Add to Cart"
                    >
                        <ShoppingCart size={20} />
                    </button>
                ) : (
                    // Placeholder to keep alignment
                    <div className="w-[44px] h-[44px]">
                        <button
                            className="p-3 bg-red-500 rounded-lg cursor-not-allowed"
                            title="Out of Stock"
                            disabled
                        >
                            <ShoppingCart size={30} />
                        </button>
                    </div>
                )}

                {/* Remove from Wishlist Button (Wired up) */}
                <button
                    className="p-3 bg-red-50 border border-red-300 rounded-lg text-red-600 hover:bg-red-100 transition duration-200"
                    onClick={handleRemoveFromWishlist}
                    title="Remove from Wishlist"
                >
                    <Trash size={20} />
                </button>
            </div>
        </div>
    );
};
