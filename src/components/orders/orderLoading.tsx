import React from 'react';
import { Loader2 } from 'lucide-react';

export const OrderLoading: React.FC = () => {
    return (
        <div className="flex justify-center items-center min-h-[60vh]">
            <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
            <span className="sr-only">Loading orders...</span>
        </div>
    );
};