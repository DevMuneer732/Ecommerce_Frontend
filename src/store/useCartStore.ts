import { create } from 'zustand';
import { cartService } from '../services/cartService'; // <-- Naya service import karein
import { couponService } from '../services/couponService';
import { toast } from 'react-hot-toast';
export interface CartItem {
    _id: string; // Cart Item ki unique DB ID
    productId: string;
    variantId: string;
    title: string;
    price: number;
    selectedColor: string;
    selectedSize: string;
    imageUrl: string;
    quantity: number;
    stock: number;
}

interface CartState {
    items: CartItem[];
    couponCode: string | null;
    discountAmount: number;
    isCouponValid: boolean;
    subtotal: number;
    orderTotal: number;
    shipping: number;
    taxRate: number;
    isLoading: boolean; // Loading state
}

interface CartActions {
    fetchCart: () => Promise<void>; // Naya action
    addItem: (productId: string, variantId: string, quantity: number) => Promise<void>; // Updated
    updateQuantity: (itemId: string, newQuantity: number) => Promise<void>; // Updated
    removeItem: (itemId: string) => Promise<any>; // Updated
    applyCoupon: (code: string) => Promise<any>;
    clearCart: () => void;
    calculateTotals: () => void;
}

// --- Helper Function: API Data ko Frontend Item mein convert karein ---
const transformApiCart = (cart: any): CartItem[] => {
    if (!cart || !cart.items) return [];

    return cart.items.map((item: any) => {
        const variant = item.product.variants.find(
            (v: any) => v._id.toString() === item.variant.toString()
        );

        if (!variant) return null;

        return {
            _id: item._id, // Yeh Cart Item ki DB ID hai
            productId: item.product._id,
            variantId: item.variant,
            title: item.product.title,
            price: variant.price,
            selectedColor: variant.color || 'N/A',
            selectedSize: variant.size || 'N/A',
            imageUrl: variant.images[0]?.url || '',
            quantity: item.quantity,
            stock: variant.stock,
        };
    }).filter(Boolean); // null items ko filter karein
};


export const useCartStore = create<CartState & CartActions>((set, get) => ({
    // State
    items: [],
    couponCode: null,
    discountAmount: 0,
    isCouponValid: false,
    taxRate: 0.08,
    subtotal: 0,
    shipping: 0,
    orderTotal: 0,
    isLoading: false,

    fetchCart: async () => {
        set({ isLoading: true });
        try {
            const response = await cartService.getCart();
            const transformedItems = transformApiCart(response.cart);

            set({ items: transformedItems, isLoading: false });
            get().calculateTotals();
        } catch (error) {
            console.error("Failed to fetch cart:", error);
            set({ isLoading: false });
        }
    },

    addItem: async (productId: string, variantId: string, quantity: number) => {
        set({ isLoading: true });
        try {

            const response = await cartService.addItemToCart({ productId, variantId, quantity });
            const transformedItems = transformApiCart(response.cart);
            set({ items: transformedItems, isLoading: false });
            get().calculateTotals();
            toast.success("Item added to cart!")
        } catch (error) {
            set({ isLoading: false });
            toast.error("Failed to add item to cart.")
        }
    },

    updateQuantity: async (itemId: string, newQuantity: number) => {
        set({ isLoading: true })
        try {
            const response = await cartService.updateItemQuantity(itemId, newQuantity);
            const transformedItems = transformApiCart(response.cart);
            set({ items: transformedItems, isLoading: false });
            get().calculateTotals();
        } catch (error) {
            console.error('Failed to update qunatity', error);
            set({ isLoading: false })
        }

    },

    removeItem: async (itemId: string) => {
        set({ isLoading: true });
        try {

            const response = await cartService.removeItemFromCart(itemId);
            const transformedItems = transformApiCart(response.cart);
            set({ items: transformedItems, isLoading: false });
            get().calculateTotals();
            toast.success("Item removed from cart.")
        } catch (error) {
            console.error("Failed to remove item:", error);
            set({ isLoading: false });
            toast.error("Failed to remove item from cart.")
        }
    },

    calculateTotals: () => {
        set(state => {
            const subtotal = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
            const shipping = subtotal >= 100 ? 0.00 : 5.00;
            const tax = subtotal * state.taxRate;
            const totalBeforeDiscount = subtotal + tax + shipping;
            const orderTotal = Math.max(0, totalBeforeDiscount - state.discountAmount);
            return { subtotal, shipping, orderTotal };
        });
    },

    applyCoupon: async (code: string) => {
        try {
            const response = await couponService.applyCoupon(code);
            set({
                couponCode: response.discountInfo.code,
                discountAmount: Number(response.discountInfo.discountAmount),
                isCouponValid: true,
            });
            get().calculateTotals(); 
            toast.success("Coupon applied successfully!")
            return response; 
        } catch (error) {
            set({ couponCode: code.toUpperCase(), discountAmount: 0, isCouponValid: false });
            get().calculateTotals(); 
            toast.error("Invalid Coupon code.")
            throw error;
        }
    },

    clearCart: () => {
        set({
            items: [], couponCode: null, discountAmount: 0,
            isCouponValid: false, subtotal: 0, shipping: 0, orderTotal: 0,
        });
    },
}));