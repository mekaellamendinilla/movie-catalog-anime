import { NavLink, Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import {
  Menu,
  X,
  User,
  Heart,
  Bookmark,
  Home,
} from "lucide-react";

import { getCurrentUserProfile } from "../../services/userService";

export default function UserNavbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Ginawang callback para magamit muli ng event listener nang walang infinite render loops
  const loadProfile = useCallback(async () => {
    try {
      const profile = await getCurrentUserProfile();
      setUser(profile);
    } catch (err) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    loadProfile();

    // 📡 Makinig sa 'profileUpdated' event kapag binago ang data sa kabilang component
    window.addEventListener("profileUpdated", loadProfile);

    // Linisin ang event listener kapag nag-unmount ang component
    return () => {
      window.removeEventListener("profileUpdated", loadProfile);
    };
  }, [loadProfile]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const displayName = user?.username || user?.first_name || "User";
  const profileImage = user?.profile_image;
  const profileImageUrl = profileImage
    ? `${import.meta.env.VITE_API_URL}/uploads/profiles/${profileImage}`
    : null;

  return (
    <header className="sticky top-0 z-50 bg-[#27452f] border-b border-[#e7debb]/10">
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">

        {/* Logo */}
        <div>
          <h1 className="font-playfair text-4xl font-bold text-[#e7debb]">
            RLZone
          </h1>
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#e7debb]/80 font-montserrat">
            Anime / Ghibli Collection
          </p>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {/* Home Link */}
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `font-montserrat text-sm font-semibold border-b-2 pb-1 transition flex items-center gap-2 ${
                isActive
                  ? "border-[#e7debb] text-[#e7debb]"
                  : "border-transparent text-[#e7debb]/80 hover:text-[#e7debb] hover:border-[#e7debb]"
              }`
            }
          >
            <Home size={18} />
            <span>Home</span>
          </NavLink>

          {/* Favorites Link */}
          <NavLink
            to="/favorite"
            className={({ isActive }) =>
              `font-montserrat text-sm font-semibold border-b-2 pb-1 transition flex items-center gap-2 ${
                isActive
                  ? "border-[#e7debb] text-[#e7debb]"
                  : "border-transparent text-[#e7debb]/80 hover:text-[#e7debb] hover:border-[#e7debb]"
              }`
            }
          >
            <Heart size={18} />
            <span>Favorites</span>
          </NavLink>

          {/* Watchlist Link */}
          <NavLink
            to="/watchlist"
            className={({ isActive }) =>
              `font-montserrat text-sm font-semibold border-b-2 pb-1 transition flex items-center gap-2 ${
                isActive
                  ? "border-[#e7debb] text-[#e7debb]"
                  : "border-transparent text-[#e7debb]/80 hover:text-[#e7debb] hover:border-[#e7debb]"
              }`
            }
          >
            <Bookmark size={18} />
            <span>Watchlist</span>
          </NavLink>
        </div>

        {/* Right Side - User Profile Only */}
        <div className="hidden md:flex items-center gap-3">
          <Link 
            to="/profile" 
            className="flex items-center gap-2 text-[#e7debb] hover:opacity-80 transition"
          >
            <div className="w-10 h-10 rounded-full border border-[#e7debb] overflow-hidden flex items-center justify-center bg-[#36573e]">
              {profileImageUrl ? (
                <img src={profileImageUrl} alt={displayName} className="w-full h-full object-cover" />
              ) : (
                <User size={20} />
              )}
            </div>
            <span className="font-montserrat text-sm font-semibold">
              {loading ? "Loading..." : displayName}
            </span>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-[#e7debb]"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>

      </nav>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden bg-[#27452f] border-t border-[#e7debb]/10">
          <div className="px-6 py-6 space-y-5">
            {/* Mobile Home Link */}
            <NavLink
              to="/home"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 text-[#e7debb] font-semibold"
            >
              <Home size={20} />
              Home
            </NavLink>

            {/* Mobile Favorites Link */}
            <NavLink
              to="/favorite"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 text-[#e7debb] font-semibold"
            >
              <Heart size={20} />
              Favorites
            </NavLink>

            {/* Mobile Watchlist Link */}
            <NavLink
              to="/watchlist"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 text-[#e7debb] font-semibold"
            >
              <Bookmark size={20} />
              Watchlist
            </NavLink>

            {/* Mobile User Profile Link */}
            <div className="border-t border-[#e7debb]/10 pt-3">
              <NavLink
                to="/profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 text-[#e7debb] font-semibold"
              >
                <div className="w-8 h-8 rounded-full border border-[#e7debb] overflow-hidden flex items-center justify-center bg-[#36573e]">
                  {profileImageUrl ? (
                    <img src={profileImageUrl} alt={displayName} className="w-full h-full object-cover" />
                  ) : (
                    <User size={18} />
                  )}
                </div>
                <span>{loading ? "Loading..." : displayName}</span>
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}