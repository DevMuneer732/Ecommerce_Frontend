import { create } from 'zustand';
import { wishlistService } from '../services/wishlistService';
import { Product, transformApiProduct } from './useProductStore';
import { toast } from "react-hot-toast";
export interface WishlistItem extends Product {
}

interface WishlistState {
    items: WishlistItem[];
    wishlistIds: string[];
    isLoading: boolean;
}

interface WishlistActions {
    fetchWishlist: () => Promise<void>;
    toggleWishlist: (productId: string) => Promise<void>; // <-- FIX: ID ab string hai
    isWishlisted: (productId: string) => boolean; // <-- FIX: ID ab string hai
    removeFromWishlist: (productId: string) => void; // <-- FIX: ID ab string hai
}

// --- Helper Function: API Data ko Frontend Item mein convert karein ---
const transformApiWishlist = (wishlist: any): { items: WishlistItem[], ids: string[] } => {
    if (!wishlist || !wishlist.products) return { items: [], ids: [] };
    const items: WishlistItem[] = wishlist.products.map((product: any) =>
        transformApiProduct(product)
    );

    const ids: string[] = items.map(item => item.id);

    return { items, ids };
};


export const useWishlistStore = create<WishlistState & WishlistActions>((set, get) => ({
    // State
    items: [],
    wishlistIds: [], // Shuru mein khaali
    isLoading: false,

    // --- Actions ---
    fetchWishlist: async () => {
        set({ isLoading: true });
        try {
            const response = await wishlistService.getWishlist();
            const { items, ids } = transformApiWishlist(response.wishlist);
            set({ items, wishlistIds: ids, isLoading: false });
        } catch (error) {
            console.error("Failed to fetch wishlist:", error);
            set({ isLoading: false });
        }
    },

    toggleWishlist: async (productId: string) => {
        // 2. Check karein ke item pehle se list mein tha ya nahin
        const currentIds = get().wishlistIds;
        const wasWishlisted = currentIds.includes(productId);

        // Optimistic Update (UI foran update karein)
        set(state => ({
            wishlistIds: wasWishlisted
                ? state.wishlistIds.filter(id => id !== productId)
                : [...state.wishlistIds, productId]
        }));

        try {
            // API call karein
            const response = await wishlistService.toggleWishlist(productId);
            // API se state ko sync karein
            const { items, ids } = transformApiWishlist(response.wishlist);
            set({ items, wishlistIds: ids });

            // --- 3. TOAST ADDED (Success) ---
            if (wasWishlisted) {
                toast.success('Removed from wishlist');
            } else {
                toast.success('Added to wishlist');
            }

        } catch (error) {
            console.error("Failed to toggle wishlist:", error);
            set({ wishlistIds: currentIds });
            toast.error('Wishlist update failed!');
        }
    },

    isWishlisted: (productId: string) => {
        return get().wishlistIds.includes(productId);
    },

    removeFromWishlist: (id: string) => {
        get().toggleWishlist(id);
    }
}));