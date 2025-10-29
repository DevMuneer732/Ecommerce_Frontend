import { create } from 'zustand';

// Define the shape of the Wishlist state
interface WishlistState {
    /** Array of product IDs currently in the wishlist */
    wishlistIds: number[];
    isWishlisted: (id: number) => boolean;
    toggleWishlist: (id: number) => void;
    removeFromWishlist: (id: number) => void;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
    // Initial state: Using dummy IDs for demonstration
    wishlistIds: [],

    // Derived state function: Checks for existence
    isWishlisted: (id) => get().wishlistIds.includes(id),

    // Action: Adds or removes a product ID
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
}));
