
import React from 'react';
import { ShoppingCart, Trash } from 'lucide-react';

interface WishlistItemCardProps {
    item: {
        id: number;
        imageUrl: string;
        title: string;
        price: number;
        color: string;
        size: string;
        available: boolean;
    };
}

export const WishlistItemCard: React.FC<WishlistItemCardProps> = ({ item }) => {
    return (
        <div className="flex p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 items-center border border-gray-100">

            <div className="w-24 h-24 overflow-hidden rounded-lg mr-6 flex-shrink-0">
                <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                />
            </div>

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

            <div className="flex space-x-3 ml-4 flex-shrink-0 items-center">

                {item.available ? (
                    <button
                        className="p-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md"
                        onClick={() => console.log(`Moving ${item.title} to cart`)}
                        title="Add to Cart" 
                    >
                        <ShoppingCart size={20} />
                    </button>
                ) : (
                    <div className="w-[44px] h-[44px]"> 
                    </div>
                )}

                <button
                    className="p-3 bg-red-50 border border-red-300 rounded-lg text-red-600 hover:bg-red-100 transition duration-200"
                    onClick={() => console.log(`Removing ${item.title}`)}
                    title="Remove from Wishlist" 
                >
                    <Trash size={20} />
                </button>
            </div>
        </div>
    );
};