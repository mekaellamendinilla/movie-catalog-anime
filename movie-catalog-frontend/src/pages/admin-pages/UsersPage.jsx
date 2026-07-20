import { useEffect, useMemo, useState } from "react";
import { Search, SquarePen, Trash2, X } from "lucide-react";

import {
  getAllUsers,
  updateUser,
  deleteUser,
} from "../../services/adminService";

const emptyForm = {
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  role_id: 2, // Default to User (2)
};

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      setUsers(Array.isArray(data) ? data : data.users || []);
    } catch (err) {
      setError("Unable to load users.");
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const fullname = `${user.first_name || ""} ${user.last_name || ""}`.toLowerCase();
      const username = (user.username || "").toLowerCase();
      const email = (user.email || "").toLowerCase();
      const term = searchTerm.toLowerCase();

      return (
        fullname.includes(term) ||
        username.includes(term) ||
        email.includes(term)
      );
    });
  }, [users, searchTerm]);

  const handleEdit = (user) => {
    setEditingId(user.id);
    setForm({
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      username: user.username || "",
      email: user.email || "",
      role_id: user.role_id || 2, // Kukunin ang role_id ng napiling user
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      await updateUser(editingId, form);
      setMessage("User updated successfully.");

      setEditingId(null);
      setForm(emptyForm);
      setShowForm(false);

      await loadUsers();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to update user.");
    }
  };

  const confirmDelete = async () => {
    if (!deletingId) return;
    setError("");
    setMessage("");

    try {
      await deleteUser(deletingId);
      setMessage("User deleted successfully.");
      setDeletingId(null);
      await loadUsers();
    } catch (err) {
      setError("Unable to delete user.");
      setDeletingId(null);
    }
  };

  return (
    <div className="text-[#e7debb] font-montserrat relative min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-serif tracking-wide">
          Users & Roles
        </h1>
        <p className="text-xs text-[#e7debb]/60 mt-0.5">
          Manage registered users and account details
        </p>
      </div>

      {error && (
        <p className="mb-4 rounded-lg bg-red-950/40 px-3 py-2 text-sm text-red-100">
          {error}
        </p>
      )}

      {message && (
        <p className="mb-4 rounded-lg bg-emerald-950/40 px-3 py-2 text-sm text-emerald-100">
          {message}
        </p>
      )}

      <div className="bg-[#36573e] rounded-2xl p-6 shadow-md">
        <div className="mb-6">
          <div className="relative w-full sm:max-w-xs">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#213a28]">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="Search user..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#e7debb] text-[#213a28] placeholder-[#213a28]/60 rounded-xl outline-none font-semibold"
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#e7debb]/10">
          <table className="w-full border-collapse min-w-[850px]">
            <thead>
              <tr className="bg-[#e7debb] text-[#213a28]">
                <th className="py-3 px-4 text-center w-16">#</th>
                <th className="py-3 px-4 text-left">Full Name</th>
                <th className="py-3 px-4 text-left">Username</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Role</th>
                <th className="py-3 px-4 text-center w-24">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e7debb]/10">
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-sm opacity-80">
                    Loading users...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-sm opacity-80">
                    No users found.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-[#213a28]/20 transition-colors">
                    <td className="py-4 px-4 text-center text-sm opacity-80">{user.id}</td>
                    <td className="py-4 px-4 font-semibold">{user.first_name} {user.last_name}</td>
                    <td className="py-4 px-4 text-sm">{user.username}</td>
                    <td className="py-4 px-4 text-sm">{user.email}</td>
                    <td className="py-4 px-4">
                      <span className={`rounded-md px-3 py-1 text-xs font-bold ${
                        user.role_name === "Admin" || user.role_id === 1
                          ? "bg-amber-600/30 text-amber-200 border border-amber-500/30" 
                          : "bg-[#213a28] text-[#e7debb] border border-[#e7debb]/10"
                      }`}>
                        {user.role_name || (user.role_id === 1 ? "Admin" : "User")}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(user)}
                          className="p-1.5 bg-[#e7debb]/10 border border-[#e7debb]/20 rounded-md hover:bg-[#e7debb] hover:text-[#213a28] transition-all"
                        >
                          <SquarePen size={15} />
                        </button>
                        <button
                          onClick={() => setDeletingId(user.id)}
                          className="p-1.5 bg-[#e7debb]/10 border border-[#e7debb]/20 rounded-md hover:bg-red-900/40 hover:text-red-300 transition-all"
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

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="w-full max-w-lg rounded-2xl border border-[#e7debb]/20 bg-[#27452f] p-6 shadow-2xl relative">
            <button 
              onClick={() => { setShowForm(false); setEditingId(null); setForm(emptyForm); }}
              className="absolute top-4 right-4 text-[#e7debb]/60 hover:text-[#e7debb]"
            >
              <X size={20} />
            </button>
            
            <h3 className="text-xl font-bold font-serif mb-4 text-[#e7debb]">
              Edit User Information
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-[#e7debb]/60">First Name</label>
                  <input
                    required
                    value={form.first_name}
                    onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                    className="rounded-lg bg-[#36573e] px-3 py-2 outline-none border border-[#e7debb]/10 text-sm focus:ring-1 focus:ring-[#e7debb]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-[#e7debb]/60">Last Name</label>
                  <input
                    required
                    value={form.last_name}
                    onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                    className="rounded-lg bg-[#36573e] px-3 py-2 outline-none border border-[#e7debb]/10 text-sm focus:ring-1 focus:ring-[#e7debb]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[#e7debb]/60 text-xs">Username</label>
                <input
                  required
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  className="rounded-lg bg-[#36573e] px-3 py-2 outline-none border border-[#e7debb]/10 text-sm focus:ring-1 focus:ring-[#e7debb]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[#e7debb]/60 text-xs">Email Address</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="rounded-lg bg-[#36573e] px-3 py-2 outline-none border border-[#e7debb]/10 text-sm focus:ring-1 focus:ring-[#e7debb]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[#e7debb]/60 text-xs">Role</label>
                <select 
                  name="role_id" 
                  value={form.role_id} 
                  onChange={(e) => setForm({ ...form, role_id: Number(e.target.value) })}
                  className="rounded-lg bg-[#36573e] px-3 py-2 outline-none border border-[#e7debb]/10 text-sm focus:ring-1 focus:ring-[#e7debb] text-[#e7debb]"
                >
                  <option value={1} className="bg-[#27452f] text-[#e7debb]">Admin</option>
                  <option value={2} className="bg-[#27452f] text-[#e7debb]">User</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2 text-sm font-semibold">
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setEditingId(null); setForm(emptyForm); }}
                  className="rounded-lg border border-[#e7debb]/20 px-4 py-2 hover:bg-white/5 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#e7debb] px-4 py-2 text-[#27452f] hover:bg-[#f5efd6] transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="w-full max-w-sm rounded-2xl border border-red-950/30 bg-[#27452f] p-6 shadow-2xl text-center">
            <div className="w-12 h-12 bg-red-950/50 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-3 text-red-300">
              <Trash2 size={22} />
            </div>
            <h3 className="text-lg font-bold font-serif text-[#e7debb]">Delete Account</h3>
            <p className="text-sm text-[#e7debb]/70 mt-1 mb-5">
              Are you sure you want to remove this user? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-3 text-sm font-semibold">
              <button onClick={() => setDeletingId(null)} className="px-4 py-2 border border-[#e7debb]/20 rounded-lg hover:bg-white/5 transition">
                No, Keep
              </button>
              <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}