import React, { useState } from 'react';

function ReviewForm({ gameId, onSubmit, initialReview = null }) {
    const [rating, setRating] = useState(initialReview ? initialReview.rating : 5);
    const [comment, setComment] = useState(initialReview ? initialReview.comment : '');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSubmit({ rating, comment });
            setComment('');
            setRating(5);
        } catch (error) {
            console.error("Error al enviar reseña:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold mb-4">{initialReview ? "Editar Reseña" : "Añadir Nueva Reseña"}</h3>
            <div className="mb-4">
                <label htmlFor="rating" className="block text-gray-700 text-sm font-bold mb-2">
                    Calificación:
                </label>
                <select
                    id="rating"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    required
                >
                    {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>{num} Estrellas</option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="comment" className="block text-gray-700 text-sm font-bold mb-2">
                    Comentario:
                </label>
                <textarea
                    id="comment"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    rows="4"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                ></textarea>
            </div>
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={loading}
            >
                {loading ? 'Enviando...' : (initialReview ? 'Actualizar Reseña' : 'Publicar Reseña')}
            </button>
        </form>
    );
}

export default ReviewForm;