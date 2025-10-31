import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// ... (CartItem and CartState interfaces remain the same) ...
export interface CartItem {
    id: number; variantId: string; title: string; price: number;
    selectedSize: string; imageUrl: string; quantity: number; stock: number;
}
interface CartState {
    items: CartItem[];
    buyNowItem: CartItem | null;
    couponCode: string | null;
    discountAmount: number;
    isCouponValid: boolean;
    subtotal: number;
    orderTotal: number;
    shipping: number;
    taxRate: number;
}

interface CartActions {
    addItem: (item: Omit<CartItem, 'variantId'>) => void;
    updateQuantity: (variantId: string, quantity: number) => void;
    removeItem: (variantId: string) => void;
    // --- UPDATED ACTION SIGNATURE ---
    applyCoupon: (code: string, subtotal: number) => Promise<void>;
    clearCart: () => void;
    calculateTotals: () => void; // Keep this for rehydrating the main cart
    setBuyNowItem: (item: Omit<CartItem, 'variantId'> | null) => void;
}

export const useCartStore = create(
    persist<CartState & CartActions>(
        (set, get) => ({
            items: [],
            buyNowItem: null,
            couponCode: null,
            discountAmount: 0,
            isCouponValid: false,
            taxRate: 0.08,
            subtotal: 0,
            shipping: 0,
            orderTotal: 0,

            // This function is now ONLY for the main cart
            calculateTotals: () => {
                set(state => {
                    // Only calculates for 'items'
                    const activeItems = state.items;
                    const subtotal = activeItems.reduce((total, item) => total + (item.price * item.quantity), 0);
                    const shipping = subtotal >= 100 ? 0.00 : 5.00;
                    const tax = subtotal * state.taxRate;
                    const totalBeforeDiscount = subtotal + tax + shipping;
                    const orderTotal = Math.max(0, totalBeforeDiscount - state.discountAmount);

                    return { subtotal, shipping, orderTotal };
                });
            },

            addItem: (item) => {
                const variantId = `${item.id}-${item.selectedSize}`;
                set((state) => {
                    // When adding to cart, ALWAYS clear the buyNowItem
                    const existingItem = state.items.find(i => i.variantId === variantId);
                    if (existingItem) {
                        const newQuantity = existingItem.quantity + item.quantity;
                        if (newQuantity > existingItem.stock) {
                            console.error("Stock check failed.");
                            return { buyNowItem: null }; // Clear buyNowItem
                        }
                        return {
                            items: state.items.map(i =>
                                i.variantId === variantId ? { ...i, quantity: newQuantity } : i
                            ),
                            buyNowItem: null,
                        };
                    } else {
                        if (item.quantity > item.stock) {
                            console.error("Stock check failed.");
                            return { buyNowItem: null }; // Clear buyNowItem
                        }
                        const newItem: CartItem = { ...item, variantId };
                        return {
                            items: [...state.items, newItem],
                            buyNowItem: null,
                        };
                    }
                });
                get().calculateTotals(); // Recalculate main cart
            },

            updateQuantity: (variantId, quantity) => {
                set((state) => {
                    // This action only applies to the main 'items' cart
                    const item = state.items.find(i => i.variantId === variantId);
                    if (!item) return { buyNowItem: null }; // Ensure buyNowItem is cleared
                    const newQuantity = Math.max(1, quantity);
                    if (newQuantity > item.stock) {
                        console.error("Stock check failed.");
                        return { buyNowItem: null };
                    }
                    return {
                        items: state.items.map(i =>
                            i.variantId === variantId ? { ...i, quantity: newQuantity } : i
                        ),
                        buyNowItem: null,
                    };
                });
                get().calculateTotals(); // Recalculate main cart
            },

            removeItem: (variantId) => {
                set((state) => ({
                    items: state.items.filter(i => i.variantId !== variantId),
                    buyNowItem: null, // Clear buyNowItem
                }));
                get().calculateTotals(); // Recalculate main cart
            },

            // --- UPDATED 'applyCoupon' ACTION ---
            applyCoupon: async (code, subtotal) => {
                console.log(`Applying coupon to subtotal: ${subtotal}`);
                await new Promise(resolve => setTimeout(resolve, 1000));

                let discount = 0;
                let isValid = false;

                if (code.toUpperCase() === 'SAVE15') {
                    discount = subtotal * 0.15;
                    isValid = true;
                } else if (code.toUpperCase() === 'FLAT20') {
                    discount = 20;
                    isValid = true;
                }

                if (isValid) {
                    set({ couponCode: code.toUpperCase(), discountAmount: discount, isCouponValid: true });
                } else {
                    set({ couponCode: code.toUpperCase(), discountAmount: 0, isCouponValid: false });
                    console.error(`Coupon ${code} is invalid or expired.`);
                }

                // We DON'T call calculateTotals() here, because the CheckoutPage's
                // useEffect will recalculate when 'discountAmount' changes.
            },

            clearCart: () => {
                set({
                    items: [],
                    buyNowItem: null,
                    couponCode: null,
                    discountAmount: 0,
                    isCouponValid: false,
                    subtotal: 0,
                    shipping: 0,
                    orderTotal: 0,
                });
                // No need to call calculateTotals() as everything is zero.
            },

            // This action is now effectively replaced by the 'navigate({ state: ... })' logic
            // but we keep it in case you want to revert.
            setBuyNowItem: (item) => {
                console.warn("setBuyNowItem (Store) is DEPRECATED. Use navigate({ state: ... }) instead.");
                // This logic is still here as a fallback
                if (item) {
                    const variantId = `${item.id}-${item.selectedSize}`;
                    const buyNowItem = { ...item, variantId, quantity: item.quantity || 1 };
                    const subtotal = buyNowItem.price * buyNowItem.quantity;
                    const shipping = subtotal >= 100 ? 0.00 : 5.00;
                    const tax = subtotal * get().taxRate;
                    const orderTotal = Math.max(0, subtotal + tax + shipping);
                    set({
                        buyNowItem, items: [], subtotal, shipping, orderTotal,
                        discountAmount: 0, couponCode: null, isCouponValid: false
                    });
                } else {
                    set({ buyNowItem: null });
                    get().calculateTotals();
                }
            },
        }),
        {
            name: 'ecommerce-cart-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ items: state.items }),
            onRehydrateStorage: () => (state) => {
                if (state) {
                    state.calculateTotals();
                }
            }
        }
    )
);