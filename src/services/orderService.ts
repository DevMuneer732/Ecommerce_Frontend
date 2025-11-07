import { api } from './api';
import { CheckoutPageValues } from '../pages/checkOut'; 
import { CartItem } from '../store/useCartStore'; 

interface PlaceOrderPayload {
    shippingInfo: CheckoutPageValues;
    items?: {
        productId: string;
        variantId: string;
        quantity: number;
    }[];
    couponCode?: string | null;
}


const placeOrder = async (shippingInfo: CheckoutPageValues,itemsToSubmit: CartItem[],couponCode: string | null,isBuyNowFlow: boolean) => {

    const payload: PlaceOrderPayload = {
        shippingInfo,
        couponCode: couponCode || undefined,
    };

    if (isBuyNowFlow) {
        payload.items = itemsToSubmit.map(item => ({
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
        }));
    }
    const response = await api.post('/order', payload);
    return response.data; 
};

export const orderService = {
    placeOrder,
};