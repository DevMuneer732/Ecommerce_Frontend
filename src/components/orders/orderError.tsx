import React from 'react';
import { AlertCircle } from 'lucide-react';

export const OrderError: React.FC<{ error: string }> = ({ error }) => {
    return (
        <div className="flex flex-col justify-center items-center min-h-[60vh] text-red-600">
            <AlertCircle className="w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold">Error Loading Orders</h3>
            <p>{error}</p>
        </div>
    );
};