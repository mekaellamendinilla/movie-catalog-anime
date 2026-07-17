import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getMovieById, getMovies } from "../../services/movieService";
import MovieCard from "../../components/movies/MovieCard";

function MovieDetailsPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });

    const loadMovie = async () => {
      setLoading(true);
      setError("");

      try {
        const movieData = await getMovieById(id);
        setMovie(movieData);

        const allMovies = await getMovies();
        const filtered = allMovies.filter((item) => item.id !== movieData.id);
        const sameCategory = filtered.filter((item) => item.category_id === movieData.category_id).slice(0, 6);
        setRelatedMovies(sameCategory.length > 0 ? sameCategory : filtered.slice(0, 6));
      } catch (err) {
        setError("Unable to load this movie right now.");
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#264d2d]">
        <p className="text-[#e7debb] text-xl">Loading movie details...</p>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#264d2d]">
        <h1 className="text-[#e7debb] text-2xl">Movie not found.</h1>
      </div>
    );
  }

  const posterUrl = movie.image?.startsWith("http")
    ? movie.image
    : movie.image?.startsWith("/")
      ? movie.image
      : `${import.meta.env.VITE_API_URL}/uploads/posters/${movie.image}`;

  return (
    <div className="min-h-screen bg-[#264d2d] px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <Link
          to="/home"
          className="inline-flex items-center gap-2 text-[#e7debb] font-medium mb-8 hover:opacity-80 transition"
        >
          ← Back to Home
        </Link>

        <section className="bg-[#36573e] rounded-xl p-6 md:p-10">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-80 shrink-0">
              <img
                src={posterUrl}
                alt={movie.title}
                className="w-full rounded-lg object-cover"
              />
            </div>

            <div className="flex-1">
              <h1 className="font-serif text-4xl md:text-6xl font-bold text-[#e7debb]">
                {movie.title}
              </h1>

              <p className="text-[#e7debb]/80 mt-3">
                {movie.year} • {movie.category_name || movie.category} • {movie.duration}
              </p>

              <p className="text-[#e7debb]/80 leading-8 mt-10 max-w-2xl">
                {movie.description}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-playfair text-3xl text-[#e7debb] mb-4">More Like This</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {relatedMovies.map((item) => (
              <MovieCard key={item.id} movie={item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default MovieDetailsPage;