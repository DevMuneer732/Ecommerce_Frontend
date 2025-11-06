import React, { useEffect, useState } from 'react';
import { Filter, X } from 'lucide-react';
import { useProductStore } from '../store/useProductStore';
import { ProductGrid } from '../components/shop/productGrid';
import { ProductFilters } from '../components/shop/productFilters';

export const Shop: React.FC = () => {

    const {
        catalog,
        filters,
        isLoading,
        setFilters,
        fetchProducts,
        totalProducts
    } = useProductStore((state) => ({
        catalog: state.catalog,
        filters: state.filters,
        isLoading: state.isLoading,
        setFilters: state.setFilters,
        fetchProducts: state.fetchProducts,
        totalProducts: state.totalProducts, 
    }));

    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    // --- CRITICAL FIX ---
    // This useEffect hook should ONLY run when the 'filters' object changes.
    // The previous logic with 'catalog.length' could cause infinite loops.
    useEffect(() => {
        fetchProducts(filters);
    }, [filters, fetchProducts]); // Only depend on 'filters' and 'fetchProducts'

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50 min-h-screen">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-8 border-b pb-4">
                Shop Our Collection
            </h1>

            {/* Mobile Filter Toggle & Result Count */}
            <div className="lg:hidden flex justify-between items-center mb-6">
                <button
                    onClick={() => setMobileFiltersOpen(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 font-medium hover:bg-gray-50 transition"
                >
                    <Filter size={18} />
                    <span>Filter & Sort</span>
                </button>
                {/* Use the store's 'totalProducts' for a more accurate count */}
                <p className="text-sm text-gray-600">{totalProducts} Results</p>
            </div>

            {/* Main Content Grid: Sidebar (1/4) vs Products (3/4) */}
            <div className="flex flex-col lg:flex-row lg:space-x-8">

                {/* --- Left Column: Filter Sidebar (Desktop) --- */}
                <div className="hidden lg:block lg:w-1/4 flex-shrink-0">
                    <ProductFilters
                        filters={filters}
                        setFilters={setFilters}
                    />
                </div>

                {/* --- Right Column: Products Grid --- */}
                <div className="w-full lg:w-3/4">
                    <ProductGrid
                        catalog={catalog}
                        filters={filters}
                        isLoading={isLoading}
                        setFilters={setFilters}
                    />
                </div>
            </div>

            {/* --- Mobile Filter Modal (Fixed Overlay) --- */}
            {mobileFiltersOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-40">
                    <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-xl p-6">
                        <div className="flex justify-between items-center mb-6 border-b pb-3">
                            <h2 className="text-xl font-bold text-gray-900">Filter & Sort</h2>
                            <button onClick={() => setMobileFiltersOpen(false)} className="text-gray-500 hover:text-gray-900 transition">
                                <X size={24} />
                            </button>
                        </div>
                        <ProductFilters
                            filters={filters}
                            setFilters={setFilters}
                        />
                        <button
                            className="w-full mt-6 py-3 bg-blue-600 text-white font-semibold rounded-lg"
                            onClick={() => setMobileFiltersOpen(false)}
                        >
                            Show Results
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};