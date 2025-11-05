import { api } from "./api";

interface AddToCartPayload {
    productId: string;
    variantId: string;
    quantity: number;
}
const addItemToCart = async (payload: AddToCartPayload) => {
    const response = await api.post('/cart', {
        payload
    })
    return response.data;
}

const getCart = async () => {
    const response = await api.get('/cart')
    return response.data;
}

const removeItemFromCart = async (itemId: string) => {
    const response = await api.delete(`/cart/remove/${itemId}`);
    return response.data;
};
const updateItemQuantity = async (payload: AddToCartPayload) => {
    const response = await api.post('/cart/add', payload);
    return response.data;
}
export const cartService = {
    addItemToCart,
    getCart,
    removeItemFromCart,
    updateItemQuantity
}