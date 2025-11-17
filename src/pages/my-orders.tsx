// src/pages/MyOrdersPage.tsx

import React, { useEffect } from 'react';
import { useOrderStore } from '../store/useOrderStore'; // <-- Aapka store

// Imports
import { OrderLoading } from '../components/orders/orderLoading';
import { EmptyOrders } from '../components/orders/emptyOrders';
import { OrderCard } from '../components/orders/orderCard';
import { OrderError } from '../components/orders/orderError';
import { OrderPagination } from '../components/orders/orderPagination';


export const MyOrders: React.FC = () => {
    const {
        orders,
        listLoading, 
        currentPage,
        totalPages,
        totalOrders,
        listError,   
        fetchOrders,
        nextPage,
        prevPage,
    } = useOrderStore();

    useEffect(() => {
        fetchOrders(1);
    }, [fetchOrders]);

    // --- Content ko render karne ka function ---
    const renderContent = () => {
        // --- (FIX) ---
        if (listLoading) { // <-- Naam badla
            return <OrderLoading />;
        }

        if (listError) { // <-- Naam badla
            return <OrderError error={listError} />;
        }
        // --- (END FIX) ---

        if (totalOrders === 0) {
            return <EmptyOrders />;
        }

        // --- Content State ---
        return (
            <>
                <div className="space-y-6">
                    {orders.map((order) => (
                        <OrderCard key={order._id} order={order} />
                    ))}
                </div>
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
                {!listLoading && totalOrders > 0 && ( // <-- Naam badla
                    <span className="text-lg font-medium text-gray-500 ml-2">
                        ({totalOrders} Total)
                    </span>
                )}
            </h1>
            {renderContent()}
        </div>
    );
};