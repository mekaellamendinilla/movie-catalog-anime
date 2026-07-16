import { useEffect, useState } from "react";
import { Search, Plus, SquarePen, Trash2, ShieldCheck, Loader2, X } from "lucide-react";
import { getAllUsers, deleteUser, updateUser } from "../../services/adminService";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal States
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  
  // Active Selected User for Modals
  const [selectedUser, setSelectedUser] = useState(null);
  
  // 1. Ginawang role_id ang default property (naka-numeric)
  const [editForm, setEditForm] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    role_id: 2 // Default: 2 for User, 1 for Admin
  });
  
  const [actionLoading, setActionLoading] = useState(false);

  // Load users mula sa backend database
  const loadUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getAllUsers();
      // Siguraduhing may tamang formatting ang role_id pagkapasok mula sa API
      const formattedUsers = (data || []).map(u => ({
        ...u,
        role_id: Number(u.role_id)
      }));
      setUsers(formattedUsers);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users list.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Buksan ang Edit Modal at i-populate ang Fields
  const handleOpenEdit = (user) => {
    setSelectedUser(user);
    
    // Kunin ang active role_id (mula sa database row)
    const detectedRoleId = user.role_id 
      ? Number(user.role_id) 
      : (user.role_name === "Admin" ? 1 : 2);

    setEditForm({
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      username: user.username || "",
      email: user.email || "",
      role_id: detectedRoleId
    });
    setIsEditOpen(true);
  };

  // I-save ang in-edit na User Details
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      // Tiyaking number ang role_id na ipadala sa backend
      const payload = {
        ...editForm,
        role_id: Number(editForm.role_id)
      };

      await updateUser(selectedUser.id, payload);
      
      // I-update ang UI list sa state nang lokal para hindi na kailangan mag-hard reload
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.id === selectedUser.id 
            ? { 
                ...u, 
                ...payload,
                // I-sync din ang string representation para sa UI badges
                role_name: payload.role_id === 1 ? "Admin" : "User"
              } 
            : u
        )
      );
      
      setIsEditOpen(false);
      setSelectedUser(null);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update user.");
    } finally {
      setActionLoading(false);
    }
  };

  // Buksan ang Delete Confirmation Modal
  const handleOpenDelete = (user) => {
    setSelectedUser(user);
    setIsDeleteOpen(true);
  };

  // I-confirm at I-execute ang pag-delete
  const handleConfirmDelete = async () => {
    setActionLoading(true);
    try {
      await deleteUser(selectedUser.id);
      
      // Tanggalin si user sa local state
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== selectedUser.id));
      setIsDeleteOpen(false);
      setSelectedUser(null);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete user.");
    } finally {
      setActionLoading(false);
    }
  };

  // Filter users gamit ang Username, Email, o Full Name
  const filteredUsers = users.filter((user) => {
    const fullName = `${user.first_name || ""} ${user.last_name || ""}`.toLowerCase();
    const username = (user.username || "").toLowerCase();
    const email = (user.email || "").toLowerCase();
    const term = searchTerm.toLowerCase();

    return username.includes(term) || email.includes(term) || fullName.includes(term);
  });

  return (
    <div className="text-[#e7debb] font-montserrat relative">
      {/* 1. Header Title Section */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-serif tracking-wide">Users & Roles</h1>
        <p className="text-xs text-[#e7debb]/60 mt-0.5">
          Welcome admin brutatatatat
        </p>
      </div>

      {/* Main Content Container Grid Card */}
      <div className="bg-[#36573e] rounded-2xl p-6 shadow-md">
        
        {/* 2. Toolbar Operations Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          {/* Search Box Input */}
          <div className="relative w-full sm:max-w-xs">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#213a28]">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="Search by name, user, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#e7debb] text-[#213a28] placeholder-[#213a28]/60 font-semibold text-sm rounded-xl outline-none focus:ring-2 focus:ring-[#e7debb]/50 transition-all"
            />
          </div>
        </div>

        {error && (
          <p className="mb-4 rounded-lg bg-red-950/40 px-3 py-2 text-sm text-red-100">
            {error}
          </p>
        )}

        {/* 3. User & Roles Data Table Management */}
        <div className="overflow-x-auto rounded-xl border border-[#e7debb]/10">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-2 text-[#e7debb]/70">
              <Loader2 size={32} className="animate-spin" />
              <p className="text-sm font-semibold">Loading users list...</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-12 text-[#e7debb]/70">
              Walang mahanap na user.
            </div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-[#e7debb] text-[#213a28] font-bold text-sm tracking-wide">
                  <th className="py-3 px-4 w-16 text-center">#</th>
                  <th className="py-3 px-4">Full Name</th>
                  <th className="py-3 px-4">Username</th>
                  <th className="py-3 px-4">Email Address</th>
                  <th className="py-3 px-4 w-32">Role</th>
                  <th className="py-3 px-4 w-24 text-center">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#e7debb]/10 text-sm font-medium">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-[#213a28]/20 transition-colors">
                    <td className="py-4 px-4 text-center font-bold text-[#e7debb]/80">
                      {user.id}
                    </td>
                    
                    <td className="py-4 px-4 text-base font-bold tracking-wide text-[#e7debb]">
                      {user.first_name || ""} {user.last_name || ""}
                    </td>

                    <td className="py-4 px-4 text-[#e7debb]/90">
                      @{user.username}
                    </td>
                    
                    <td className="py-4 px-4 text-[#e7debb]/70 font-normal">
                      {user.email}
                    </td>
                    
                    <td className="py-4 px-4">
                      {/* Check natin gamit ang numeric database column na 'role_id' */}
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold tracking-wide ${
                        Number(user.role_id) === 1 || user.role_name === "Admin"
                          ? "bg-amber-500/10 text-amber-300 border border-amber-500/20" 
                          : "bg-[#213a28] text-[#e7debb]/90 border border-[#e7debb]/10"
                      }`}>
                        {(Number(user.role_id) === 1 || user.role_name === "Admin") && <ShieldCheck size={13} />}
                        {Number(user.role_id) === 1 || user.role_name === "Admin" ? "Admin" : "User"}
                      </span>
                    </td>
                    
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center gap-2">
                        {/* Edit Action */}
                        <button 
                          onClick={() => handleOpenEdit(user)}
                          className="p-1.5 bg-[#e7debb]/10 border border-[#e7debb]/20 rounded-md text-[#e7debb] hover:bg-[#e7debb] hover:text-[#213a28] transition-all"
                        >
                          <SquarePen size={15} />
                        </button>
                        {/* Delete Action */}
                        <button 
                          onClick={() => handleOpenDelete(user)}
                          className="p-1.5 bg-[#e7debb]/10 border border-[#e7debb]/20 rounded-md text-[#e7debb] hover:bg-red-900/40 hover:text-red-300 hover:border-red-400/50 transition-all"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* ========================================== */}
      {/* 🛠️ CUSTOM EDIT USER POP-UP MODAL          */}
      {/* ========================================== */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300">
          <div className="bg-[#36573e] border border-[#e7debb]/20 rounded-2xl w-full max-w-lg p-6 shadow-2xl text-[#e7debb] animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-[#e7debb]/10 pb-4 mb-4">
              <h2 className="text-xl font-serif font-bold tracking-wide">Edit User Profile</h2>
              <button 
                onClick={() => setIsEditOpen(false)}
                className="text-[#e7debb]/60 hover:text-[#e7debb] transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1 uppercase tracking-wider text-[#e7debb]/70">First Name</label>
                  <input
                    type="text"
                    required
                    value={editForm.first_name}
                    onChange={(e) => setEditForm({ ...editForm, first_name: e.target.value })}
                    className="w-full bg-[#27452f] border border-[#e7debb]/20 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-[#e7debb] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 uppercase tracking-wider text-[#e7debb]/70">Last Name</label>
                  <input
                    type="text"
                    required
                    value={editForm.last_name}
                    onChange={(e) => setEditForm({ ...editForm, last_name: e.target.value })}
                    className="w-full bg-[#27452f] border border-[#e7debb]/20 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-[#e7debb] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 uppercase tracking-wider text-[#e7debb]/70">Username</label>
                <input
                  type="text"
                  required
                  value={editForm.username}
                  onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                  className="w-full bg-[#27452f] border border-[#e7debb]/20 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-[#e7debb] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 uppercase tracking-wider text-[#e7debb]/70">Email Address</label>
                <input
                  type="email"
                  required
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full bg-[#27452f] border border-[#e7debb]/20 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-[#e7debb] transition-all"
                />
              </div>

              {/* 👑 Dito na-update nang maayos ang numeric value at state sync */}
              <div>
                <label className="block text-xs font-semibold mb-1 uppercase tracking-wider text-[#e7debb]/70">
                  User Role
                </label>
                <select
                  value={editForm.role_id}
                  onChange={(e) => setEditForm({ ...editForm, role_id: Number(e.target.value) })}
                  className="w-full bg-[#27452f] border border-[#e7debb]/20 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-[#e7debb] transition-all text-[#e7debb] cursor-pointer"
                >
                  <option value={2} className="bg-[#36573e]">User</option>
                  <option value={1} className="bg-[#36573e]">Admin</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#e7debb]/10 mt-6">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
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
                  ) : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 🗑️ CUSTOM DELETE USER POP-UP MODAL        */}
      {/* ========================================== */}
      {isDeleteOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300">
          <div className="bg-[#36573e] border border-red-500/20 rounded-2xl w-full max-w-md p-6 shadow-2xl text-[#e7debb] animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-[#e7debb]/10 pb-4 mb-4">
              <h2 className="text-xl font-serif font-bold text-red-300 tracking-wide">Confirm Delete</h2>
              <button 
                onClick={() => setIsDeleteOpen(false)}
                className="text-[#e7debb]/60 hover:text-[#e7debb] transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-[#e7debb]/90 leading-relaxed">
                Sigurado ka bang gusto mong burahin si <span className="font-bold text-white">@{selectedUser?.username}</span> (ID: {selectedUser?.id})? 
              </p>
              <p className="text-xs text-red-300/80 bg-red-950/30 border border-red-500/10 p-3 rounded-lg leading-relaxed">
                ⚠️ Ang action na ito ay permanent at hindi na pwedeng bawiin. Mawawala rin ang lahat ng listahan, favorites, at watchlists na konektado sa user na ito.
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
                ) : "Delete User"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}