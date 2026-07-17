import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Loader2 } from "lucide-react";

import { useAuth } from "../../contexts/AuthContext";
import { getCurrentUserProfile, updateUserProfile, uploadProfilePicture } from "../../services/userService";

export default function AdminProfile() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ first_name: "", last_name: "", username: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  // I-load ang Profile mula sa Backend API
  const loadProfile = async () => {
    try {
      const data = await getCurrentUserProfile();
      setProfile(data);
      setForm({
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        username: data.username || "",
        email: data.email || "",
      });
      setPreviewImage(data.profile_image ? `${import.meta.env.VITE_API_URL}/uploads/profiles/${data.profile_image}` : "");
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
        return;
      }
      setError("Unable to load admin profile right now.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Pag-save ng mga binagong detalye
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    try {
      const response = await updateUserProfile(form);
      setProfile((prev) => ({ ...prev, ...form }));
      setMessage(response.message || "Admin profile updated successfully.");
      await loadProfile();
      window.dispatchEvent(new Event("profileUpdated"));
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
        return;
      }
      setError(err.response?.data?.message || "Unable to update profile.");
    } finally {
      setSaving(false);
    }
  };

  // Pag-upload ng bagong Profile Picture
  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      setError("Only JPG, JPEG, PNG, and WEBP files are supported.");
      return;
    }

    setUploading(true);
    setMessage("");
    setError("");

    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result);
    reader.readAsDataURL(file);

    try {
      const response = await uploadProfilePicture(file);
      setMessage(response.message || "Profile picture updated successfully.");
      await loadProfile();
      window.dispatchEvent(new Event("profileUpdated"));
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
        return;
      }
      setError(err.response?.data?.message || "Unable to update profile picture.");
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3 text-[#e7debb]">
        <Loader2 size={40} className="animate-spin text-[#e7debb]" />
        <p className="text-sm font-semibold tracking-wide">Loading admin profile...</p>
      </div>
    );
  }

  return (
    <div className="text-[#e7debb] font-montserrat">
      
      {/* 1. Header Hero Banner (Kopyang-kopya sa UserProfile) */}
      <div className="bg-[#36573e] rounded-2xl py-10 px-6 md:px-12 border border-[#e7debb]/10 mb-8 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-8 text-center sm:text-left">
            
            {/* Avatar / Photo Upload Container */}
            <label className="w-32 h-32 md:w-36 md:h-36 bg-black/40 border border-[#e7debb]/20 rounded-full flex items-center justify-center overflow-hidden shadow-lg cursor-pointer relative group transition-all duration-300">
              {previewImage ? (
                <img src={previewImage} alt="Profile preview" className="w-full h-full object-cover" />
              ) : (
                <svg className="w-20 h-20 text-white/70 mt-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
              {/* Camera Icon Overlay on Hover */}
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span className="text-xs font-semibold text-[#e7debb] tracking-wide">Change Photo</span>
              </div>
              <input 
                type="file" 
                accept="image/jpeg,image/png,image/webp,image/jpg" 
                className="hidden" 
                onChange={handleImageChange} 
              />
            </label>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-serif tracking-wide">
                {profile?.first_name} {profile?.last_name}
              </h2>
              <span className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20 tracking-wider uppercase">
                👑 {profile?.role_name || profile?.role || "Admin"}
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 border border-[#e7debb]/30 bg-[#27452f] text-[#e7debb] hover:bg-[#e7debb] hover:text-[#213a28] px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 shadow-md uppercase tracking-wider text-xs"
          >
            <LogOut size={15} />
            Sign Out
          </button>
        </div>
      </div>

      {/* 2. Profile Form Details Card */}
      <div className="max-w-7xl mx-auto">
        <div className="rounded-2xl border border-[#e7debb]/10 bg-[#36573e]/40 p-6 md:p-8 shadow-sm">
          <h3 className="text-xl font-bold font-serif mb-6 tracking-wide border-b border-[#e7debb]/10 pb-3">
            Profile Details
          </h3>

          {message && (
            <p className="mb-6 rounded-lg bg-emerald-950/40 px-4 py-3 text-sm text-emerald-100 border border-emerald-500/20">
              {message}
            </p>
          )}
          {error && (
            <p className="mb-6 rounded-lg bg-red-950/40 px-4 py-3 text-sm text-red-100 border border-red-500/20">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#e7debb]/60 pl-1">First Name</label>
              <input 
                type="text" 
                name="first_name" 
                value={form.first_name} 
                onChange={handleChange} 
                placeholder="First name" 
                className="w-full rounded-xl bg-[#27452f] px-4 py-3 text-[#e7debb] outline-none border border-[#e7debb]/10 focus:ring-1 focus:ring-[#e7debb]/40 transition-all font-semibold" 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#e7debb]/60 pl-1">Last Name</label>
              <input 
                type="text" 
                name="last_name" 
                value={form.last_name} 
                onChange={handleChange} 
                placeholder="Last name" 
                className="w-full rounded-xl bg-[#27452f] px-4 py-3 text-[#e7debb] outline-none border border-[#e7debb]/10 focus:ring-1 focus:ring-[#e7debb]/40 transition-all font-semibold" 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#e7debb]/60 pl-1">Username</label>
              <input 
                type="text" 
                name="username" 
                value={form.username} 
                onChange={handleChange} 
                placeholder="Username" 
                className="w-full rounded-xl bg-[#27452f] px-4 py-3 text-[#e7debb] outline-none border border-[#e7debb]/10 focus:ring-1 focus:ring-[#e7debb]/40 transition-all font-semibold" 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#e7debb]/60 pl-1">Email Address</label>
              <input 
                type="email" 
                name="email" 
                value={form.email} 
                onChange={handleChange} 
                placeholder="Email" 
                className="w-full rounded-xl bg-[#27452f] px-4 py-3 text-[#e7debb] outline-none border border-[#e7debb]/10 focus:ring-1 focus:ring-[#e7debb]/40 transition-all font-semibold" 
              />
            </div>

            <div className="md:col-span-2 pt-4">
              <button 
                type="submit" 
                disabled={saving || uploading} 
                className="rounded-full bg-[#27452f] hover:bg-[#1f3b26] border border-[#e7debb]/20 px-8 py-3.5 font-bold text-[#e7debb] transition-all disabled:opacity-70 tracking-wide text-sm shadow-md"
              >
                {saving ? "Saving..." : uploading ? "Uploading..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}