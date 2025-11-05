import { create } from 'zustand';
import { productService } from '../services/productService';

// --- Shared Product and Filter Interfaces ---
interface Review {
    _id: string;
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    user: {
        _id: string;
        name: string;
    };
}
export interface Category {
    _id: string;
    name: string;
}
export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    comparePrice?: number;
    rating: number;
    reviewCount: number;
    stock: number;
    availableColors: string[];
    availableSizes: string[];
    imageUrls: string[];
    category?: string;
    shippingInformation: string;
    returnPolicy: string;
    reviews: Review[];
    variants: any[];
}

export interface ProductFilter {
    category: string[] | null;
    minPrice: number;
    maxPrice?: number;
    sortBy: 'relevance' | 'price_asc' | 'price_desc' | 'latest';
    inStockOnly: boolean;
    page: number;
}

interface ProductState {
    catalog: Product[];
    selectedProduct: Product | null;
    categories: Category[];
    filters: ProductFilter;
    currentPage: number;
    totalPages: number;
    totalProducts: number;
    isLoading: boolean;
    error: string | null;
    fetchProducts: (filters: Partial<ProductFilter>) => Promise<void>;
    fetchSingleProduct: (id: number | string) => Promise<void>;
    fetchCategories: () => Promise<void>;
    setFilters: (newFilters: Partial<ProductFilter>) => void;
}

// --- (SAB SE IMPORTANT) Data Transformation Function ---
const transformApiProduct = (apiProduct: any): Product => {
    const firstVariant = apiProduct.variants && apiProduct.variants.length > 0
        ? apiProduct.variants[0]
        : { price: 0, stock: 0, images: [], size: 'N/A', comparePrice: 0 };

    // Sab variants k unique sizes aur colors jama karein
    const allSizes: string[] = apiProduct.variants
        ? Array.from(
            new Set(
                apiProduct.variants
                    .map((v: any) => v.size)
                    .filter((s: any): s is string => typeof s === 'string' && s !== '')
            )
        )
        : [];
    const allColors: string[] = apiProduct.variants
        ? Array.from(
            new Set(
                apiProduct.variants
                    .map((v: any) => v.color)
                    .filter((c: any): c is string => typeof c === 'string' && c !== '')
            )
        )
        : [];

    return {
        id: apiProduct._id,
        title: apiProduct.title,
        description: apiProduct.description,
        price: firstVariant.price,
        comparePrice: firstVariant.comparePrice || undefined,
        rating: apiProduct.rating || 0,
        reviewCount: apiProduct.numReviews || 0,
        stock: firstVariant.stock,
        imageUrls: firstVariant.images.map((img: any) => img.url),
        availableSizes: allSizes,
        availableColors: allColors, // <-- YEH ZAROORI HAI
        category: apiProduct.category?.name || 'Uncategorized',
        shippingInformation: apiProduct.shippingInformation,
        returnPolicy: apiProduct.returnPolicy,
        reviews: (apiProduct.reviews || []).map((r: any) => ({
            ...r,
            reviewerName: r.user?.name || 'Anonymous'
        })),
        variants: apiProduct.variants,
    };
};
// --- End Transformation ---


export const useProductStore = create<ProductState>((set, get) => ({
    catalog: [],
    selectedProduct: null,
    categories: [],
    filters: {
        category: null,
        minPrice: 0,
        maxPrice: 300,
        sortBy: 'relevance',
        inStockOnly: false,
        page: 1,
    },
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
    isLoading: false,
    error: null,

    // --- fetchProducts (No changes needed) ---
    fetchProducts: async (filtersToFetch) => {
        set({ isLoading: true, error: null });
        const mergedFilters = { ...get().filters, ...filtersToFetch };
        set({ filters: mergedFilters }); // Update filters first

        try {
            const response = await productService.getAllProducts(mergedFilters);
            const transformedCatalog = response.products.map(transformApiProduct);

            if (mergedFilters.page === 1) {
                set({
                    catalog: transformedCatalog,
                    currentPage: response.currentPage,
                    totalPages: response.totalPages,
                    totalProducts: response.totalProducts,
                    isLoading: false,
                });
            } else {
                set((state) => ({
                    catalog: [...state.catalog, ...transformedCatalog],
                    currentPage: response.currentPage,
                    totalPages: response.totalPages,
                    totalProducts: response.totalProducts,
                    isLoading: false,
                }));
            }
        } catch (err: any) {
            console.error('Failed to fetch products:', err);
            set({ error: err.message || "Failed to fetch products.", isLoading: false });
        }
    },

    // --- (FIXED) fetchSingleProduct ---
    fetchSingleProduct: async (id: number | string) => {
        set({ isLoading: true, error: null, selectedProduct: null });
        try {
            const response = await productService.getSingleProduct(id);
            if (response.product) {
                // --- FIX: Use the transform function ---
                const transformedProduct = transformApiProduct(response.product);
                set({ selectedProduct: transformedProduct, isLoading: false });
                // --- END FIX ---
            } else {
                set({ error: `Product with ID ${id} not found.`, isLoading: false, selectedProduct: null });
            }
        } catch (err: any) {
            console.error('Failed to fetch single product:', err);
            set({ error: err.message || "Failed to fetch product details.", isLoading: false, selectedProduct: null });
        }
    },

    // --- fetchCategories (No changes needed) ---
    fetchCategories: async () => {
        try {
            if (get().categories.length > 0) return;
            const response = await productService.getAllCategories();
            if (response.categories) {
                set({ categories: response.categories });
            }
        } catch (err: any) {
            console.error('Failed to fetch categories:', err);
        }
    },

    setFilters: (newFilters) => {
        set((state) => ({
            filters: { ...state.filters, ...newFilters },
        }));
    },
}));