import { create } from 'zustand';
import { productService } from '../services/productService';

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
export interface Variant {
    _id: string;
    color: string;
    size: string;
    stock: number;
    price: number;
    comparePrice?: number;
    images: { public_id: string, url: string, _id: string }[];
}
export interface Category {
    _id: string;
    name: string;
}
export interface Product {
    id: string;
    title: string;
    description: string;
    price: number; // variant[0].price
    comparePrice?: number; // variant[0].comparePrice
    rating: number;
    reviewCount: number; // numReviews
    stock: number; // variant[0].stock
    availableColors: string[]; // Sab variants k unique colors
    availableSizes: string[]; // Sab variants k unique sizes
    imageUrls: string[]; // variant[0].images
    category?: string; // category.name
    shippingInformation: string;
    returnPolicy: string;
    reviews: Review[];
    variants: any[]; // Original variants data
}

// ProductFilter interface (ab 'category' ID accept karay ga)
export interface ProductFilter {
    category: string[] | null; // Yeh Category IDs hongay
    minPrice: number;
    maxPrice?: number;
    sortBy: 'relevance' | 'price_asc' | 'price_desc' | 'latest';
    inStockOnly: boolean;
    page: number; 
    search:string
}

interface ProductState {
    catalog: Product[];
    selectedProduct: Product | null;
    categories: Category[]; // Categories list k liye
    filters: ProductFilter;
    currentPage: number;
    totalPages: number;
    totalProducts: number;
    isLoading: boolean;
    error: string | null;
    fetchProducts: (filters: Partial<ProductFilter>) => Promise<void>;
    fetchSingleProduct: (id: number | string) => Promise<void>; // <-- UNCOMMENTED
    fetchCategories: () => Promise<void>; // <-- ADDED
    setFilters: (newFilters: Partial<ProductFilter>) => void;
}

export const transformApiProduct = (apiProduct: any): Product => {
    const firstVariant = apiProduct.variants && apiProduct.variants.length > 0
        ? apiProduct.variants[0]
        : { price: 0, stock: 0, images: [], size: 'N/A', comparePrice: 0 };

    const allSizes: string[] = apiProduct.variants
        ? Array.from(new Set(apiProduct.variants.map((v: any) => v.size).filter(Boolean))) : [];
    const allColors: string[] = apiProduct.variants
        ? Array.from(new Set(apiProduct.variants.map((v: any) => v.color).filter(Boolean))) : [];

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
        availableColors: allColors,
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
        search:'',
    },
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
    isLoading: false,
    error: null,

    // --- (UPDATED) fetchProducts ---
    fetchProducts: async () => {
        const { filters } = get()
        set({ isLoading: true, error: null });

        try {
            const response = await productService.getAllProducts(filters);
            const transformedCatalog = response.products.map(transformApiProduct);

            if (filters.page === 1) {
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

    // --- (NEW) fetchCategories ---
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