import { useEffect, useMemo, useState } from "react";
import { Search, Plus, SquarePen, Trash2, Image, Loader2, X } from "lucide-react";

import { 
  createAdminMovie, 
  deleteAdminMovie, 
  getAdminMovies, 
  updateAdminMovie 
} from "../../services/adminMovieService";

import { getCategories } from "../../services/categoryService";

const emptyForm = {
  title: "",
  category_id: "",
  duration: "",
  year: "",
  description: "",
  image: null,
};

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Modal Control States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Active Selected Items
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    loadMovies();
    loadCategories();
  }, []);

  const loadMovies = async () => {
    setLoading(true);
    try {
      const data = await getAdminMovies();
      setMovies(data || []);
    } catch (err) {
      setError("Unable to load movies.");
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data || []);
    } catch (err) {
      setError("Unable to load categories.");
    }
  };

  // Instant filtering habang nagta-type sa Search bar (Katulad ng Categories)
  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => 
      movie.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [movies, searchTerm]);

  // Buksan ang Form Modal para sa Create
  const handleOpenCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setIsFormOpen(true);
  };

  // Buksan ang Form Modal para sa Edit
  const handleOpenEdit = (movie) => {
    setEditingId(movie.id);
    setForm({
      title: movie.title,
      category_id: movie.category_id || "",
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: null, // Default to null, only update if admin uploads new file
    });
    setIsFormOpen(true);
  };

  // Submit Handler para sa Create at Edit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setActionLoading(true);

    try {
      const payload = {
        title: form.title,
        category_id: form.category_id,
        duration: form.duration,
        year: Number(form.year),
        description: form.description,
      };

      if (editingId) {
        await updateAdminMovie(editingId, payload, form.image);
        setMessage("Movie updated successfully.");
      } else {
        const created = await createAdminMovie(payload, form.image);
        setMessage(created.message || "Movie created successfully.");
      }

      setForm(emptyForm);
      setEditingId(null);
      setIsFormOpen(false);
      await loadMovies();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to save movie.");
    } finally {
      setActionLoading(false);
    }
  };

  // Buksan ang Custom Delete Confirmation Card
  const handleOpenDelete = (movie) => {
    setSelectedMovie(movie);
    setIsDeleteOpen(true);
  };

  // I-execute ang pag-delete mula sa Custom Modal
  const handleConfirmDelete = async () => {
    if (!selectedMovie) return;
    setError("");
    setMessage("");
    setActionLoading(true);

    try {
      await deleteAdminMovie(selectedMovie.id);
      setMessage("Movie deleted successfully.");
      setIsDeleteOpen(false);
      setSelectedMovie(null);
      await loadMovies();
    } catch (err) {
      setError("Unable to delete movie.");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="text-[#e7debb] font-montserrat relative">
      {/* 1. Header Title Section */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-serif tracking-wide">Movies</h1>
        <p className="text-xs text-[#e7debb]/60 mt-0.5">Manage movies from the database</p>
      </div>

      {error ? <p className="mb-4 rounded-lg bg-red-950/40 px-3 py-2 text-sm text-red-100">{error}</p> : null}
      {message ? <p className="mb-4 rounded-lg bg-emerald-950/40 px-3 py-2 text-sm text-emerald-100">{message}</p> : null}

      {/* Main Table Container Card */}
      <div className="bg-[#36573e] rounded-2xl p-6 shadow-md">
        
        {/* 2. Operations Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          {/* Instant Search Box (No search button needed!) */}
          <div className="relative w-full sm:max-w-xs">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#27452f]">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#e7debb] text-[#27452f] placeholder-[#27452f]/60 font-semibold text-sm rounded-xl outline-none focus:ring-2 focus:ring-[#e7debb]/50 transition-all"
            />
          </div>

          {/* Trigger Create Modal */}
          <button 
            onClick={handleOpenCreate} 
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#27452f] border border-[#e7debb]/10 rounded-xl text-sm font-bold text-[#e7debb] hover:bg-[#36573e] transition-all self-end sm:self-auto shadow-md"
          >
            <Plus size={18} />
            <span>Add New Movie</span>
          </button>
        </div>

        {/* 3. Movies Data Table Management */}
        <div className="overflow-x-auto rounded-xl border border-[#e7debb]/10">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-[#e7debb] text-[#27452f] font-bold text-sm tracking-wide">
                <th className="py-3 px-4 w-12 text-center">#</th>
                <th className="py-3 px-4 w-20">Poster</th>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 w-24">Year</th>
                <th className="py-3 px-4 w-28">Duration</th>
                <th className="py-3 px-4 w-24 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#e7debb]/10 text-sm font-medium">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-4 py-12 text-center text-[#e7debb]/70">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Loader2 size={32} className="animate-spin" />
                      <p className="text-sm font-semibold">Loading movies...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredMovies.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-4 py-12 text-center text-[#e7debb]/70">
                    No movies found.
                  </td>
                </tr>
              ) : (
                filteredMovies.map((movie) => (
                  <tr key={movie.id} className="hover:bg-[#213a28]/20 transition-colors">
                    <td className="py-4 px-4 text-center font-bold text-[#e7debb]/80">{movie.id}</td>
                    
                    {/* Poster View */}
                    <td className="py-4 px-4">
                      {movie.image ? (
                        <img 
                          src={`${import.meta.env.VITE_API_URL}/uploads/posters/${movie.image}`} 
                          alt={movie.title} 
                          className="h-12 w-9 rounded-md object-cover shadow-sm border border-[#e7debb]/10" 
                        />
                      ) : (
                        <div className="flex h-12 w-9 items-center justify-center rounded-md border border-[#e7debb]/30 bg-[#e7debb]/10 text-[#e7debb]/40">
                          <Image size={18} strokeWidth={1.5} />
                        </div>
                      )}
                    </td>

                    {/* Title & Trimmed Description */}
                    <td className="py-4 px-4">
                      <div className="font-bold text-base text-[#e7debb] tracking-wide">{movie.title}</div>
                      <div className="text-[11px] text-[#e7debb]/50 font-normal max-w-xs truncate">
                        {movie.description}
                      </div>
                    </td>

                    <td className="py-4 px-4 text-[#e7debb]/90">{movie.category_name || "Uncategorized"}</td>
                    <td className="py-4 px-4 text-[#e7debb]/90 font-mono">{movie.year}</td>
                    <td className="py-4 px-4 text-[#e7debb]/90">{movie.duration}</td>
                    
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center gap-2">
                        {/* Edit Button */}
                        <button 
                          onClick={() => handleOpenEdit(movie)} 
                          className="p-1.5 bg-[#e7debb]/10 border border-[#e7debb]/20 rounded-md text-[#e7debb] hover:bg-[#e7debb] hover:text-[#213a28] transition-all"
                        >
                          <SquarePen size={15} />
                        </button>
                        {/* Delete Button */}
                        <button 
                          onClick={() => handleOpenDelete(movie)} 
                          className="p-1.5 bg-[#e7debb]/10 border border-[#e7debb]/20 rounded-md text-[#e7debb] hover:bg-red-900/40 hover:text-red-300 hover:border-red-400/50 transition-all"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================== */}
      {/* 🎬 CUSTOM CREATE / EDIT MOVIE MODAL        */}
      {/* ========================================== */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300">
          <div className="bg-[#36573e] border border-[#e7debb]/20 rounded-2xl w-full max-w-xl p-6 shadow-2xl text-[#e7debb] animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-[#e7debb]/10 pb-4 mb-4">
              <h2 className="text-xl font-serif font-bold tracking-wide">
                {editingId ? "Edit Movie Details" : "Add New Movie"}
              </h2>
              <button 
                onClick={() => setIsFormOpen(false)}
                className="text-[#e7debb]/60 hover:text-[#e7debb] transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Title field */}
                <div>
                  <label className="block text-xs font-semibold mb-1 uppercase tracking-wider text-[#e7debb]/70">Movie Title</label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full bg-[#27452f] border border-[#e7debb]/20 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-[#e7debb] transition-all text-[#e7debb]"
                  />
                </div>

                {/* Category selector */}
                <div>
                  <label className="block text-xs font-semibold mb-1 uppercase tracking-wider text-[#e7debb]/70">Category</label>
                  <select
                    required
                    value={form.category_id}
                    onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                    className="w-full bg-[#27452f] border border-[#e7debb]/20 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-[#e7debb] transition-all text-[#e7debb] appearance-none"
                  >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>

                {/* Duration field */}
                <div>
                  <label className="block text-xs font-semibold mb-1 uppercase tracking-wider text-[#e7debb]/70">Duration</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., 2h 15m"
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    className="w-full bg-[#27452f] border border-[#e7debb]/20 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-[#e7debb] transition-all text-[#e7debb]"
                  />
                </div>

                {/* Year field */}
                <div>
                  <label className="block text-xs font-semibold mb-1 uppercase tracking-wider text-[#e7debb]/70">Release Year</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g., 2026"
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: e.target.value })}
                    className="w-full bg-[#27452f] border border-[#e7debb]/20 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-[#e7debb] transition-all text-[#e7debb]"
                  />
                </div>
              </div>

              {/* Description field */}
              <div>
                <label className="block text-xs font-semibold mb-1 uppercase tracking-wider text-[#e7debb]/70">Description / Plot</label>
                <textarea
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-[#27452f] border border-[#e7debb]/20 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-[#e7debb] transition-all text-[#e7debb] min-h-24 resize-none"
                />
              </div>

              {/* Poster file upload field */}
              <div>
                <label className="block text-xs font-semibold mb-1 uppercase tracking-wider text-[#e7debb]/70">
                  Poster Image {editingId && <span className="text-[#e7debb]/40 lowercase font-normal">(leave blank to keep current)</span>}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setForm({ ...form, image: e.target.files?.[0] || null })}
                  className="w-full bg-[#27452f] border border-[#e7debb]/20 rounded-xl px-4 py-2 text-sm text-[#e7debb] file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#e7debb] file:text-[#27452f] hover:file:opacity-90 file:cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#e7debb]/10 mt-6">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 bg-[#27452f] hover:bg-[#27452f]/70 border border-[#e7debb]/10 rounded-xl text-sm font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="flex items-center gap-2 px-5 py-2 bg-[#e7debb] hover:bg-[#e7debb]/90 text-[#213a28] rounded-xl text-sm font-bold transition-all disabled:opacity-50"
                >
                  {actionLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    editingId ? "Update Movie" : "Create Movie"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 🗑️ CUSTOM DELETE MOVIE CONFIRMATION MODAL  */}
      {/* ========================================== */}
      {isDeleteOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300">
          <div className="bg-[#36573e] border border-red-500/20 rounded-2xl w-full max-w-md p-6 shadow-2xl text-[#e7debb] animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-[#e7debb]/10 pb-4 mb-4">
              <h2 className="text-xl font-serif font-bold text-red-300 tracking-wide">Delete Movie</h2>
              <button 
                onClick={() => setIsDeleteOpen(false)}
                className="text-[#e7debb]/60 hover:text-[#e7debb] transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                {selectedMovie?.image ? (
                  <img 
                    src={`${import.meta.env.VITE_API_URL}/uploads/posters/${selectedMovie.image}`} 
                    alt={selectedMovie.title} 
                    className="h-20 w-14 rounded-lg object-cover shadow-md border border-[#e7debb]/10" 
                  />
                ) : (
                  <div className="flex h-20 w-14 items-center justify-center rounded-lg border border-[#e7debb]/30 bg-[#e7debb]/10 text-[#e7debb]/40">
                    <Image size={24} strokeWidth={1.5} />
                  </div>
                )}
                <div>
                  <p className="text-sm text-[#e7debb]/90 leading-relaxed">
                    Sigurado ka bang gusto mong burahin ang pelikulang <span className="font-bold text-white">"{selectedMovie?.title}"</span>?
                  </p>
                  <p className="text-xs text-[#e7debb]/60 mt-1">
                    Released: {selectedMovie?.year} | Duration: {selectedMovie?.duration}
                  </p>
                </div>
              </div>
              <p className="text-xs text-red-300/80 bg-red-950/30 border border-red-500/10 p-3 rounded-lg leading-relaxed">
                ⚠️ Ang action na ito ay permanent at hindi na pwedeng bawiin. Mapuputol ang access ng mga users dito sa site.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#e7debb]/10 mt-6">
              <button
                type="button"
                onClick={() => setIsDeleteOpen(false)}
                className="px-4 py-2 bg-[#27452f] hover:bg-[#27452f]/70 border border-[#e7debb]/10 rounded-xl text-sm font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={actionLoading}
                className="flex items-center gap-2 px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-bold transition-all disabled:opacity-50"
              >
                {actionLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Deleting...
                  </>
                ) : "Delete Movie"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}