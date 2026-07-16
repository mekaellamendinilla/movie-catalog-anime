import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { filterMoviesByCategory, getMovies, paginateMovies, searchMovies } from "../../services/movieService";
import { getCategories } from "../../services/categoryService";
import { addFavorite, getFavorites, removeFavorite } from "../../services/favoriteService";
import { addWatchlist, getWatchlist } from "../../services/watchlistService";

import UserNavbar from "../../components/layout/UserNavbar";
import HeroSection from "../../components/movies/HeroSection";
import SearchBar from "../../components/movies/SearchBar";
import CategoryFilter from "../../components/movies/CategoryFilter";
import MovieCard from "../../components/movies/MovieCard";
import Footer from "../../components/layout/Footer";
import Toast from "../../components/Toast";

export default function HomePage() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [toast, setToast] = useState({ visible: false, message: "" });

  const normalizeMovie = (movie) => ({
    ...movie,
    id: movie.movie_id || movie.id,
    image: movie.image || movie.poster,
  });

  const showToast = (message) => {
    setToast({ visible: true, message });
  };

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [moviesData, categoriesData, favoritesData, watchlistData] = await Promise.all([
          getMovies(),
          getCategories(),
          getFavorites(),
          getWatchlist(),
        ]);

        setMovies(moviesData);
        setCategories(categoriesData);
        setFavorites((favoritesData || []).map(normalizeMovie));
        setWatchlist((watchlistData || []).map(normalizeMovie));
      } catch (err) {
        setError("Unable to load movies right now.");
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const fetchMovies = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getMovies();
      setMovies(data);
      setPage(1);
    } catch (err) {
      setError("Unable to load movies right now.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      await fetchMovies();
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await searchMovies(trimmedQuery);
      setMovies(data);
    } catch (err) {
      setError("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = async (categoryId) => {
    setSelectedCategoryId(categoryId);

    if (!categoryId) {
      await fetchMovies();
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await filterMoviesByCategory(categoryId);
      setMovies(data);
    } catch (err) {
      setError("Unable to filter movies right now.");
    } finally {
      setLoading(false);
    }
  };

  const handlePagination = async (newPage) => {
    setLoading(true);
    setError("");

    try {
      const data = await paginateMovies(newPage, limit);
      setMovies(data);
      setPage(newPage);
    } catch (err) {
      setError("Unable to load the next page right now.");
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteToggle = async (movie) => {
    const movieId = movie.id;
    const isAlreadyFavorite = favorites.some((item) => item.id === movieId);

    if (isAlreadyFavorite) {
      const previousFavorites = favorites;
      setFavorites((prev) => prev.filter((item) => item.id !== movieId));

      try {
        await removeFavorite(movieId);
        showToast("Successfully removed from Favorites.");
      } catch (err) {
        setFavorites(previousFavorites);
        setError("Unable to remove from favorites right now.");
      }
      return;
    }

    const optimisticFavorite = normalizeMovie(movie);
    setFavorites((prev) => [...prev, optimisticFavorite]);

    try {
      await addFavorite(movieId);
      showToast("Successfully added to Favorites.");
    } catch (err) {
      setFavorites((prev) => prev.filter((item) => item.id !== movieId));
      setError("Unable to add favorite right now.");
    }
  };

  const handleWatchlistToggle = async (movie) => {
    const movieId = movie.id;
    const isAlreadyWatchlisted = watchlist.some((item) => item.id === movieId);

    if (isAlreadyWatchlisted) {
      navigate("/watchlist");
      return;
    }

    const optimisticWatchlist = normalizeMovie(movie);
    setWatchlist((prev) => [...prev, optimisticWatchlist]);

    try {
      await addWatchlist(movieId);
      showToast("Successfully added to Watchlist.");
    } catch (err) {
      setWatchlist((prev) => prev.filter((item) => item.id !== movieId));
      setError("Unable to add to watchlist right now.");
    }
  };

  return (
    <div className="min-h-screen bg-[#27452f]">
      <UserNavbar />

      <main className="mx-auto max-w-7xl px-6 py-10">
        <HeroSection />

        <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex-1">
            <SearchBar
              search={search}
              setSearch={setSearch}
              onSearch={handleSearch}
            />
          </div>

          <div className="w-full md:w-auto">
            <CategoryFilter
              categories={categories}
              selectedCategoryId={selectedCategoryId}
              onCategoryChange={handleCategoryChange}
            />
          </div>
        </div>

        {error ? (
          <div className="mt-8 rounded-lg border border-red-400/40 bg-red-950/40 px-4 py-3 text-sm text-red-100">
            {error}
          </div>
        ) : null}

        <section className="mt-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-serif text-4xl text-[#e7debb]">Popular Movies</h2>
            {loading ? <p className="text-sm text-[#e7debb]/70">Loading...</p> : null}
          </div>

          {movies.length === 0 && !loading ? (
            <div className="rounded-xl border border-[#e7debb]/20 bg-[#36573e]/60 px-6 py-10 text-center text-[#e7debb]">
              No movies found for this filter.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  isFavorite={favorites.some((item) => item.id === movie.id)}
                  isWatchlist={watchlist.some((item) => item.id === movie.id)}
                  onFavoriteToggle={handleFavoriteToggle}
                  onWatchlistToggle={handleWatchlistToggle}
                />
              ))}
            </div>
          )}
        </section>

        <section className="mt-10 flex items-center justify-center gap-3">
          <button
            onClick={() => handlePagination(Math.max(1, page - 1))}
            className="rounded-lg border border-[#e7debb]/40 px-4 py-2 text-sm text-[#e7debb] disabled:opacity-50"
            disabled={page === 1 || loading}
          >
            Previous
          </button>
          <span className="text-sm text-[#e7debb]">Page {page}</span>
          <button
            onClick={() => handlePagination(page + 1)}
            className="rounded-lg border border-[#e7debb]/40 px-4 py-2 text-sm text-[#e7debb] disabled:opacity-50"
            disabled={movies.length < limit || loading}
          >
            Next
          </button>
        </section>
      </main>

      <Toast message={toast.message} visible={toast.visible} onClose={() => setToast({ visible: false, message: "" })} />
      <Footer />
    </div>
  );
}