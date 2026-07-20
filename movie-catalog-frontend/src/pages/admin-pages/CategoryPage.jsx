import { useEffect, useMemo, useState } from "react";
import { Search, Plus, SquarePen, Trash2, Loader2, X } from "lucide-react";
import { 
  createAdminCategory, 
  deleteAdminCategory, 
  getAdminCategories, 
  updateAdminCategory 
} from "../../services/adminCategoryService";

const emptyForm = { name: "", description: "" };

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await getAdminCategories();
      setCategories(data || []);
    } catch (err) {
      setError("Unable to load categories.");
    } finally {
      setLoading(false);
    }
  };

  const filteredCategories = useMemo(() => {
    return categories.filter((cat) => 
      cat.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [categories, searchTerm]);

  const handleOpenCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (category) => {
    setEditingId(category.id);
    setForm({ name: category.name, description: category.description || "" });
    setIsFormOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setActionLoading(true);

    try {
      if (editingId) {
        await updateAdminCategory(editingId, form);
        setMessage("Category updated successfully.");
      } else {
        await createAdminCategory(form);
        setMessage("Category created successfully.");
      }

      setForm(emptyForm);
      setEditingId(null);
      setIsFormOpen(false);
      await loadCategories();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to save category.");
    } finally {
      setActionLoading(false);
    }
  };

  // Buksan ang Custom Delete Confirmation Modal
  const handleOpenDelete = (category) => {
    setSelectedCategory(category);
    setIsDeleteOpen(true);
  };

  // I-execute ang pag-delete mula sa Custom Modal
  const handleConfirmDelete = async () => {
    if (!selectedCategory) return;
    setError("");
    setMessage("");
    setActionLoading(true);

    try {
      await deleteAdminCategory(selectedCategory.id);
      setMessage("Category deleted successfully.");
      setIsDeleteOpen(false);
      setSelectedCategory(null);
      await loadCategories();
    } catch (err) {
      setError("Unable to delete category.");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="text-[#e7debb] font-montserrat relative">
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-serif tracking-wide">Categories</h1>
        <p className="text-xs text-[#e7debb]/60 mt-0.5">Manage categories from the database</p>
      </div>

      {error ? <p className="mb-4 rounded-lg bg-red-950/40 px-3 py-2 text-sm text-red-100">{error}</p> : null}
      {message ? <p className="mb-4 rounded-lg bg-emerald-950/40 px-3 py-2 text-sm text-emerald-100">{message}</p> : null}

      <div className="bg-[#36573e] rounded-2xl p-6 shadow-md">
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="relative w-full sm:max-w-xs">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#213a28]">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#e7debb] text-[#213a28] placeholder-[#213a28]/60 font-semibold text-sm rounded-xl outline-none focus:ring-2 focus:ring-[#e7debb]/50 transition-all"
            />
          </div>

          {/* Trigger Open Modal (Add) */}
          <button 
            onClick={handleOpenCreate} 
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#27452f] border border-[#e7debb]/10 rounded-xl text-sm font-bold text-[#e7debb] hover:bg-[#36573e] transition-all self-end sm:self-auto shadow-md"
          >
            <Plus size={18} />
            <span>Add New Category</span>
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#e7debb]/10">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-[#e7debb] text-[#213a28] font-bold text-sm tracking-wide">
                <th className="py-3 px-4 w-16 text-center">#</th>
                <th className="py-3 px-4 w-48">Category</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4 w-24 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#e7debb]/10 text-sm font-medium">
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-4 py-12 text-center text-[#e7debb]/70">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Loader2 size={32} className="animate-spin" />
                      <p className="text-sm font-semibold">Loading categories...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-4 py-12 text-center text-[#e7debb]/70">
                    No categories found.
                  </td>
                </tr>
              ) : (
                filteredCategories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-[#213a28]/20 transition-colors">
                    <td className="py-4 px-4 text-center font-bold text-[#e7debb]/80">{cat.id}</td>
                    <td className="py-4 px-4 text-base font-bold tracking-wide text-[#e7debb]">{cat.name}</td>
                    <td className="py-4 px-4 text-[#e7debb]/70 font-normal max-w-xs truncate">{cat.description || "—"}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => handleOpenEdit(cat)} 
                          className="p-1.5 bg-[#e7debb]/10 border border-[#e7debb]/20 rounded-md text-[#e7debb] hover:bg-[#e7debb] hover:text-[#213a28] transition-all"
                        >
                          <SquarePen size={15} />
                        </button>

                        <button 
                          onClick={() => handleOpenDelete(cat)} 
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

      {isFormOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300">
          <div className="bg-[#36573e] border border-[#e7debb]/20 rounded-2xl w-full max-w-md p-6 shadow-2xl text-[#e7debb] animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-[#e7debb]/10 pb-4 mb-4">
              <h2 className="text-xl font-serif font-bold tracking-wide">
                {editingId ? "Edit Category" : "Add New Category"}
              </h2>
              <button 
                onClick={() => setIsFormOpen(false)}
                className="text-[#e7debb]/60 hover:text-[#e7debb] transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1 uppercase tracking-wider text-[#e7debb]/70">Category Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Action, Sci-Fi"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-[#27452f] border border-[#e7debb]/20 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-[#e7debb] transition-all text-[#e7debb] placeholder-[#e7debb]/30"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 uppercase tracking-wider text-[#e7debb]/70">Description</label>
                <textarea
                  placeholder="Describe this category..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-[#27452f] border border-[#e7debb]/20 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-[#e7debb] transition-all text-[#e7debb] placeholder-[#e7debb]/30 min-h-28 resize-none"
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
                    editingId ? "Update Category" : "Create Category"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDeleteOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300">
          <div className="bg-[#36573e] border border-red-500/20 rounded-2xl w-full max-w-md p-6 shadow-2xl text-[#e7debb] animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-[#e7debb]/10 pb-4 mb-4">
              <h2 className="text-xl font-serif font-bold text-red-300 tracking-wide">Delete Category</h2>
              <button 
                onClick={() => setIsDeleteOpen(false)}
                className="text-[#e7debb]/60 hover:text-[#e7debb] transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-[#e7debb]/90 leading-relaxed">
                Are you sure you want to delete the movie <span className="font-bold text-[#e7debb]">"{selectedCategory?.name}"</span>?
              </p>
              <p className="text-xs text-red-300/80 bg-red-950/30 border border-red-500/10 p-3 rounded-lg leading-relaxed">
                ⚠️ This action is permanent and cannot be undone. The movie will no longer be accessible to users.
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
                className="flex items-center gap-2 px-5 py-2 bg-red-700 hover:bg-red-800 text-white rounded-xl text-sm font-bold transition-all disabled:opacity-50"
              >
                {actionLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Deleting...
                  </>
                ) : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}