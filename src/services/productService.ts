import { api } from './api';
import { ProductFilter } from '../store/useProductStore';

const buildApiParams = (filters: Partial<ProductFilter>) => {
    const params = new URLSearchParams();
    if (filters.category && filters.category.length > 0) {
        params.append('category', filters.category.join(','));
    }
    if (filters.sortBy) {
        const sortValue = filters.sortBy === 'relevance' ? 'latest' : filters.sortBy;
        params.append('sort', sortValue);
    }
    if (filters.inStockOnly) {
        params.append('inStock', 'true');
    }
    if (filters.page) {
        params.append('page', filters.page.toString());
    }
    if (filters.search) {
        params.append('search', filters.search);
    }

    return params;
};

const getAllProducts = async (filters: Partial<ProductFilter>) => {
    const params = buildApiParams(filters);
    const response = await api.get('/product', { params });
    return response.data;
};

const getSingleProduct = async (id: string | number) => {
    const response = await api.get(`/product/${id}`);
    return response.data;
};

const getAllCategories = async () => {
    const response = await api.get('/categories');
    return response.data;
};

export const productService = {
    getAllProducts,
    getSingleProduct,
    getAllCategories
};