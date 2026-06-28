import { Link } from "react-router-dom";


function MovieCard({ movie }) {
  return (
    <div className="
      bg-[#36573e]
      rounded-xl
      overflow-hidden
      shadow-md
      transform
      hover:scale-105
      hover:shadow-xl
      transition duration-300 ease-out
    ">
      <img
        src={movie.image}
        alt={movie.title}
        className="w-full h-48 md:h-64 lg:h-80 object-cover"
      />

      <div className="p-4">
        <h3 className="text-[#e7debb] font-semibold font-montserrat">
          {movie.title}
        </h3>

        <p className="text-[#e7debb]/70 text-sm font-montserrat">
          {movie.category} • {movie.year}
        </p>

        <Link
          to={`/movie/${movie.id}`}
          className="
            inline-block
            mt-4
            border border-[#e7debb]
            text-[#e7debb]
            px-4 py-2
            rounded-md
            hover:bg-[#e7debb]
            hover:text-[#27452f]
            bg-transparent
            transition-colors duration-200 ease-in-out font-montserrat
          "
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default MovieCard;