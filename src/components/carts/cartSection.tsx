import React, { useEffect } from 'react'; // <-- useEffect import karein
import { useCartStore } from '../../store/useCartStore';
import { Loader2 } from 'lucide-react'; // Loader import karein
import { CartItemCart } from './cartItemCart';

export const CartSection: React.FC = () => {
    const { items: cartItems, fetchCart, isLoading } = useCartStore((state) => ({
        items: state.items,
        fetchCart: state.fetchCart,
        isLoading: state.isLoading,
    }));

    // --- (NEW) Fetch cart from DB on component mount ---
    useEffect(() => {
        fetchCart();
    }, [fetchCart]); 

    const totalItems = cartItems.length;

    if (isLoading && totalItems === 0) {
        return (
            <div className="w-full lg:w-[65%] p-6 lg:p-0 flex justify-center items-center h-96">
                <Loader2 className="animate-spin h-10 w-10 text-blue-600" />
            </div>
        );
    }

    // --- Empty Cart State ---
    if (totalItems === 0) {
        return (
            <div className="w-full lg:w-[65%] p-6 lg:p-0">
                <div className="flex justify-between items-baseline mb-6">
                    <p className="text-4xl font-extrabold text-gray-900">Your Shopping Cart (0)</p>
                </div>
                <div className="text-center p-10 bg-white rounded-xl shadow-lg">
                    <p className="text-xl font-medium text-gray-600">Your cart is empty!</p>
                    <p className="text-sm text-gray-500 mt-2">Add items from the product page to see them here.</p>
                </div>
            </div>
        );
    }

    // --- Render actual cart items ---
    return (
        <div className="w-full lg:w-[65%] p-6 lg:p-0">
            <div className="flex justify-between items-baseline mb-6">
                <p className="text-4xl font-extrabold text-gray-900">Your Shopping Cart ({totalItems})</p>
            </div>
            <div className="max-h-[70vh] overflow-y-auto scrollbar-hide">
                {cartItems.map(item => (
                    <CartItemCart
                        key={item._id}
                        item={item}
                    />
                ))}
            </div>
        </div>
    );
};