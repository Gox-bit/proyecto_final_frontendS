import React from 'react';

function ReviewCard({ review, currentUserId, onUpdate, onDelete }) {
    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <p className="font-semibold">{review.user.username || 'Usuario Desconocido'}</p>
            <p>Calificación: {review.rating} Estrellas</p>
            <p>{review.comment}</p>
            {currentUserId === review.user._id && (
                <div className="mt-2">
                    <button
                        onClick={() => onUpdate(review._id, { })}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2"
                    >
                        Editar
                    </button>
                    <button
                        onClick={() => onDelete(review._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                        Eliminar
                    </button>
                </div>
            )}
        </div>
    );
}

export default ReviewCard;