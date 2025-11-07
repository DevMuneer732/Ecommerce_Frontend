import { api } from "./api";

const applyCoupon = async (code: string) => {
    const response = await api.post('/coupon/apply', { code });
    return response.data;
};

export const couponService = {
    applyCoupon,
};