import { create } from 'zustand';

// --- Types ---
export interface CartItem {
    id: number; // Product ID
    variantId: string;
    title: string;
    price: number;
    selectedSize: string;
    imageUrl: string;
    quantity: number;
    stock: number;
}

// Defines the shape of the entire cart and totals state
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

// Defines the actions available in the store
interface CartActions {
    addItem: (item: Omit<CartItem, 'variantId'>) => void;
    updateQuantity: (variantId: string, quantity: number) => void;
    removeItem: (variantId: string) => void;
    applyCoupon: (code: string) => Promise<void>;
    clearCart: () => void;
    calculateTotals: () => void;
}


// --- Combined State and Actions ---
interface CartActions {
    addItem: (item: Omit<CartItem, 'variantId'>) => void;
    updateQuantity: (variantId: string, quantity: number) => void;
    removeItem: (variantId: string) => void;
    applyCoupon: (code: string) => Promise<void>;
    clearCart: () => void;
    calculateTotals: () => void;
    setBuyNowItem: (item: Omit<CartItem, 'variantId'> | null) => void;
}

export const useCartStore = create<CartState & CartActions>((set, get) => ({
    // State
    items: [],
    buyNowItem: null,
    couponCode: null,
    discountAmount: 0,
    isCouponValid: false,
    taxRate: 0.08,

    // State values for totals
    subtotal: 0,
    shipping: 0,
    orderTotal: 0,

    // Calculate totals whenever items or buyNowItem changes
    calculateTotals: () => {
        set(state => {
            // Use buyNowItem if present, otherwise use cart items
            const activeItems = state.buyNowItem ? [state.buyNowItem] : state.items;
            
            // Calculate subtotal from the active items
            const subtotal = activeItems.reduce((total, item) => 
                total + (item.price * item.quantity), 0
            );
            
            // Apply standard shipping rules
            const shipping = subtotal >= 100 ? 0.00 : 5.00;
            
            // Calculate tax and final total
            const tax = subtotal * state.taxRate;
            const totalBeforeDiscount = subtotal + tax + shipping;
            const orderTotal = Math.max(0, totalBeforeDiscount - state.discountAmount);
            
            return {
                subtotal,
                shipping,
                orderTotal
            };
        });
    },

    // Actions
    addItem: (item) => {
        const variantId = `${item.id}-${item.selectedSize}`;
        set((state) => {
            const existingItem = state.items.find(i => i.variantId === variantId);
            if (existingItem) {
                const newQuantity = existingItem.quantity + item.quantity;
                if (newQuantity > existingItem.stock) {
                    console.error("Stock check failed.");
                    return state;
                }
                const newState = {
                    items: state.items.map(i =>
                        i.variantId === variantId
                            ? { ...i, quantity: newQuantity }
                            : i
                    ),
                };
                return newState;
            } else {
                if (item.quantity > item.stock) {
                    console.error("Stock check failed.");
                    return state;
                }
                const newItem: CartItem = { ...item, variantId };
                const newState = { items: [...state.items, newItem] };
                return newState;
            }
        });
        get().calculateTotals();
    },

    updateQuantity: (variantId, quantity) => {
        set((state) => {
            const item = state.items.find(i => i.variantId === variantId);
            if (!item) return state;
            const newQuantity = Math.max(1, quantity);
            if (newQuantity > item.stock) {
                console.error("Stock check failed.");
                return state;
            }
            return {
                items: state.items.map(i =>
                    i.variantId === variantId
                        ? { ...i, quantity: newQuantity }
                        : i
                ),
            };
        });
        get().calculateTotals();
    },

    removeItem: (variantId) => {
        set((state) => ({
            items: state.items.filter(i => i.variantId !== variantId),
        }));
        get().calculateTotals();
    },

    applyCoupon: async (code) => {
        console.log(`Simulating API check for coupon: ${code}`);
        await new Promise(resolve => setTimeout(resolve, 1000));

        const subtotal = get().subtotal;
        let discount = 0;
        let isValid = false;

        if (code.toUpperCase() === 'SAVE15') { // 15% off
            discount = subtotal * 0.15;
            isValid = true;
        } else if (code.toUpperCase() === 'FLAT20') { // $20 off
            discount = 20;
            isValid = true;
        }

        if (isValid) {
            set({ couponCode: code.toUpperCase(), discountAmount: discount, isCouponValid: true });
        } else {
            set({ couponCode: code.toUpperCase(), discountAmount: 0, isCouponValid: false });
            console.error(`Coupon ${code} is invalid or expired.`);
        }
    },

    clearCart: () => {
        set({
            items: [],
            buyNowItem: null,
            couponCode: null,
            discountAmount: 0,
            isCouponValid: false
        });
        get().calculateTotals();
    },

    setBuyNowItem: (item) => {
        console.log('Setting buy now item in store:', item);
        
        if (item) {
            // Generate variantId for the buy now item
            const variantId = `${item.id}-${item.selectedSize}`;
            const buyNowItem = { ...item, variantId };
            
            // Immediately calculate the initial totals based on the buy now item
            const quantity = buyNowItem.quantity || 1;
            const subtotal = buyNowItem.price * quantity;
            const shipping = subtotal >= 100 ? 0.00 : 5.00;
            const tax = subtotal * get().taxRate;
            const orderTotal = Math.max(0, subtotal + tax + shipping);
            
            // Update store with buy now item and calculated totals
            set({
                buyNowItem,
                items: [], // Clear regular cart items when using buy now
                subtotal,
                shipping,
                orderTotal,
                discountAmount: 0,
                couponCode: null,
                isCouponValid: false
            });
            
            console.log('Buy now item set with totals:', {
                buyNowItem,
                subtotal,
                shipping,
                orderTotal
            });
        } else {
            set(state => ({
                ...state,
                buyNowItem: null
            }));
            get().calculateTotals();
        }
    },
}));

