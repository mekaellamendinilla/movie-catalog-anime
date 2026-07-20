import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import UserNavbar from "../../components/layout/UserNavbar";
import MovieCard from "../../components/movies/MovieCard";
import Toast from "../../components/Toast";
import { getFavorites, removeFavorite } from "../../services/favoriteService";
import { getWatchlist, addWatchlist, removeWatchlist } from "../../services/watchlistService";

function FavoritesPage() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [watchlistIds, setWatchlistIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState({ visible: false, message: "" });

  const loadData = async () => {
    try {

      const [favoritesData, watchlistData] = await Promise.all([
        getFavorites(),
        getWatchlist()
      ]);

      setFavoriteMovies((favoritesData || []).map((movie) => ({ ...movie, id: movie.movie_id || movie.id })));
      
      const watchIds = new Set((watchlistData || []).map((m) => m.movie_id || m.id));
      setWatchlistIds(watchIds);
    } catch (err) {
      setError("Unable to load favorites right now.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showToast = (message) => {
    setToast({ visible: true, message });
  };

  const handleFavoriteToggle = async (movieToRemove) => {
    const movieId = movieToRemove.id;
    const previousMovies = favoriteMovies;
    
    setFavoriteMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== movieId));

    try {
      await removeFavorite(movieId);
      showToast("Successfully removed from Favorites.");
    } catch (err) {
      setFavoriteMovies(previousMovies);
      setError("Unable to remove from favorites right now.");
    }
  };

  const handleWatchlistToggle = async (movie) => {
    const movieId = movie.id;
    const isCurrentlyInWatchlist = watchlistIds.has(movieId);

    setWatchlistIds((prev) => {
      const next = new Set(prev);
      if (isCurrentlyInWatchlist) next.delete(movieId);
      else next.add(movieId);
      return next;
    });

    try {
      if (isCurrentlyInWatchlist) {
        await removeWatchlist(movieId);
        showToast("Successfully removed from watchlist.");
      } else {
        await addWatchlist(movie);
        showToast("Successfully added to watchlist.");
      }
    } catch (err) {

      setWatchlistIds((prev) => {
        const next = new Set(prev);
        if (isCurrentlyInWatchlist) next.add(movieId);
        else next.delete(movieId);
        return next;
      });
      setError("Unable to update watchlist right now.");
    }
  };

  return (
    <div className="min-h-screen bg-[#27452f] font-montserrat text-[#e7debb] pb-12">
      <UserNavbar />

      <div className="mx-auto max-w-7xl p-4 md:p-10">
        <h2 className="mb-6 md:mb-8 font-serif text-2xl md:text-3xl font-bold tracking-wide text-[#e7debb] text-center sm:text-left">
          My Favorites
        </h2>

        {error ? <p className="mb-4 rounded-lg bg-red-950/40 px-3 py-2 text-sm text-red-100">{error}</p> : null}

        {loading ? (
          <p className="text-[#e7debb]/80 text-center sm:text-left">Loading favorites...</p>
        ) : favoriteMovies.length === 0 ? (
          <div className="rounded-2xl border border-[#e7debb]/20 bg-[#36573e]/70 px-6 py-12 text-center text-[#e7debb] text-sm md:text-base">
            You have no favorites yet.
          </div>
        ) : (
          <div className="grid grid-cols-2 items-start gap-4 sm:gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {favoriteMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isFavorite={true}       
                isWatchlist={watchlistIds.has(movie.id)} 
                onFavoriteToggle={handleFavoriteToggle}
                onWatchlistToggle={handleWatchlistToggle}
              />
            ))}

            <Link
              to="/home"
              className="group flex aspect-[3/4] w-full cursor-pointer items-center justify-center rounded-xl border border-dashed border-[#e7debb]/20 bg-[#263f2e] transition-all duration-300 hover:border-[#e7debb]/50 hover:bg-[#2d4936]"
            >
              <div className="rounded-xl border border-[#e7debb]/30 p-3 transition-transform duration-300 group-hover:scale-110 group-hover:border-[#e7debb]/60">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-[#e7debb]/50 group-hover:text-[#e7debb]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </div>
            </Link>
          </div>
        )}
      </div>

      {toast.visible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4">
          <div className="pointer-events-auto max-w-sm w-full flex justify-center transform transition-all duration-300 animate-in fade-in zoom-in-95">
            <Toast message={toast.message} visible={toast.visible} onClose={() => setToast({ visible: false, message: "" })} />
          </div>
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;