import { api } from './api';
import { CheckoutPageValues } from '../pages/checkOut';
import { CartItem } from '../store/useCartStore';

interface BackendShippingInfo {
    fullname: string;
    address: string;
    phone: string;
    email?: string;
}

interface PlaceOrderPayload {
    shippingInfo: BackendShippingInfo;
    items?: {
        productId: string;
        variantId: string;
        quantity: number;
    }[];
    couponCode?: string | null;
}
const placeOrder = async (shippingInfo: CheckoutPageValues, itemsToSubmit: CartItem[], couponCode: string | null, isBuyNowFlow: boolean) => {

    const backendShippingInfo = {
        fullname: shippingInfo.fullName,
        address: shippingInfo.streetAddress,
        phone: shippingInfo.phone,
        email: shippingInfo.email
    };

    const payload: PlaceOrderPayload = {
        shippingInfo: backendShippingInfo,
        couponCode: couponCode || undefined,
        items: undefined as any
    };

    if (isBuyNowFlow) {
        payload.items = itemsToSubmit.map(item => ({
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
        }));
    }
    const response = await api.post('/orders', payload);
    return response.data;
};

const getMyOrders = async (page: number = 1) => {
    const response = await api.get('/orders', {
        params: {
            page,
        },
    });
    return response.data;
}

const getOrderById = async (id: string) => {
    const response = await api.get(`/orders/${id}`);
    return response.data; 
};
export const orderService = {
    placeOrder,
    getMyOrders,
    getOrderById
};