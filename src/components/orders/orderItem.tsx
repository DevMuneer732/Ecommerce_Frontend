import React from 'react';

interface OrderItemProps {
    item: {
        name: string;
        image: string;
        price: number;
        quantity: number;
        size?: string;
        color?: string;
    };
}

export const OrderItem: React.FC<OrderItemProps> = ({ item }) => {
    return (
        <div className="flex items-start space-x-4">
            <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg border border-gray-200"
            />
            <div className="flex-grow">
                <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                <p className="text-xs text-gray-500">
                    {item.size && `Size: ${item.size}`}
                    {item.color && item.size && `, `}
                    {item.color && `Color: ${item.color}`}
                </p>
                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
            </div>
            <div className="text-sm font-medium text-gray-900">
                ${(item.price * item.quantity).toFixed(2)}
            </div>
        </div>
    );
};