import React, { useEffect, useState } from 'react';
import { getGames } from './../services/games';
import { Search, Zap } from 'lucide-react';
import GameCard from '../components/games/GameCard'; 

const HomePage = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    
 
    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage] = useState(20); 

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const data = await getGames();
                setGames(data || []);
            } catch (error) {
                console.error("Error cargando juegos:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchGames();
    }, []);

    const filteredGames = games.filter(game => 
        game.titulo && game.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame);
    const totalPages = Math.ceil(filteredGames.length / gamesPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    return (
        <div className="min-h-screen bg-gray-950 text-gray-100 font-sans pb-12">
            

            <header className="py-12 px-4 text-center relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-purple-900/10 blur-3xl -z-10 rounded-full opacity-50 pointer-events-none"></div>
                
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
                    Descubre tu próxima <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">aventura</span>
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-lg">
                    Explora reseñas honestas, comparte tu opinión y encuentra joyas ocultas.
                </p>
                
                <div className="relative max-w-md mx-auto group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-500 group-focus-within:text-purple-500 transition-colors" />
                    </div>
                    <input 
                        type="text" 
                        className="block w-full pl-11 pr-4 py-3 border border-gray-800 rounded-full leading-5 bg-gray-900/80 backdrop-blur-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:bg-gray-900 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all shadow-lg" 
                        placeholder="Busca un juego..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </header>


            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-2 mb-6">
                    <Zap className="text-yellow-400 h-6 w-6 fill-current" />
                    <h2 className="text-2xl font-bold text-white">
                        {searchTerm ? `Resultados para "${searchTerm}"` : "Biblioteca de Juegos"}
                    </h2>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                         <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {currentGames.length > 0 ? (
                                currentGames.map((game) => (
                                    <GameCard key={game._id || game.id} game={game} />
                                ))
                            ) : (
                                <div className="col-span-full text-center text-gray-500 py-10">
                                    No se encontraron juegos con ese nombre.
                                </div>
                            )}
                        </div>

                        {totalPages > 1 && (
                            <div className="flex justify-center items-center mt-12 gap-4">
                                <button 
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    ← Anterior
                                </button>

                                <span className="text-gray-400 font-mono text-sm">
                                    Página <span className="text-white font-bold text-base">{currentPage}</span> de {totalPages}
                                </span>

                                <button 
                                    onClick={() => paginate(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Siguiente →
                                </button>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
};

export default HomePage;