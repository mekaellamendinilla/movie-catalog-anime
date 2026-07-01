export default function SearchBar({ search, setSearch }) {
  return (
    <div className="relative w-full">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#e7debb]/80">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
          <circle cx="11" cy="11" r="6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>

      <input
        type="text"
        placeholder="Search anime..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-[#36573e] text-[#e7debb] placeholder:text-[#e7debb]/60 rounded-lg pl-10 pr-4 py-3 outline-none font-montserrat transition duration-200 focus:ring-2 focus:ring-[#4b7a57]"
      />
    </div>
  );
}

