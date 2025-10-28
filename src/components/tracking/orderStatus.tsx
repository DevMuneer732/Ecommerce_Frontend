// src/components/tracking/OrderStatus.tsx

import React from 'react';

// Re-defining the type here is good practice, or you can import it from the main page file.
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

interface OrderStatusProps {
    info: TrackingInfo;
}

export const OrderStatus: React.FC<OrderStatusProps> = ({ info }) => {
    
    const getStatusStyle = (status: TrackingInfo['status']) => {
        switch (status) {
            case 'Delivered': return 'bg-green-100 text-green-700 border-green-300';
            case 'Shipped':
            case 'Out for Delivery': return 'bg-blue-100 text-blue-700 border-blue-300';
            case 'Processing': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
            default: return 'bg-gray-100 text-gray-700 border-gray-300';
        }
    };

    return (
        <div className="mt-8 p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Order #{info.id}</h2>
            
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <span className={`px-4 py-1.5 text-lg font-semibold rounded-full border ${getStatusStyle(info.status)}`}>
                    Status: {info.status}
                </span>
                <p className="text-lg font-medium text-gray-700">
                    Est. Delivery: <span className="text-blue-600">{info.estimatedDelivery}</span>
                </p>
            </div>

            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Tracking History</h3>
            
            {/* Timeline */}
            <ol className="relative border-l border-gray-200 ml-3">
                {info.history.slice().reverse().map((event, index) => (
                    <li key={index} className="mb-8 ml-6">
                        <span className={`absolute flex items-center justify-center w-3 h-3 rounded-full -left-1.5 ring-4 ring-white ${index === 0 ? 'bg-blue-600' : 'bg-gray-400'}`}></span>
                        <h4 className="flex items-center text-lg font-semibold text-gray-900">
                            {event.details}
                        </h4>
                        <p className="block mb-2 text-sm font-normal leading-none text-gray-500">
                            {event.timestamp} at {event.location}
                        </p>
                    </li>
                ))}
            </ol>
        </div>
    );
};