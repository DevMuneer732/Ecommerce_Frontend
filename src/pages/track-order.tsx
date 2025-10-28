
import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { TrackOrderForm } from '../components/tracking/trackOrderForm';
import { OrderStatus } from '../components/tracking/orderStatus';

interface TrackingInfo {
    id: string;
    status: 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
    estimatedDelivery: string;
    history: {
        timestamp: string;
        location: string;
        details: string;
    }[];
}

const fetchTrackingInfo = (id: string): Promise<TrackingInfo | null> => {
    return new Promise(resolve => {
        setTimeout(() => {
            if (id === 'ORDER12345') {
                resolve({
                    id: id,
                    status: 'Shipped',
                    estimatedDelivery: 'Wednesday, October 30th',
                    history: [
                        { timestamp: '2025-10-25 10:00 AM', location: 'Warehouse A', details: 'Order Confirmed' },
                        { timestamp: '2025-10-26 03:30 PM', location: 'Shipping Hub', details: 'Processing Order' },
                        { timestamp: '2025-10-27 09:00 AM', location: 'Local Branch', details: 'Shipped via Express' },
                    ],
                });
            } else if (id === 'ORDER67890') {
                resolve({
                    id: id,
                    status: 'Delivered',
                    estimatedDelivery: 'Tuesday, October 22nd',
                    history: [
                        { timestamp: '2025-10-20 11:00 AM', location: 'Warehouse B', details: 'Order Confirmed' },
                        { timestamp: '2025-10-21 02:00 PM', location: 'Local Depot', details: 'Out for Delivery' },
                        { timestamp: '2025-10-22 10:00 AM', location: 'Customer Address', details: 'Delivered' },
                    ],
                });
            } else {
                resolve(null);
            }
        }, 1500);
    });
};

export const TrackOrder: React.FC = () => {
    const [orderId, setOrderId] = useState('');
    const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setTrackingInfo(null);
        if (!orderId.trim()) {
            setError('Please enter a valid Order ID.');
            return;
        }

        setLoading(true);
        const data = await fetchTrackingInfo(orderId.trim().toUpperCase());
        setLoading(false);

        if (data) {
            setTrackingInfo(data);
        } else {
            setError(`Order ID "${orderId}" was not found. Please check and try again.`);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12  min-h-screen">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8  pb-4 text-center">
                Track Your Order 
            </h1>

            {/* 1. Track Order Input Form */}
            <TrackOrderForm
                orderId={orderId}
                setOrderId={setOrderId}
                handleSubmit={handleSubmit}
                loading={loading}
                error={error}
            />

            {/* 2. Loading State */}
            {loading && !trackingInfo && (
                <div className="mt-8 text-center text-gray-600 p-6">
                    <Loader2 className="animate-spin mx-auto h-8 w-8 text-blue-500" />
                    <p className="mt-3 text-lg">Searching for your order...</p>
                </div>
            )}

            {/* 3. Tracking Results Display */}
            {trackingInfo && <OrderStatus info={trackingInfo} />}

            {/* 4. Default Welcome Message */}
            {!loading && !trackingInfo && !error && (
                <div className="mt-8 p-10 text-center text-gray-500 bg-white rounded-xl shadow-lg">
                    <p className="text-xl font-medium">Ready to see where your package is?</p>
                    <p className="mt-2">Enter your Order ID above and hit "Track Order" to view the latest status and history.</p>
                </div>
            )}
        </div>
    );
};