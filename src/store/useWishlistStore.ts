import { create } from 'zustand';
// Import the 'persist' middleware and 'createJSONStorage' helper
import { persist, createJSONStorage } from 'zustand/middleware';

// Define the shape of the Wishlist state
interface WishlistState {
    /** Array of product IDs currently in the wishlist */
    wishlistIds: number[];
    isWishlisted: (id: number) => boolean;
    toggleWishlist: (id: number) => void;
    removeFromWishlist: (id: number) => void;
}

// Use the persist middleware by wrapping the create function's callback
export const useWishlistStore = create(
    persist<WishlistState>(
        // (set, get) is the standard Zustand store definition
        (set, get) => ({
            wishlistIds: [], // This is the initial state (will be overwritten by localStorage if it exists)

            isWishlisted: (id) => get().wishlistIds.includes(id),

            toggleWishlist: (id) => {
                set((state) => {
                    const currentIds = state.wishlistIds;
                    if (currentIds.includes(id)) {
                        // Remove if already present
                        console.log(`Removed product ${id} from wishlist.`);
                        return { wishlistIds: currentIds.filter(itemId => itemId !== id) };
                    } else {
                        // Add if not present
                        console.log(`Added product ${id} to wishlist.`);
                        return { wishlistIds: [...currentIds, id] };
                    }
                });
            },

            // Action: Explicitly remove (useful for the Wishlist Page itself)
            removeFromWishlist: (id) => {
                set((state) => ({
                    wishlistIds: state.wishlistIds.filter(itemId => itemId !== id)
                }));
            }
        }),
        // This is the configuration object for the 'persist' middleware
        {
            // 1. 'name': The key for your data in localStorage.
            name: 'ecommerce-wishlist-storage',

            // 2. 'storage': Specify localStorage (instead of the default localStorage).
            storage: createJSONStorage(() => localStorage),

            // 3. 'partialize': (Important) This function selects *which* parts of your state to save.
            // We ONLY want to save the 'wishlistIds' array, not the functions.
            partialize: (state) => ({
                wishlistIds: state.wishlistIds
            }),
        }
    )
);

