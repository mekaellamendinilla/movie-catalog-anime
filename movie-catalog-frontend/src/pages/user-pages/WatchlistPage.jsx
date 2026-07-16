import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import UserNavbar from "../../components/layout/UserNavbar";
import MovieCard from "../../components/movies/MovieCard";
import Toast from "../../components/Toast";
import { getWatchlist, removeWatchlist } from "../../services/watchlistService";

function Watchlist() {
  const [watchlistMovies, setWatchlistMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState({ visible: false, message: "" });

  useEffect(() => {
    const loadWatchlist = async () => {
      try {
        const data = await getWatchlist();
        setWatchlistMovies((data || []).map((movie) => ({ ...movie, id: movie.movie_id || movie.id })));
      } catch (err) {
        setError("Unable to load your watchlist right now.");
      } finally {
        setLoading(false);
      }
    };

    loadWatchlist();
  }, []);

  const showToast = (message) => {
    setToast({ visible: true, message });
  };

  const handleRemoveWatchlist = async (movieToRemove) => {
    const movieId = movieToRemove.id;
    const previousMovies = watchlistMovies;
    setWatchlistMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== movieId));

    try {
      await removeWatchlist(movieId);
      showToast("Successfully removed from Watchlist.");
    } catch (err) {
      setWatchlistMovies(previousMovies);
      setError("Unable to remove from watchlist right now.");
    }
  };

  return (
    <div className="min-h-screen bg-[#27452f] font-montserrat text-[#e7debb]">
      <UserNavbar />

      <div className="mx-auto max-w-350 p-6 md:p-10">
        <h2 className="mb-8 font-serif text-3xl font-bold tracking-wide text-[#e7debb]">My Watchlist</h2>

        {error ? <p className="mb-4 rounded-lg bg-red-950/40 px-3 py-2 text-sm text-red-100">{error}</p> : null}

        {loading ? (
          <p className="text-[#e7debb]/80">Loading watchlist...</p>
        ) : watchlistMovies.length === 0 ? (
          <div className="rounded-2xl border border-[#e7debb]/20 bg-[#36573e]/70 px-6 py-10 text-center text-[#e7debb]">
            Your watchlist is empty.
          </div>
        ) : (
          <div className="grid grid-cols-2 items-start gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {watchlistMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isFavorite={false}
                isWatchlist
                onFavoriteToggle={() => {}}
                onWatchlistToggle={handleRemoveWatchlist}
              />
            ))}

            <Link
              to="/home"
              className="flex aspect-3/4 w-full cursor-pointer items-center justify-center rounded-xl border border-dashed border-[#e7debb]/20 bg-[#263f2e] transition-all duration-300 hover:border-[#e7debb]/50 hover:bg-[#2d4936]"
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

      <Toast message={toast.message} visible={toast.visible} onClose={() => setToast({ visible: false, message: "" })} />
    </div>
  );
}

export default Watchlist;