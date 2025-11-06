import { create } from 'zustand';
import { wishlistService } from '../services/wishlistService';
import { Product, transformApiProduct } from './useProductStore';

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
        // Optimistic Update: UI ko foran update karein
        const currentIds = get().wishlistIds;
        const isWishlisted = currentIds.includes(productId);

        // Fauran state update karein (sirf IDs wala array)
        set(state => ({
            wishlistIds: isWishlisted
                ? state.wishlistIds.filter(id => id !== productId)
                : [...state.wishlistIds, productId]
        }));

        try {
            // API ko background mein call karein
            const response = await wishlistService.toggleWishlist(productId);
            // API k response se state ko dobara sync karein (Confirm)
            const { items, ids } = transformApiWishlist(response.wishlist);
            set({ items, wishlistIds: ids });
        } catch (error) {
            console.error("Failed to toggle wishlist:", error);
            // Agar API fail ho, toh state ko wapas purani state par revert karein
            set({ wishlistIds: currentIds });
        }
    },

    isWishlisted: (productId: string) => {
        return get().wishlistIds.includes(productId);
    },

    removeFromWishlist: (id: string) => {
        get().toggleWishlist(id); // Sirf toggle ko call karein
    }
}));