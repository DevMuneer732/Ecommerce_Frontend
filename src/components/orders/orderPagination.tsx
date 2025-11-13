import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface OrderPaginationProps {
    currentPage: number;
    totalPages: number;
    onNext: () => void;
    onPrev: () => void;
}

export const OrderPagination: React.FC<OrderPaginationProps> = ({ currentPage, totalPages, onNext, onPrev }) => {
    if (totalPages <= 1) {
        return null; // Agar 1 hi page hai to kuch na dikhayein
    }

    return (
        <div className="flex justify-between items-center mt-10 pt-4 border-t border-gray-200">
            <button
                onClick={onPrev}
                disabled={currentPage === 1}
                className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
            </button>

            <span className="text-sm text-gray-700">
                Page <span className="font-bold">{currentPage}</span> of <span className="font-bold">{totalPages}</span>
            </span>

            <button
                onClick={onNext}
                disabled={currentPage === totalPages}
                className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
            </button>
        </div>
    );
};