import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Camera } from "lucide-react"; // Inimport si Camera icon

import UserNavbar from "../../components/layout/UserNavbar";
import { useAuth } from "../../contexts/AuthContext";
import { getCurrentUserProfile, updateUserProfile, uploadProfilePicture } from "../../services/userService";

function UserProfile() {
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
      setPreviewImage(data.profile_image ? `http://localhost:5000/uploads/profiles/${data.profile_image}` : "");
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
        return;
      }
      setError("Unable to load your profile right now.");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    try {
      const response = await updateUserProfile(form);
      setProfile((prev) => ({ ...prev, ...form }));
      setMessage(response.message || "Profile updated successfully.");
      await loadProfile();

      // 📢 I-dispatch ang event para mag-trigger ng update sa Navbar
      window.dispatchEvent(new CustomEvent("profileUpdated"));

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

      // 📢 I-dispatch din dito para sa bagong upload na picture sa Navbar
      window.dispatchEvent(new CustomEvent("profileUpdated"));

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
      <div className="min-h-screen bg-[#27452f] text-[#e7debb] flex items-center justify-center">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#27452f] font-montserrat text-[#e7debb]">
      <UserNavbar />

      <div className="bg-[#27452f] border-b py-12 px-6 md:px-16">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-8 text-center sm:text-left">
            
            {/* 📸 USER PROFILE PIC WITH HOVER CAMERA OVERLAY */}
            <label className="group relative w-36 h-36 bg-black rounded-full flex items-center justify-center overflow-hidden shadow-lg cursor-pointer border border-[#e7debb]/20">
              {previewImage ? (
                <img src={previewImage} alt="Profile preview" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
              ) : (
                <svg className="w-24 h-24 text-white mt-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}

              {/* Hover Dark Overlay at Camera Icon */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-1 transition-opacity duration-300">
                <Camera size={24} className="text-[#e7debb] animate-bounce" />
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#e7debb]">Upload</span>
              </div>

              <input type="file" accept="image/jpeg,image/png,image/webp,image/jpg" className="hidden" onChange={handleImageChange} />
            </label>

            <div>
              <h2 className="text-4xl md:text-5xl font-bold font-serif tracking-wide">
                {profile?.first_name} {profile?.last_name}
              </h2>
              <p className="mt-2 text-[#e7debb]/80">{profile?.role_name || profile?.role}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 border border-[#e7debb] bg-[#27452f] text-[#e7debb] hover:bg-[#e7debb] hover:text-[#1a3020] px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 shadow-md"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </div>

      <div className="p-6 md:p-12 max-w-7xl mx-auto">
        <div className="rounded-2xl border border-[#e7debb]/20 bg-[#36573e]/70 p-6 md:p-8">
          <h3 className="text-xl md:text-2xl font-bold font-serif mb-6 tracking-wide">Profile Details</h3>

          {message ? <p className="mb-4 rounded-lg bg-emerald-950/40 px-3 py-2 text-sm text-emerald-100">{message}</p> : null}
          {error ? <p className="mb-4 rounded-lg bg-red-950/40 px-3 py-2 text-sm text-red-100">{error}</p> : null}

          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <input type="text" name="first_name" value={form.first_name} onChange={handleChange} placeholder="First name" className="rounded-xl bg-[#27452f] px-4 py-3 text-[#e7debb] outline-none ring-1 ring-[#e7debb]/20" />
            <input type="text" name="last_name" value={form.last_name} onChange={handleChange} placeholder="Last name" className="rounded-xl bg-[#27452f] px-4 py-3 text-[#e7debb] outline-none ring-1 ring-[#e7debb]/20" />
            <input type="text" name="username" value={form.username} onChange={handleChange} placeholder="Username" className="rounded-xl bg-[#27452f] px-4 py-3 text-[#e7debb] outline-none ring-1 ring-[#e7debb]/20" />
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" className="rounded-xl bg-[#27452f] px-4 py-3 text-[#e7debb] outline-none ring-1 ring-[#e7debb]/20" />

            <div className="md:col-span-2">
              <button type="submit" disabled={saving || uploading} className="rounded-full bg-[#27452f] px-6 py-3 font-semibold text-[#e7debb] transition hover:bg-[#1f3b26] disabled:opacity-70">
                {saving ? "Saving..." : uploading ? "Uploading..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;