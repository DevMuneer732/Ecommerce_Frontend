import React, { useEffect } from 'react';
import { Filter, RotateCcw } from 'lucide-react';
// Store se types aur categories fetch karnay k liye
import { useProductStore, ProductFilter, Category } from '../../store/useProductStore';

// --- REMOVED: const CATEGORIES = [...] ---

interface FilterSidebarProps {
    filters: ProductFilter;
    setFilters: (f: Partial<ProductFilter>) => void;
}

export const ProductFilters: React.FC<FilterSidebarProps> = ({ filters, setFilters }) => {

    // --- Store se dynamic categories fetch karein ---
    const { categories, fetchCategories } = useProductStore((state) => ({
        categories: state.categories,
        fetchCategories: state.fetchCategories,
    }));

    // Component load hotay hi categories fetch karein
    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    // Handler for category checkbox changes
    const handleCategoryChange = (categoryId: string, isChecked: boolean) => {
        const currentCategories = filters.category || [];
        let newCategories: string[] = [];

        if (categoryId === 'All Products') {
            newCategories = []; // "All Products" select karnay par filter clear karein
        } else if (isChecked) {
            newCategories = [...currentCategories, categoryId];
        } else {
            newCategories = currentCategories.filter(c => c !== categoryId);
        }

        // Store ko naye filters k sath update karein aur page 1 par reset karein
        setFilters({ category: newCategories.length > 0 ? newCategories : null, page: 1 });
    };

    // Handler for Availability checkbox
    const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({ inStockOnly: e.target.checked, page: 1 }); // Page 1 par reset karein
    };

    // Handler for Clear Filters Button
    const handleClearFilters = () => {
        setFilters({
            category: null,
            inStockOnly: false,
            page: 1,
            sortBy: 'relevance',
        });
    };

    // Helper functions ab 'filters' prop par depend karti hain
    const isCategorySelected = (categoryId: string) => filters.category?.includes(categoryId) ?? false;
    const isAllProductsSelected = !filters.category || filters.category.length === 0;

    const filtersActive = (filters.category && filters.category.length > 0) || filters.inStockOnly;

    return (
        <div className="space-y-8 p-4 bg-white rounded-xl shadow-lg border border-gray-100 sticky top-24">

            <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                    <Filter size={24} /> <span>Filters</span>
                </h3>
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
                    {/* Dynamic Categories from API */}
                    {categories.map(category => {
                        const isChecked = isCategorySelected(category._id);
                        return (
                            <li key={category._id}>
                                <label className="flex items-center space-x-3 text-sm font-medium cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={(e) => handleCategoryChange(category._id, e.target.checked)}
                                        className={`h-4 w-4 rounded border-gray-300 ${isChecked ? 'text-blue-600 focus:ring-blue-500' : 'text-gray-400'}`}
                                    />
                                    <span className={isChecked ? 'text-blue-600 font-bold' : 'text-gray-700 hover:text-blue-500'}>
                                        {category.name}
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
                        checked={filters.inStockOnly}
                        onChange={handleStockChange}
                    />
                    <label htmlFor="in-stock" className="text-sm text-gray-700 font-medium cursor-pointer">In Stock Only</label>
                </div>
            </div>

        </div>
    );
};