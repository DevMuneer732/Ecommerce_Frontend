// src/components/carts/CartSection.tsx

import React from 'react';
import { CartItemCard } from './cartItemCart';

// Dummy data mirroring the reference image
const DUMMY_CART_ITEMS = [
    {
        id: 1,
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        title: "Classic Crewneck T-Shirt",
        price: 29.99,
        color: "Black",
        size: "M",
        quantity: 1,
    },
    {
        id: 2,
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        title: "Minimalist White Sneakers",
        price: 159.99,
        color: "White",
        size: "9",
        quantity: 1,
    },
    {
        id: 3,
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        title: "Slim Fit Denim Jeans",
        price: 89.50,
        color: "Vintage Blue",
        size: "32",
        quantity: 1,
    },
    {
        id: 4,
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        title: "Slim Fit Denim Jeans",
        price: 89.50,
        color: "Vintage Blue",
        size: "32",
        quantity: 1,
    },
    {
        id: 5,
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        title: "Slim Fit Denim Jeans",
        price: 89.50,
        color: "Vintage Blue",
        size: "32",
        quantity: 1,
    },
    {
        id: 6,
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        title: "Slim Fit Denim Jeans",
        price: 89.50,
        color: "Vintage Blue",
        size: "32",
        quantity: 1,
    },

];

const totalItems= DUMMY_CART_ITEMS.length
export const CartSection: React.FC = () => {
    return (
        // Added max-h-[70vh] (adjust value as needed), overflow-y-auto, and scrollbar-hide
        <div className="w-full lg:w-[65%] p-6 lg:p-0">
            
            {/* Header */}
            <div className="flex justify-between items-baseline mb-6">
                <p className="text-4xl font-extrabold text-gray-900">Your Shopping Cart({totalItems})</p>
            </div>

            {/* Item List Container with Scrolling */}
            <div className="max-h-[70vh] overflow-y-auto scrollbar-hide">
                {DUMMY_CART_ITEMS.map(item => (
                    // Note: Ensure CartItemCard component doesn't introduce padding/margins that affect scroll
                    <CartItemCard key={item.id} {...item} />
                ))}
            </div>
        </div>
    );
};