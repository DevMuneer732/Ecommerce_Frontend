import React, { useState, useEffect } from 'react';
import { Filter, RotateCcw } from 'lucide-react'; // Added RotateCcw for Clear Filters icon

// --- Data Structures ---
const CATEGORIES = [
    'Footwear', 'Apparel', 'Accessories', 'Electronics'
];

// Interface matches the Product Store
interface ProductFilter {
    category: string[] | null;
    minPrice: number;
    sortBy: 'relevance' | 'price-asc' | 'price-desc';
    maxPrice?: number;
    inStockOnly: boolean;
}

interface FilterSidebarProps {
    filters: ProductFilter;
    setFilters: (f: Partial<ProductFilter>) => void;
}

export const ProductFilters: React.FC<FilterSidebarProps> = ({ filters, setFilters }) => {
    // Local state to manage which categories are checked
    const [selectedCategories, setSelectedCategories] = useState<string[]>(filters.category || []);

    // Effect to keep local state synced with global state
    useEffect(() => {
        setSelectedCategories(filters.category || []);
    }, []);

    // Handler for category checkbox changes
    const handleCategoryChange = (category: string, isChecked: boolean) => {
        let newCategories: string[] = [];

        if (category === 'All Products') {
            newCategories = []; // Clear categories
        } else if (isChecked) {
            newCategories = [...selectedCategories.filter(c => c !== 'All Products'), category];
        } else {
            newCategories = selectedCategories.filter(c => c !== category);
        }

        setSelectedCategories(newCategories);
        setFilters({ category: newCategories.length > 0 ? newCategories : null });
    };

    // Handler for Availability checkbox
    const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({ inStockOnly: e.target.checked });
    };

    // --- NEW: Handler for Clear Filters Button ---
    const handleClearFilters = () => {
        // Reset local state for categories
        setSelectedCategories([]);
        // Reset global filter state to defaults
        setFilters({
            category: null,
            inStockOnly: false,
            // Optionally reset price range, sort order etc. if needed
            // sortBy: 'relevance', 
            // maxPrice: 300 
        });
    };

    const isCategorySelected = (category: string) => selectedCategories.includes(category);
    const isAllProductsSelected = selectedCategories.length === 0;

    // Check if any filters are currently active (excluding default sort/price)
    const filtersActive = filters.category !== null || filters.inStockOnly;

    return (
        <div className="space-y-8 p-4 bg-white rounded-xl shadow-lg border border-gray-100 sticky top-24">

            <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                    <Filter size={24} /> <span>Filters</span>
                </h3>
                {/* --- NEW: Clear Filters Button --- */}
                {filtersActive && (
                    <button
                        onClick={handleClearFilters}
                        className="flex items-center space-x-1 text-xs font-semibold text-blue-600 hover:text-blue-800 transition"
                        aria-label="Clear all filters"
                    >
                        <RotateCcw size={14} />
                        <span>Clear All</span>
                    </button>
                )}
            </div>


            {/* Category Filter */}
            <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Category</h4>
                <ul className="space-y-3">
                    {/* All Products */}
                    <li>
                        <label className="flex items-center space-x-3 text-sm font-medium cursor-pointer">
                            <input
                                type="checkbox"
                                checked={isAllProductsSelected}
                                onChange={() => handleCategoryChange('All Products', !isAllProductsSelected)}
                                className={`h-4 w-4 rounded border-gray-300 ${isAllProductsSelected ? 'text-blue-600 focus:ring-blue-500' : 'text-gray-400'}`}
                            />
                            <span className={isAllProductsSelected ? 'text-blue-600 font-bold' : 'text-gray-700 hover:text-blue-500'}>
                                All Products
                            </span>
                        </label>
                    </li>
                    {/* Dynamic Categories */}
                    {CATEGORIES.map(category => {
                        const isChecked = isCategorySelected(category);
                        return (
                            <li key={category}>
                                <label className="flex items-center space-x-3 text-sm font-medium cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={(e) => handleCategoryChange(category, e.target.checked)}
                                        className={`h-4 w-4 rounded border-gray-300 ${isChecked ? 'text-blue-600 focus:ring-blue-500' : 'text-gray-400'}`}
                                    />
                                    <span className={isChecked ? 'text-blue-600 font-bold' : 'text-gray-700 hover:text-blue-500'}>
                                        {category}
                                    </span>
                                </label>
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* Availability Filter (Now fully functional) */}
            <div className="border-t pt-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Availability</h4>
                <div className="flex items-center space-x-3">
                    <input
                        type="checkbox"
                        id="in-stock"
                        className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
                        // Bind checked state directly to the global filters prop
                        checked={filters.inStockOnly}
                        // Use the correct handler
                        onChange={handleStockChange}
                    />
                    <label htmlFor="in-stock" className="text-sm text-gray-700 font-medium cursor-pointer">In Stock Only</label>
                </div>
            </div>

        </div>
    );
};