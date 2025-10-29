import { create } from 'zustand';

// --- Types ---

// Defines a unique cart item instance (product + selected variants)
interface CartItem {
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
    couponCode: string | null;
    discountAmount: number;
    isCouponValid: boolean;
    subtotal: number;
    orderTotal: number;
    shipping: number;
    taxRate: number; // Assuming a fixed tax rate for calculation
}

// Defines the actions available in the store
interface CartActions {
    // UPDATED: addItem payload now includes selectedColor and imageUrl
    addItem: (item: Omit<CartItem, 'variantId'>) => void;
    updateQuantity: (variantId: string, quantity: number) => void;
    removeItem: (variantId: string,) => void;
    applyCoupon: (code: string) => Promise<void>;
    clearCart: () => void;
}

// --- Combined State and Actions ---

export const useCartStore = create<CartState & CartActions>((set, get) => ({
    // State
    items: [],
    couponCode: null,
    discountAmount: 0,
    isCouponValid: false,
    taxRate: 0.08, // 8% tax rate

    // Computed Values
    get subtotal() {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    get shipping() {
        return get().subtotal >= 100 ? 0.00 : 5.00; // Free shipping over $100
    },
    get orderTotal() {
        const sub = get().subtotal;
        const tax = sub * get().taxRate;
        const ship = get().shipping;
        const totalBeforeDiscount = sub + tax + ship;
        return Math.max(0, totalBeforeDiscount - get().discountAmount);
    },

    // Actions
    addItem: (item) => {
        // Generate a unique ID based on product ID AND variants (Goal 5 implementation)
        const variantId = `${item.id}-${item.selectedSize}`;

        set((state) => {
            const existingItem = state.items.find(i => i.variantId === variantId);

            if (existingItem) {
                // If duplicate product/attributes, increment quantity (Goal 5)
                const newQuantity = existingItem.quantity + item.quantity;
                if (newQuantity > existingItem.stock) {
                    console.error("Stock check failed: Cannot add more than available stock.");
                    return state;
                }

                return {
                    items: state.items.map(i =>
                        i.variantId === variantId
                            ? { ...i, quantity: newQuantity }
                            : i
                    ),
                };
            } else {
                // Check stock for new item
                if (item.quantity > item.stock) {
                    console.error("Stock check failed: Initial quantity exceeds stock.");
                    return state;
                }

                // Add new item
                const newItem: CartItem = { ...item, variantId };
                return { items: [...state.items, newItem] };
            }
        });
    },

    updateQuantity: (variantId, quantity) => {
        set((state) => {
            const item = state.items.find(i => i.variantId === variantId);
            if (!item) return state;

            const newQuantity = Math.max(1, quantity);
            if (newQuantity > item.stock) {
                console.error("Stock check failed: Quantity update exceeds stock. (Goal 8)");
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
    },

    removeItem: (variantId) => {
        set((state) => ({
            items: state.items.filter(i => i.variantId !== variantId),
        }));
    },

    applyCoupon: async (code) => {
        // ... (Coupon logic remains the same) ...
        console.log(`Simulating API check for coupon: ${code}`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        const subtotal = get().subtotal;
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
    },

    clearCart: () => set({ items: [], couponCode: null, discountAmount: 0, isCouponValid: false }),
}));