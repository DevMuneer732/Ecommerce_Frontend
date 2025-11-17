// src/components/orders/OrderSummaryCard.tsx

import React from 'react';
import { FullOrder } from '../../store/useOrderStore';

const formatPrice = (p: number) => `$${p.toFixed(2)}`;

export const OrderSummaryCard: React.FC<{ order: FullOrder }> = ({ order }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-5 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Order Summary</h3>
            </div>
            <div className="p-5 space-y-3">
                <div className="flex justify-between text-sm text-gray-700">
                    <span>Subtotal</span>
                    <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-700">
                    <span>Shipping</span>
                    <span>{formatPrice(order.shippingPrice)}</span>
                </div>
                {order.discountAmount > 0 && (
                    <div className="flex justify-between text-sm text-red-600">
                        <span>Discount ({order.couponUsed})</span>
                        <span>- {formatPrice(order.discountAmount)}</span>
                    </div>
                )}
                <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>{formatPrice(order.totalPrice)}</span>
                </div>
            </div>
        </div>
    );
};