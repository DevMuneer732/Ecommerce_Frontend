import React from 'react';
import { Minus, Plus, X } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore'; // Import the store

interface CartItemCardProps {
    variantId: string; 
    imageUrl: string;
    title: string;
    price: number;
    selectedSize: string;
    quantity: number;
    stock: number;
}

export const CartItemCart: React.FC<CartItemCardProps> = ({
    variantId,
    imageUrl,
    title,
    price,
    selectedSize,
    quantity,
    stock,
}) => {
    
    const updateQuantity = useCartStore(state => state.updateQuantity);
    const removeItem = useCartStore(state => state.removeItem);

    // Helper to format currency
    const formatPrice = (p: number) => `$${p.toFixed(2)}`;

    const handleQuantityChange = (delta: number) => {
        const newQuantity = quantity + delta;
        updateQuantity(variantId, newQuantity);
    };

    const handleRemoveItem = () => {
        removeItem(variantId);
        console.log(`Item ${variantId} removed from cart.`);
    };
    
    const isMaxQuantity = quantity >= stock;
    const isMinQuantity = quantity <= 1;

    return (
        <div className="flex items-start p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 border border-gray-100 mb-4">

            {/* 1. Image */}
            <img
                src={imageUrl}
                alt={title}
                className="w-24 h-24 object-cover rounded-lg mr-4 flex-shrink-0 border border-gray-100"
            />

            {/* 2. Details & Controls (Left Column) */}
            <div className="flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{title}</h3>

                {/* UPDATED: Removed color display */}
                <p className="text-sm text-gray-500 mt-1">
                    Size: <span className="font-medium text-gray-700">{selectedSize}</span>
                </p>
                
                {/* Remove Button */}
                <button
                    className="text-sm text-red-600 hover:text-red-700 mt-2 self-start transition-colors flex items-center space-x-1 font-medium"
                    onClick={handleRemoveItem}
                >
                    <X size={14} /> <span>Remove</span>
                </button>

                {/* Stock Warning */}
                {quantity === stock && (
                    <p className="text-xs text-orange-500 font-medium mt-1">Max available stock reached!</p>
                )}
            </div>

            {/* 3. Quantity Controls (Middle Column) */}
            <div className="flex items-center border border-gray-300 rounded-lg mr-6 flex-shrink-0 mt-2">
                <button
                    className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-l-lg transition disabled:opacity-30"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={isMinQuantity}
                    aria-label="Decrease quantity"
                >
                    <Minus size={18} />
                </button>

                <span className="w-8 text-center text-md font-medium text-gray-900">{quantity}</span>

                <button
                    className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-r-lg transition disabled:opacity-30"
                    onClick={() => handleQuantityChange(1)}
                    disabled={isMaxQuantity}
                    aria-label="Increase quantity"
                >
                    <Plus size={18} />
                </button>
            </div>

            {/* 4. Total Price (Right Column) */}
            <div className="text-xl font-extrabold text-gray-900 flex-shrink-0 self-center">
                {formatPrice(price * quantity)}
            </div>
        </div>
    );
};