import { useState } from "react";

import UserNavbar from "../../components/layout/UserNavbar";
import HeroSection from "../../components/movies/HeroSection";
import SearchBar from "../../components/movies/SearchBar";
import CategoryFilter from "../../components/movies/CategoryFilter";
import movies from "../../data/movies";
import MovieCard from "../../components/movies/MovieCard";
import Footer from "../../components/layout/Footer";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] =
    useState("All");

  const normalized = search.trim().toLowerCase();

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch =
      !normalized ||
      movie.title.toLowerCase().includes(normalized) ||
      (movie.description && movie.description.toLowerCase().includes(normalized));

    const matchesCategory =
      category === "All" || category === "All Categories" || movie.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#27452f]">
      <UserNavbar />

      <main className="max-w-7xl mx-auto px-6 py-10">

        <HeroSection />

        <div className="flex flex-col md:flex-row md:items-center gap-4 mt-10">
          <div className="flex-1">
            <SearchBar search={search} setSearch={setSearch} />
          </div>

          <div className="w-full md:w-auto md:ml-4">
            <CategoryFilter category={category} setCategory={setCategory} />
          </div>
        </div>

        <section className="mt-16">
          <h2 className="font-serif text-4xl text-[#e7debb] mb-6">
            Popular Movies
          </h2>

          <p className="text-[#e7debb]/70"></p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>  
        </section>

        <section className="mt-16">
          <h2 className="font-serif text-4xl text-[#e7debb] mb-6">
            More to Watch
          </h2>

          <p className="text-[#e7debb]/70"></p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

