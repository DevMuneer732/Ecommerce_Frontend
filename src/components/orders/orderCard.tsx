import React from 'react';
import { Order } from '../../store/useOrderStore'; // Store se type import karein
import { OrderItem } from './orderItem';
import { OrderStatusBadge } from './OrderStatusBadge';

// Helper function
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export const OrderCard: React.FC<{ order: Order }> = ({ order }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Card Header (Naya elegant design) */}
            <div className="p-4 sm:p-6 bg-gray-50 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                    <div className="mb-3 sm:mb-0">
                        <h3 className="text-sm font-semibold text-gray-900">
                            Order ID: <span className="font-mono text-gray-600">#{order._id.substring(0, 10)}...</span>
                        </h3>
                        <p className="text-xs text-gray-500">
                            Placed on: {formatDate(order.createdAt)}
                        </p>
                    </div>
                    <div className="flex flex-col sm:items-end space-y-2">
                        <OrderStatusBadge status={order.orderStatus} />
                        <span className="text-lg font-bold text-gray-900">
                            Total: ${order.totalPrice.toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Card Body (Items) */}
            <div className="p-4 sm:p-6 space-y-4">
                {order.orderItems.map((item) => (
                    <OrderItem key={item._id} item={item} />
                ))}
            </div>
        </div>
    );
};