import React from 'react';
import { ShoppingCart, Trash, Loader2 } from 'lucide-react';
// Import the stores for actions
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { Product } from '../../store/useProductStore';
interface WishlistItemCardProps {
    item: Product
}
export const WishlistItemCard: React.FC<WishlistItemCardProps> = ({ item }) => {

    // (FIX 3) Naye actions hooks istemaal karein
    const { toggleWishlist } = useWishlistStore();
    const { addItemToCart, isLoading: isCartLoading } = useCartStore(state => ({
        addItemToCart: state.addItem,
        isLoading: state.isLoading,
    }));

    const isAvailable = item.stock > 0;

    const handleRemoveFromWishlist = () => {
        toggleWishlist(item.id); 
    };

    const handleMoveToCart = () => {
        const firstVariant = item.variants[0];
        if (firstVariant) {
            addItemToCart(
                item.id,         
                firstVariant._id, 
                1                 
            );
        } else {
            console.error("Cannot move to cart: Product has no variants.");
        }
    };

    return (
        <div className="flex p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 items-center border border-gray-100">

            <div className="w-24 h-24 overflow-hidden rounded-lg mr-6 flex-shrink-0">
                <img
                    src={item.imageUrls[0]}
                    alt={item.title}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="flex-grow">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-2xl font-extrabold text-gray-900">${item.price.toFixed(2)}</p>
                <div className="mt-1">
                    {isAvailable ? (
                        <span className="text-sm font-medium text-green-600">In Stock</span>
                    ) : (
                        <span className="text-sm font-medium text-red-600">Out of Stock</span>
                    )}
                </div>
            </div>

            <div className="flex space-x-3 ml-4 flex-shrink-0 items-center">
                {isAvailable ? (
                    <button
                        className="p-3 bg-gray-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 shadow-md"
                        onClick={handleMoveToCart}
                        title="Add to Cart"
                        disabled={isCartLoading} 
                    >
                        {isCartLoading ? <Loader2 size={20} className="animate-spin" /> : <ShoppingCart size={20} />}
                    </button>
                ) : (
                    <div className="w-[44px] h-[44px]">
                        <button
                            className="p-3 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed"
                            title="Out of Stock"
                            disabled
                        >
                            <ShoppingCart size={20} />
                        </button>
                    </div>
                )}

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