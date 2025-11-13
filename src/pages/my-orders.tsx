// src/pages/MyOrdersPage.tsx

import React, { useEffect } from 'react';
import { useOrderStore } from '../store/useOrderStore';

import { OrderLoading } from '../components/orders/orderLoading';
import { EmptyOrders } from '../components/orders/emptyOrders';
import { OrderCard } from '../components/orders/orderCard';
import { OrderError } from '../components/orders/OrderError';
import { OrderPagination } from '../components/orders/OrderPagination';


export const MyOrdersPage: React.FC = () => {
    const {
        orders,
        isLoading,
        currentPage,
        totalPages,
        totalOrders,
        error,
        fetchOrders,
        nextPage,
        prevPage,
    } = useOrderStore();

    // Page load hone par pehla page fetch karein
    useEffect(() => {
        fetchOrders(1);
    }, [fetchOrders]); // 'fetchOrders' ko dependency mein rakhein

    // --- Content ko render karne ka function ---
    const renderContent = () => {
        if (isLoading) {
            return <OrderLoading />;
        }

        if (error) {
            return <OrderError error={error} />;
        }

        if (totalOrders === 0) {
            return <EmptyOrders />;
        }

        // --- Content State ---
        return (
            <>
                {/* Orders List */}
                <div className="space-y-6">
                    {orders.map((order) => (
                        <OrderCard key={order._id} order={order} />
                    ))}
                </div>

                {/* Pagination Controls */}
                <OrderPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onNext={nextPage}
                    onPrev={prevPage}
                />
            </>
        );
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8 pb-4 border-b border-gray-200">
                My Orders
                {!isLoading && totalOrders > 0 && (
                    <span className="text-lg font-medium text-gray-500 ml-2">
                        ({totalOrders} Total)
                    </span>
                )}
            </h1>

            {renderContent()}
        </div>
    );
};