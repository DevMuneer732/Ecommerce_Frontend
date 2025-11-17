import { api } from "./api";

interface ReviewFormData {
    rating: number;
    comment: string;
    image?: File | null;
}

const addReview = async (productId: string, data: ReviewFormData) => {
    const formData = new FormData();
    formData.append('rating', String(data.rating));
    formData.append('comment', data.comment);

    // 3. Agar image mojood hai, to usay 'image' key ke saath append karein
    if (data.image) {
        formData.append('image', data.image);
    }

    // 4. API call karein
    const response = await api.post(`/reviews/${productId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};

const getReviews = async (productId: string, page: number = 1) => {
    const response = await api.get(`/reviews/${productId}`, {
        params: { page }
    });
    return response.data;
};

export const reviewService = {
    addReview,
    getReviews,
};