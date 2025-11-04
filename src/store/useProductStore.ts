import { create } from 'zustand';

// --- Shared Product and Filter Interfaces ---

interface Review {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
}

// Ensure Product interface includes all needed fields for ProductCard
interface Product {
    id: number;
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
}

interface ProductFilter {
    category: string[] | null;
    minPrice: number;
    maxPrice?: number;
    sortBy: 'relevance' | 'price-asc' | 'price-desc' ;
    inStockOnly: boolean;
}

interface ProductState {
    catalog: Product[];
    selectedProduct: Product | null;
    filters: ProductFilter;
    isLoading: boolean;
    error: string | null;

    // Actions
    fetchProducts: (filters: Partial<ProductFilter>) => Promise<void>;
    fetchSingleProduct: (id: number) => Promise<void>;
    setFilters: (newFilters: Partial<ProductFilter>) => void;
}

// --- Mock Data Source (Added Category) ---
const DUMMY_PRODUCT_CATALOG: Product[] = [
    {
        id: 101,
        title: 'Running Shoe Pro',
        price: 99.99,
        imageUrls: ["https://placehold.co/600x600/purple/white?text=Shoe+1", "https://placehold.co/600x600/blue/white?text=Shoe+2", "https://placehold.co/600x600/yellow/black?text=Shoe+3", "https://placehold.co/600x600/orange/white?text=Shoe+2"],
        rating: 4.5,
        reviewCount: 154,
        stock: 8,
        category: 'Footwear',
        availableColors: ['Black', 'White'], // Added available colors
        availableSizes: ["M", "XL"],
        description: "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
        shippingInformation: "Ships in 15 Days",
        returnPolicy: "30 Days Return Policy",
        reviews: [
            {
                "rating": 2,
                "comment": "Very unhappy with my purchase!",
                "date": "2024-05-23T08:56:21.618Z",
                "reviewerName": "John Doe",
            },
            {
                "rating": 5,
                "comment": "Very satisfied!",
                "date": "2024-05-23T08:56:21.618Z",
                "reviewerName": "Scarlett Wright",
            }
        ],
    },
    {
        id: 102,
        title: 'Hush Puppies',
        price: 49.99,
        imageUrls: ["https://placehold.co/600x600/0A84FF/FFFFFF?text=Shoe+2"],
        rating: 4.2,
        reviewCount: 310,
        stock: 20,
        category: 'Footwear',
        availableColors: ['Red', 'Blue'], // Added available colors
        availableSizes: ["S", "L"],
        description: "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
        shippingInformation: "Ships in 10 Days",
        returnPolicy: "No Returns",
        reviews: [],
    },
    {
        id: 103,
        title: "Minimalist Smart Watch",
        price: 199.00,
        comparePrice: 219.00,
        rating: 5.0,
        reviewCount: 450,
        stock: 10,
        category: 'Accessories',
        imageUrls: ["https://placehold.co/600x600/purple/white?text=Shoe+1", "https://placehold.co/600x600/blue/white?text=Shoe+2"],
        availableColors: ['Silver', 'Black'],
        availableSizes: ["M", "XL"],
        description: "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
        shippingInformation: "Ships in 5 Days",
        returnPolicy: "30 Days Return Policy",
        reviews: [],
    },
    {
        id: 104,
        title: "Noise-Cancelling Headphones",
        price: 79.99,
        rating: 4.2,
        reviewCount: 210,
        stock: 22,
        category: 'Electronics',
        imageUrls: ["https://placehold.co/600x600/333333/FFFFFF?text=Headphones"],
        availableColors: ['Black'],
        availableSizes: ["One Size"],
        description: "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
        shippingInformation: "Ships in 3 Days",
        returnPolicy: "30 Days Return Policy",
        reviews: [],
    },
    {
        id: 105,
        title: "Premium Heritage Leather Backpack",
        price: 189.99,
        comparePrice: 249.99,
        rating: 4.7,
        reviewCount: 345,
        stock: 12,
        category: 'Accessories',
        imageUrls: ["https://placehold.co/600x600/1e293b/FFFFFF?text=Backpack"],
        availableColors: ['Brown'],
        availableSizes: ["One Size"],
        description: "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
        shippingInformation: "Ships in 7 Days",
        returnPolicy: "14 Days Return Policy",
        reviews: [],
    },
    {
        id: 106,
        title: "Tommy Watch",
        price: 34.99,
        rating: 4.2,
        reviewCount: 310,
        stock: 50,
        category: 'Apparel',
        imageUrls: ["https://placehold.co/600x600/64D2FF/FFFFFF?text=T-Shirt"],
        availableColors: ['Blue', 'White'],
        availableSizes: ["S", "M", "L", "XL"],
        description: "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
        shippingInformation: "Ships in 2 Days",
        returnPolicy: "30 Days Return Policy",
        reviews: [],
    },
];
// --- End Mock Data Source ---


export const useProductStore = create<ProductState>((set, get) => ({
    catalog: [],
    selectedProduct: null,
    filters: {
        category: null,
        minPrice: 0,
        maxPrice: 300,
        sortBy: 'relevance',
        inStockOnly: false,
    },
    isLoading: false,
    error: null,

    fetchProducts: async (newFilters = {}) => {
        set({ isLoading: true, error: null });

        const mergedFilters = { ...get().filters, ...newFilters };
        set({ filters: mergedFilters });

        await new Promise(resolve => setTimeout(resolve, 500));

        try {
            let filteredCatalog = DUMMY_PRODUCT_CATALOG;

            // 1. Filter by Category
            if (mergedFilters.category && mergedFilters.category.length > 0) {
                filteredCatalog = filteredCatalog.filter(p =>
                    p.category && mergedFilters.category!.includes(p.category)
                );
            }

            // 2. Filter by Price Range
            if (mergedFilters.maxPrice !== undefined) {
                filteredCatalog = filteredCatalog.filter(p => p.price <= mergedFilters.maxPrice!);
            }

            // 3. Filter by Availability
            if (mergedFilters.inStockOnly) {
                filteredCatalog = filteredCatalog.filter(p => p.stock > 0);
            }

            // 4. Sort Results
            if (mergedFilters.sortBy === 'price-asc') {
                filteredCatalog.sort((a, b) => a.price - b.price);
            } else if (mergedFilters.sortBy === 'price-desc') {
                filteredCatalog.sort((a, b) => b.price - a.price);
            } 
            
            set({
                catalog: filteredCatalog,
                isLoading: false,
            });
        } catch (err) {
            set({ error: "Failed to fetch products.", isLoading: false });
        }
    },

    fetchSingleProduct: async (id: number) => {
        set({ isLoading: true, error: null, selectedProduct: null });
        await new Promise(resolve => setTimeout(resolve, 600));
        try {
            const product = DUMMY_PRODUCT_CATALOG.find(p => p.id === id);
            if (product) {
                set({ selectedProduct: product, isLoading: false });
            } else {
                set({ error: `Product with ID ${id} not found.`, isLoading: false, selectedProduct: null });
            }
        } catch (err) {
            set({ error: "Failed to fetch product details.", isLoading: false, selectedProduct: null });
        }
    },

    setFilters: (newFilters) => {
        set((state) => ({
            filters: { ...state.filters, ...newFilters },
        }));
    },
}));