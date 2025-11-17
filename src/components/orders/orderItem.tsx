import React from 'react';
import { Button } from '../ui/button';
import { Star } from 'lucide-react';
interface OrderItemProps {
    item: {
        _id: string;
        product: string;
        name: string;
        image: string;
        price: number;
        quantity: number;
        size?: string;
        color?: string;
    };
    orderStatus?: string;
    onAddReviewClick?: (product: { id: string; name: string }) => void; 
}

export const OrderItem: React.FC<OrderItemProps> = ({ item, orderStatus, onAddReviewClick }) => {
    const canReview = orderStatus?.toLowerCase() === 'delivered';
    return (
        <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
            <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 sm:w-20 sm:h-20 object-cover rounded-lg border border-gray-200"
            />
            <div className="flex-grow">
                <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                <p className="text-xs text-gray-500">
                    {item.size && `Size: ${item.size}`}
                    {item.color && item.size && `, `}
                    {item.color && `Color: ${item.color}`}
                </p>
                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>

                {/* --- 3. (FIX) Button ko yahan add karein --- */}
                {canReview && (
                    <Button
                        variant="outline"
                        size="sm"
                        className="mt-3"
                        onClick={() => onAddReviewClick({ id: item.product, name: item.name })}
                    >
                        <Star className="w-4 h-4 mr-2" />
                        Add Review
                    </Button>
                )}
            </div>
            <div className="text-sm font-medium text-gray-900 self-start">
                ${(item.price * item.quantity).toFixed(2)}
            </div>
        </div>
    );
};