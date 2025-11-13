import React from 'react';

const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
        case 'processing':
            return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'shipped':
            return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'delivered':
            return 'bg-green-100 text-green-800 border-green-200';
        case 'cancelled':
            return 'bg-red-100 text-red-800 border-red-200';
        default:
            return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};

export const OrderStatusBadge: React.FC<{ status: string }> = ({ status }) => {
    return (
        <span
            className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusClass(status)}`}
        >
            {status}
        </span>
    );
};