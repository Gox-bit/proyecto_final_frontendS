import api from './api';

export const getReviewsByGame = async (gameId) => {
    const response = await api.get(`/games/${gameId}/reviews`);
    return response.data.data;
};

export const createReview = async (gameId, reviewData) => {
    const response = await api.post(`/games/${gameId}/reviews`, reviewData);
    return response.data.data;
};

export const updateReview = async (reviewId, reviewData) => {
    const response = await api.put(`/reviews/${reviewId}`, reviewData);
    return response.data.data;
};

export const deleteReview = async (reviewId) => {
    const response = await api.delete(`/reviews/${reviewId}`);
    return response.data;
};