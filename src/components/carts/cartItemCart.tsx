// src/components/carts/CartItemCard.tsx

import React from 'react';

interface CartItemCardProps {
    imageUrl: string;
    title: string;
    price: number;
    color: string;
    size: string;
    quantity: number;
    // Assume productId or cartItemId is needed for real app logic
}

export const CartItemCard: React.FC<CartItemCardProps> = ({
    imageUrl,
    title,
    price,
    color,
    size,
    quantity,
}) => {
    // Helper to format currency
    const formatPrice = (p: number) => `$${p.toFixed(2)}`;

    // State/handlers for quantity control would go here in a real app
    const handleQuantityChange = (newQuantity: number) => {
        // console.log("New quantity:", newQuantity);
    };

    return (
        <div className="flex items-start p-4 bg-white rounded-lg shadow-sm border border-gray-100 mb-4">

            {/* 1. Image */}
            <img
                src={imageUrl}
                alt={title}
                className="w-24 h-24 object-cover rounded-md mr-4 flex-shrink-0"
            />

            {/* 2. Details & Controls (Left Column) */}
            <div className="flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>

                <p className="text-md font-bold text-gray-700">{formatPrice(price)}</p>

                <p className="text-sm text-gray-500 mt-1">
                    Color: {color}, Size: {size}
                </p>

                <button
                    className="text-sm text-red-600 hover:text-red-700 mt-1 self-start transition-colors"
                    onClick={() => console.log('Remove item')}
                >
                    Remove
                </button>
            </div>

            {/* 3. Quantity Controls (Middle Column) */}
            <div className="flex items-center space-x-2 mr-6 flex-shrink-0">
                <button
                    className="p-1 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100 transition"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" /></svg>
                </button>

                <span className="w-6 text-center text-lg font-medium text-gray-900">{quantity}</span>

                <button
                    className="p-1 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100 transition"
                    onClick={() => handleQuantityChange(quantity + 1)}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                </button>
            </div>

            {/* 4. Total Price (Right Column) */}
            <div className="text-lg font-bold text-gray-900 flex-shrink-0">
                {formatPrice(price * quantity)}
            </div>
        </div>
    );
};