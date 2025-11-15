import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getGameById } from '../../services/games';
import { getReviewsByGame, createReview, updateReview, deleteReview } from '../../services/reviews';
import { useAuth } from '../../contexts/AuthContext';
import ReviewForm from '../../components/reviews/ReviewForm';
import ReviewCard from '../../components/reviews/ReviewCard';

function GameDetailsPage() {
    const { id } = useParams();
    const { user } = useAuth();
    const [game, setGame] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchGameAndReviews = async () => {
        try {
            const gameData = await getGameById(id);
            setGame(gameData);
            const reviewsData = await getReviewsByGame(id);
            setReviews(reviewsData);
        } catch (err) {
            setError('Error al cargar los detalles del juego o las reseñas.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGameAndReviews();
    }, [id]);

    const handleNewReview = async (reviewData) => {
        try {
            await createReview(id, reviewData);
            fetchGameAndReviews();
        } catch (err) {
            console.error("Error creando reseña:", err);
            alert("No se pudo crear la reseña. ¿Estás logueado?");
        }
    };

    const handleUpdateReview = async (reviewId, reviewData) => {
        try {
            await updateReview(reviewId, reviewData);
            fetchGameAndReviews();
        } catch (err) {
            console.error("Error actualizando reseña:", err);
            alert("No se pudo actualizar la reseña. ¿Es tu reseña?");
        }
    };

    const handleDeleteReview = async (reviewId) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar esta reseña?")) {
            try {
                await deleteReview(reviewId);
                fetchGameAndReviews();
            } catch (err) {
                console.error("Error eliminando reseña:", err);
                alert("No se pudo eliminar la reseña. ¿Es tu reseña?");
            }
        }
    };

    if (loading) return <div>Cargando juego...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!game) return <div>Juego no encontrado.</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-4">{game.title}</h1>
            <p className="text-gray-600 mb-2">Género: {game.genre}</p>
            <p className="text-gray-600 mb-4">Calificación promedio: {game.averageRating ? game.averageRating.toFixed(1) : 'N/A'} ({game.reviewCount} reseñas)</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Reseñas</h2>
            {user ? (
                <ReviewForm gameId={id} onSubmit={handleNewReview} />
            ) : (
                <p>Inicia sesión para dejar una reseña.</p>
            )}

            <div className="mt-6 space-y-4">
                {reviews.length > 0 ? (
                    reviews.map(review => (
                        <ReviewCard
                            key={review._id}
                            review={review}
                            currentUserId={user ? user.id : null}
                            onUpdate={handleUpdateReview}
                            onDelete={handleDeleteReview}
                        />
                    ))
                ) : (
                    <p>No hay reseñas para este juego aún.</p>
                )}
            </div>
        </div>
    );
}

export default GameDetailsPage;