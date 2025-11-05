import { api } from './api';
// Import the filter interface from your store
import { ProductFilter } from '../store/useProductStore';

// Helper function to build the query parameters
const buildApiParams = (filters: Partial<ProductFilter>) => {
    const params = new URLSearchParams();

    if (filters.category && filters.category.length > 0) {
        params.append('category', filters.category.join(','));
    }

    // 2. Handle Sort
    // (Translate frontend 'relevance' to backend 'latest')
    if (filters.sortBy) {
        const sortValue = filters.sortBy === 'relevance' ? 'latest' : filters.sortBy;
        params.append('sort', sortValue);
    }

    // 3. Handle In Stock
    if (filters.inStockOnly) {
        params.append('inStock', 'true');
    }

    // 4. Handle Pagination
    if (filters.page) {
        params.append('page', filters.page.toString());
    }
    return params;
};

const getAllProducts = async (filters: Partial<ProductFilter>) => {
    const params = buildApiParams(filters);

    const response = await api.get('/product', { params });

    return response.data; // Returns { products, currentPage, totalPages, ... }
    
};

const getSingleProduct = async (id: string | number) => {
    // API endpoint: /product/:id
    const response = await api.get(`/product/${id}`);
    return response.data; // Returns { product }
};

/**
 * Saari categories fetch karein
 */
const getAllCategories = async () => {
    // API endpoint: /category
    const response = await api.get('/categories');
    console.log("response,", response.data);
    
    return response.data; // Returns { categories: [...] }
};

export const productService = {
    getAllProducts,
    getSingleProduct,
    getAllCategories
}