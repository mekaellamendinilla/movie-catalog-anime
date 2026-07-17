import { Link } from "react-router-dom";

function MovieCard({
  movie,
  isFavorite = false,
  isWatchlist = false,
  onFavoriteToggle,
  onWatchlistToggle,
}) {
  const posterUrl = movie.image?.startsWith("http")
    ? movie.image
    : movie.image?.startsWith("/")
      ? movie.image
      : `${import.meta.env.VITE_API_URL}/uploads/posters/${movie.image}`;

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (onFavoriteToggle) {
      onFavoriteToggle(movie);
    }
  };

  const handleWatchlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (onWatchlistToggle) {
      onWatchlistToggle(movie);
    }
  };

  return (
    <div className="rounded-xl bg-[#36573e] p-3 shadow-md transition duration-300 ease-out hover:scale-[1.01] hover:shadow-xl">
      <Link to={`/movie-details/${movie.id}`} className="block">
        <img
          src={posterUrl}
          alt={movie.title}
          className="h-48 w-full rounded-lg object-cover md:h-64 lg:h-80"
        />

        <div className="mt-3 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={handleWatchlistClick}
            className="flex-1 rounded-md border border-[#e7debb]/60 bg-transparent px-2 py-1.5 text-center text-xs font-medium text-[#e7debb] transition-colors duration-200 ease-in-out hover:bg-[#e7debb] hover:text-[#27452f]"
          >
            {isWatchlist ? "My List" : "Add Watchlist"}
          </button>

          <button
            type="button"
            onClick={handleFavoriteClick}
            className="rounded-md p-1.5 text-[#e7debb] transition-colors duration-200 hover:text-red-400 focus:outline-none"
            aria-label="Toggle favorite"
          >
            {isFavorite ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-red-500">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            )}
          </button>
        </div>
      </Link>
    </div>
  );
}

export default MovieCard;