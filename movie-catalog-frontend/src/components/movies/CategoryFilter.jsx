export default function CategoryFilter({ categories, selectedCategoryId, onCategoryChange }) {
  return (
    <select
      value={selectedCategoryId}
      onChange={(e) => onCategoryChange(e.target.value)}
      className="w-full md:w-auto bg-[#36573e] text-[#e7debb] rounded-lg px-4 py-3 outline-none h-12 font-montserrat transition duration-150 focus:ring-2 focus:ring-[#4b7a57]"
    >
      <option value="">All</option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
}

