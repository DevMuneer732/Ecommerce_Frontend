// src/components/tracking/TrackOrderForm.tsx

import React from 'react';
import { Search, Loader2 } from 'lucide-react';

interface TrackOrderFormProps {
    orderId: string;
    setOrderId: (id: string) => void;
    handleSubmit: (e: React.FormEvent) => void;
    loading: boolean;
    error: string;
}

export const TrackOrderForm: React.FC<TrackOrderFormProps> = ({ 
    orderId, 
    setOrderId, 
    handleSubmit, 
    loading, 
    error 
}) => {
    return (
        <div className="p-8 bg-white rounded-xl shadow-lg">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                <div className="flex-grow relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Enter your Order ID (e.g., ORDER12345)"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                    />
                </div>
                
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto px-8 py-3 bg-blue text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50 flex items-center justify-center"
                >
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin mr-2 h-5 w-5" />
                            Tracking...
                        </>
                    ) : (
                        'Track Order'
                    )}
                </button>
            </form>

            {error && (
                <p className="mt-4 text-center text-red-600 text-sm font-medium">{error}</p>
            )}
        </div>
    );
};