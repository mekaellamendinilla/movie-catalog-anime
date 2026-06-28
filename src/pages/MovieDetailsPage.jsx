import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import movies from "../data/movies";
import MovieCard from "../components/MovieCard";

function MovieDetailsPage() {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [id]);

  const movie = movies.find(
    (movie) => movie.id === Number(id)
  );

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#264d2d]">
        <h1 className="text-[#e7debb] text-2xl">
          Movie not found.
        </h1>
      </div>
    );
  }

  let relatedMovies = movies.filter((item) => item.id !== movie.id && item.category === movie.category);
  if (relatedMovies.length === 0) {
    relatedMovies = movies.filter((item) => item.id !== movie.id).slice(0, 6);
  }

  return (
    <div className="min-h-screen bg-[#264d2d] px-6 py-8">
      <div className="max-w-7xl mx-auto">

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[#e7debb] font-medium mb-8 hover:opacity-80 transition"
        >
          ← Back to Home
        </Link>

        <section className="bg-[#36573e] rounded-xl p-6 md:p-10">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-75 shrink-0">
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full rounded-lg object-cover"
              />
            </div>

            <div className="flex-1">
              <h1 className="font-serif text-4xl md:text-6xl font-bold text-[#e7debb]">
                {movie.title}
              </h1>

              <p className="text-[#e7debb]/80 mt-3">
                {movie.year} • {movie.category} • {movie.duration}
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
            {relatedMovies.map((m) => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default MovieDetailsPage;