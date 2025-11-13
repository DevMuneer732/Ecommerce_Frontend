import React from 'react';
import { Minus, Plus, X } from 'lucide-react';
import { useCartStore, CartItem } from '../../store/useCartStore'; // CartItem type import karein

interface CartItemCardProps {
    // Ab hum poora 'item' object as prop receive karengay
    item: CartItem;
}

export const CartItemCart: React.FC<CartItemCardProps> = ({ item }) => {

    const { updateQuantity, removeItem, isLoading } = useCartStore(state => ({
        updateQuantity: state.updateQuantity,
        removeItem: state.removeItem,
        isLoading: state.isLoading,
    }));

    const formatPrice = (p: number) => `$${p.toFixed(2)}`;

    const handleQuantityChange = (delta: number) => {
        const newQuantity = item.quantity + delta;
        updateQuantity(item._id, newQuantity);
    };

    const handleRemoveItem = () => {
        removeItem(item._id);
    };

    const isMaxQuantity = item.quantity >= item.stock;
    const isMinQuantity = item.quantity <= 1;
    return (
        <div className="flex items-start p-4 bg-white rounded-xl shadow-md border border-gray-100 mb-4">
            <img
                src={item.imageUrl}
                alt={item.title}
                className="w-24 h-24 object-cover rounded-lg mr-4 flex-shrink-0 border border-gray-100"
            />
            <div className="flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{item.title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                    Size: <span className="font-medium text-gray-700">{item.selectedSize}</span>
                    , Color: <span className="font-medium text-gray-700">{item.selectedColor}</span>
                </p>
                <button
                    className="text-sm text-red-600 hover:text-red-700 mt-2 self-start transition-colors flex items-center space-x-1 font-medium"
                    onClick={handleRemoveItem}
                    disabled={isLoading}
                >
                    <X size={14} /> <span>Remove</span>
                </button>
                {item.quantity === item.stock && (
                    <p className="text-xs text-orange-500 font-medium mt-1">Max stock reached!</p>
                )}
            </div>

            <div className="flex items-center border border-gray-300 rounded-lg mr-6 flex-shrink-0 mt-2">
                <button
                key={item._id}
                    className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-l-lg transition disabled:opacity-30"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={isMinQuantity || isLoading}
                >
                    <Minus size={18} />
                </button>
                <span className="w-8 text-center text-md font-medium text-gray-900">{item.quantity}</span>
                <button
                    className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-r-lg transition disabled:opacity-30"
                    onClick={() => handleQuantityChange(1)}
                    disabled={isMaxQuantity || isLoading}
                >
                    <Plus size={18} />
                </button>
            </div>

            {/* 4. Total Price */}
            <div className="text-xl font-extrabold text-gray-900 flex-shrink-0 self-center">
                {formatPrice(item.price * item.quantity)}
            </div>
        </div>
    );
};