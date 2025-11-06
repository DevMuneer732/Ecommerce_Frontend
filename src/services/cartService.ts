import { api } from "./api";

interface AddToCartPayload {
    productId: string;
    variantId: string;
    quantity: number;
}
const addItemToCart = async (payload: AddToCartPayload) => {
    const response = await api.post('/cart', {
        productId: payload.productId,
        variantId: payload.variantId,
        quantity: payload.quantity

    })
    return response.data;
}

const getCart = async () => {
    const response = await api.get('/cart')
    return response.data;
}

const removeItemFromCart = async (itemId: string) => {
    const response = await api.delete(`/cart/${itemId}`);
    return response.data;
};
const updateItemQuantity = async (itemId: string, newQuantity: number) => {
    const response = await api.put(`/cart/${itemId}`,
        { quantity: newQuantity });
    return response.data;
}
export const cartService = {
    addItemToCart,
    getCart,
    removeItemFromCart,
    updateItemQuantity
}