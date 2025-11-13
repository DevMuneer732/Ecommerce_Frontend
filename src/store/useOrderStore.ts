import { create } from "zustand";
import { orderService } from "../services/orderService";

interface OrderItem {
    _id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    color?: string;
    size?: string;
}

export interface Order {
    _id: string;
    orderItems: OrderItem[];
    totalPrice: number;
    orderStatus: string;
    createdAt: string;
}


interface ShippingInfo {
    fullname: string; phone: string; address: string; email: string;
}

export interface FullOrder {
    _id: string;
    orderItems: OrderItem[];
    shippingInfo: ShippingInfo;
    user: {
        _id: string;
        name: string;
        email: string;
    };
    totalPrice: number;
    subtotal: number;
    shippingPrice: number;
    discountAmount: number;
    couponUsed?: string;
    orderStatus: string;
    paymentMethod: string;
    paymentInfo: {
        status: string
    };
    createdAt: string;
}

interface OrderState {
    // List State
    orders: Order[];
    listLoading: boolean;
    listError: string | null;
    currentPage: number;
    totalPages: number;
    totalOrders: number;

    selectedOrder: FullOrder | null;
    detailLoading: boolean;
    detailError: string | null;

    // Actions
    fetchOrders: (page: number) => Promise<void>;
    nextPage: () => void;
    prevPage: () => void;
    fetchOrderById: (orderId: string) => Promise<void>;
    clearSelectedOrder: () => void;
}

export const useOrderStore = create<OrderState>((set, get) => ({
    // Initial List State
    orders: [],
    listLoading: false,
    listError: null,
    currentPage: 1,
    totalPages: 1,
    totalOrders: 0,

    // Initial Detail State
    selectedOrder: null,
    detailLoading: true, // Detail page hamesha loading se shuru hota hai
    detailError: null,

    // --- List Actions ---
    fetchOrders: async (page: number) => {
        set({ listLoading: true, listError: null });
        try {
            const data = await orderService.getMyOrders(page);
            set({
                orders: data.orders,
                currentPage: data.currentPage,
                totalPages: data.totalPages,
                totalOrders: data.totalOrders,
                listLoading: false,
            });
        } catch (err: any) {
            console.error("Failed to fetch orders:", err);
            set({ listLoading: false, listError: 'Failed to load orders.' });
        }
    },

    nextPage: () => {
        const { currentPage, totalPages, fetchOrders } = get();
        if (currentPage < totalPages) {
            fetchOrders(currentPage + 1);
        }
    },

    prevPage: () => {
        const { currentPage, fetchOrders } = get();
        if (currentPage > 1) {
            fetchOrders(currentPage - 1);
        }
    },

    // --- Detail Actions (Naye add kiye) ---
    fetchOrderById: async (orderId: string) => {
        set({ detailLoading: true, detailError: null, selectedOrder: null });
        try {
            const data = await orderService.getOrderById(orderId);
            set({ selectedOrder: data.order, detailLoading: false });
        } catch (err: any) {
            console.error("Failed to fetch order:", err);
            set({ detailLoading: false, detailError: 'Failed to load order details.' });
        }
    },

    clearSelectedOrder: () => {
        set({ selectedOrder: null, detailLoading: true, detailError: null });
    }
}));