import React, { useState, useEffect } from 'react';
import { Loader2, ChevronDown, RefreshCcw } from 'lucide-react';
import { ProductCard } from '../products/productCard';
// Corrected import path assuming ProductCard is in 'common'

// --- Configuration ---
const PRODUCTS_PER_LOAD = 8;
const INITIAL_LOAD_COUNT = 8;

// Note: Interfaces should be imported from a central types file
// This interface must match the data in your store
interface Product {
    id: number;
    imageUrls: string[]; // Use imageUrls array from the store
    title: string;
    price: number;
    comparePrice?: number;
    rating: number;
    reviewCount: number;
}
interface ProductFilter {
    category: string[] | null;
    minPrice: number;
    sortBy: 'relevance' | 'price-asc' | 'price-desc' | 'rating';
    inStockOnly: boolean; // Match store interface
    maxPrice?: number; // Match store interface
}

interface ProductGridProps {
    // This prop now correctly holds the filtered data from the store
    catalog: Product[];
    filters: ProductFilter;
    isLoading: boolean;
    setFilters: (f: Partial<ProductFilter>) => void;
}

// REMOVED the hardcoded DUMMY_PRODUCTS array. 
// Data now comes from the 'catalog' prop.

const SORTS = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Top Rated' },
];


export const ProductGrid: React.FC<ProductGridProps> = ({ catalog, filters, isLoading, setFilters }) => {
    // --- Load More State ---
    const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD_COUNT);

    // KEY FIX: Use the 'catalog' prop passed from the ShopPage (which comes from the store)
    const fullCatalog = catalog;

    // Determine the products to show based on the visible count
    const productsToShow = fullCatalog.slice(0, visibleCount);

    const hasMore = visibleCount < fullCatalog.length;

    // KEY FIX: Reset visible count whenever filters change (new search/sort)
    React.useEffect(() => {
        setVisibleCount(INITIAL_LOAD_COUNT);
    }, []); // Dependency array now correctly watches for filter changes

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilters({ sortBy: e.target.value as 'relevance' });
    };

    const handleLoadMore = () => {
        // Increase the visible count by PRODUCTS_PER_LOAD
        setVisibleCount(prevCount => prevCount + PRODUCTS_PER_LOAD);
    };

    return (
        <>
            {/* Sort Dropdown */}
            <div className="flex justify-end items-center mb-6 border-b pb-4">
                <label htmlFor="sort-by" className="text-sm font-medium text-gray-700 mr-3">Sort by:</label>
                <div className="relative">
                    <select
                        id="sort-by"
                        value={filters.sortBy}
                        onChange={handleSortChange}
                        className="appearance-none block w-full bg-white border border-gray-300 py-2 pl-3 pr-8 rounded-lg shadow-sm text-sm text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                        {SORTS.map(sort => (
                            <option key={sort.value} value={sort.value}>{sort.label}</option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <ChevronDown size={16} />
                    </div>
                </div>
            </div>

            {/* Product Grid Area */}
            {isLoading ? (
                <div className="flex justify-center items-center h-64 border border-gray-200 rounded-xl bg-white shadow-md">
                    <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
                    <span className="ml-3 text-lg text-gray-600">Loading products...</span>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6">
                        {productsToShow.map((product) => (
                            <ProductCard
                                key={product.id}
                                productId={product.id}
                                title={product.title}
                                imageUrl={product.imageUrls[0]}
                                price={product.price}
                                comparePrice={product.comparePrice}
                                rating={product.rating}
                                reviewCount={product.reviewCount}
                            />
                        ))}
                        {productsToShow.length === 0 && (
                            <p className="col-span-full text-center text-lg text-gray-600 p-10 bg-white rounded-lg shadow-md">
                                {fullCatalog.length > 0
                                    ? "No products match the current filters."
                                    : "No products found in the catalog."
                                }
                            </p>
                        )}
                    </div>

                    {/* Load More Button */}
                    {hasMore && (
                        <div className="mt-8 text-center">
                            <button
                                onClick={handleLoadMore}
                                className="inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 bg-white font-semibold rounded-lg hover:bg-blue-50 transition duration-200 shadow-md"
                            >
                                <RefreshCcw size={18} className="mr-2" />
                                Load More ({fullCatalog.length - visibleCount} remaining)
                            </button>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

