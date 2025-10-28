
import React from 'react';
import { WishlistItemCard } from './wishListItemCard';

interface WishlistItem {
    id: number;
    imageUrl: string;
    title: string;
    price: number;
    color: string;
    size: string;
    available: boolean;
}

const DUMMY_WISHLIST_ITEMS: WishlistItem[] = [
    {
        id: 101,
        imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880",
        title: "Limited Edition Running Shoes",
        price: 99.99,
        color: "Crimson Red",
        size: "10.5",
        available: true,
    },
    {
        id: 102,
        imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880",
        title: "Noise Cancelling Headphones",
        price: 249.00,
        color: "Midnight Black",
        size: "N/A",
        available: true,
    },
    {
        id: 103,
        imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880",
        title: "Vintage Leather Wallet",
        price: 45.00,
        color: "Brown",
        size: "Small",
        available: false, 
    },
];

export const Wishlist: React.FC = () => { 
    const totalItems = DUMMY_WISHLIST_ITEMS.length;

    return (
        <div className="max-w-7xl mx-auto min-h-screen">

        
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4  pb-4">
             My Wishlist ({totalItems})
            </h1>

            <div className="flex flex-col">

                <div className="w-full space-y-4"> 
                    {totalItems > 0 ? (
                        DUMMY_WISHLIST_ITEMS.map(item => (
                            <WishlistItemCard key={item.id} item={item} />
                        ))
                    ) : (
                        <div className="text-center p-10 bg-white rounded-lg shadow-md">
                            <p className="text-xl text-gray-600">Your wishlist is empty. Start adding some favorites!</p>
                            <button className="mt-4 py-2 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200">
                                Start Shopping
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};