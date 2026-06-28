export default function CategoryFilter({
  category,
  setCategory,
}) {
  return (
    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="w-full md:w-auto bg-[#36573e] text-[#e7debb] rounded-lg px-4 py-3 outline-none h-12 font-montserrat transition duration-150 focus:ring-2 focus:ring-[#4b7a57]"
    >
      <option value="All">All</option>
      <option value="Fantasy">Fantasy</option>
      <option value="Adventure">Adventure</option>
      <option value="Mystery">Mystery</option>
      <option value="Drama">Drama</option>
      <option value="Romance">Romance</option>
      <option value="Family">Family</option>
    </select>
  );
}

