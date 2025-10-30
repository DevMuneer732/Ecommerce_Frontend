import React from 'react';
import { useCartStore } from '../../store/useCartStore'; 
import { CartItemCart } from './cartItemCart';

export const CartSection: React.FC = () => {
    // Fetch items from the global store
    const cartItems = useCartStore(state => state.items);
    const totalItems = cartItems.length;

    // --- Fallback Dummy Data (for initial testing if store is empty) ---
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

    return (
        <div className="w-full lg:w-[65%] p-6 lg:p-0">

            {/* Header */}
            <div className="flex justify-between items-baseline mb-6">
                <p className="text-4xl font-extrabold text-gray-900">Your Shopping Cart ({totalItems})</p>
            </div>

            {/* Item List Container with Scrolling */}
            <div className="max-h-[70vh] overflow-y-auto scrollbar-hide">
                {cartItems.map(item => (
                    <CartItemCart
                        key={item.variantId}
                        imageUrl={item.imageUrl}
                        title={item.title}
                        price={item.price}
                        selectedSize={item.selectedSize} // No selectedColor
                        quantity={item.quantity}
                        stock={item.stock}
                        variantId={item.variantId}
                    />
                ))}
            </div>
        </div>
    );
};