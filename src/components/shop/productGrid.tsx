import React from 'react'; // Removed useState
import { Loader2, ChevronDown, RefreshCcw } from 'lucide-react';
// Import interfaces from the store
import { Product, ProductFilter } from '../../store/useProductStore';
import { useProductStore } from '../../store/useProductStore';
import { ProductCard } from '../products/productCard';
// ProductCard ko 'common' folder se import karein

interface ProductGridProps {
    catalog: Product[];
    filters: ProductFilter;
    isLoading: boolean;
    setFilters: (f: Partial<ProductFilter>) => void;
}

const SORTS = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
];

export const ProductGrid: React.FC<ProductGridProps> = ({ catalog, filters, isLoading, setFilters }) => {

    const { currentPage, totalPages, totalProducts } = useProductStore((state) => ({
        currentPage: state.currentPage,
        totalPages: state.totalPages,
        totalProducts: state.totalProducts, // Get total products
    }));

    const productsToShow = catalog;
    const hasMore = currentPage < totalPages;

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilters({
            sortBy: e.target.value as 'relevance',
            page: 1 // <-- Page ko reset karein
        });
    };

    const handleLoadMore = () => {
        setFilters({ page: filters.page + 1 });
    };

    return (
        <>
            {/* Sort Dropdown & Count */}
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h3 className="text-base font-semibold text-gray-700 hidden sm:block">
                    Showing {productsToShow.length} of {totalProducts} results
                </h3>
                <div className='flex items-center'>
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
            </div>

            {/* Product Grid Area */}
            {isLoading && filters.page === 1 ? (
                <div className="flex justify-center items-center h-64 border border-gray-200 rounded-xl bg-white shadow-md">
                    <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
                    <span className="ml-3 text-lg text-gray-600">Loading products...</span>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                        {productsToShow.map((product) => (
                            <ProductCard
                                key={`shop-${product.id}`}
                                productId={product.id}
                                title={product.title}
                                imageUrl={product.imageUrls[0]}
                                price={product.price}
                                comparePrice={product.comparePrice}
                                rating={product.rating}
                                reviewCount={product.reviewCount}
                            />
                        ))}
                    </div>

                    {productsToShow.length === 0 && !isLoading && (
                        <p className="col-span-full text-center text-lg text-gray-600 p-10 bg-white rounded-lg shadow-md">
                            No products found matching your criteria.
                        </p>
                    )}

                    {/* Load More Button */}
                    <div className="mt-8 text-center">
                        {isLoading && filters.page > 1 ? (
                            <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
                        ) : hasMore ? (
                            <button
                                onClick={handleLoadMore}
                                className="inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 bg-white font-semibold rounded-lg hover:bg-blue-50 transition duration-200 shadow-md"
                            >
                                <RefreshCcw size={18} className="mr-2" />
                                Load More
                            </button>
                        ) : (
                            productsToShow.length > 0 && (
                                <p className="text-sm text-gray-500">You've reached the end.</p>
                            )
                        )}
                    </div>
                </>
            )}
        </>
    );
};