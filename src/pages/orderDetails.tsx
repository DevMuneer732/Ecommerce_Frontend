// src/pages/SingleOrderPage.tsx

import React, { useEffect,useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useOrderStore } from '../store/useOrderStore'; // <-- Aapka store

// Common components
import { OrderLoading } from '../components/orders/orderLoading';
import { OrderError } from '../components/orders/orderError';
import { OrderItem } from '../components/orders/orderItem';

// Naye detail components
import { OrderStatusStepper } from '../components/orders/orderStatusStepper';
import { OrderSummaryCard } from '../components/orders/orderSummaryCard';
import { ShippingDetailsCard } from '../components/orders/ShippingDetailsCard';
import { ArrowLeft } from 'lucide-react';
import { AddReview } from '../components/reviews/addReview';


// Helper
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export const OrderDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    // --- (FIX) Store se naye names istemal karein ---
    const {
        selectedOrder,
        detailLoading,
        detailError,
        fetchOrderById,
        clearSelectedOrder
    } = useOrderStore();

    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [productToReview, setProductToReview] = useState<{ id: string; name: string } | null>(null);

    useEffect(() => {
        if (id) {
            fetchOrderById(id); // <-- Action name badla
        }
        return () => {
            clearSelectedOrder(); // <-- Action name badla
        };
    }, [id, fetchOrderById, clearSelectedOrder]); // <-- Dependencies update karein

    const handleAddReviewClick = (product: { id: string; name: string }) => {
        setProductToReview(product);
        setIsReviewModalOpen(true);
    };

    const onReviewSubmitted = () => {
        // Aap yahan order ko dobara fetch kar sakte hain agar zaroori ho
        // fetchOrderById(id);
    }
    // --- (FIX) State variables ke naye naam istemal karein ---
    if (detailLoading) return <OrderLoading />;
    if (detailError) return <OrderError error={detailError} />;
    if (!selectedOrder) return null; // 'order' ke bajaye 'selectedOrder'
    // --- (END FIX) ---

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <AddReview
                isOpen={isReviewModalOpen}
                onOpenChange={setIsReviewModalOpen}
                product={productToReview}
                onReviewSubmitted={onReviewSubmitted}
            />
            {/* Header */}
            <div className="mb-8">
                <Link
                    to="/my-orders"
                    className="flex items-center text-sm text-blue-600 hover:underline mb-4"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to My Orders
                </Link>
                <h1 className="text-3xl font-extrabold text-gray-900">
                    Order Details
                </h1>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-gray-500 mt-1">
                    {/* // --- (FIX) --- */}
                    <span>Order ID: <span className="font-mono">#{selectedOrder._id}</span></span>
                    <span className="hidden sm:inline">|</span>
                    <span>Placed on: {formatDate(selectedOrder.createdAt)}</span>
                </div>
            </div>

            {/* Stepper */}
            <div className="mb-8">
                {/* // --- (FIX) --- */}
                <OrderStatusStepper status={selectedOrder.orderStatus} />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column (Items) */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="p-5 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">
                                {/* // --- (FIX) --- */}
                                Items ({selectedOrder.orderItems.length})
                            </h3>
                        </div>
                        <div className="p-5 space-y-5 divide-y divide-gray-200">
                            {/* // --- (FIX) --- */}
                            {selectedOrder.orderItems.map(item => (
                                <div key={item._id} className="pt-5 first:pt-0">
                                    <OrderItem item={item} orderStatus={selectedOrder.orderStatus} onAddReviewClick={handleAddReviewClick} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column (Summary & Shipping) */}
                <div className="lg:col-span-1 space-y-6">
                    {/* // --- (FIX) --- */}
                    <OrderSummaryCard order={selectedOrder} />
                    <ShippingDetailsCard shippingInfo={selectedOrder.shippingInfo} />
                </div>
            </div>
        </div>
    );
};