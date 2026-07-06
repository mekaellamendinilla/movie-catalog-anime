import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  Menu,
  X,
  User,
  LogOut,
  Heart,
  Bookmark,
  ChevronDown,
} from "lucide-react";

export default function UserNavbar() {
  const [open, setOpen] = useState(false);

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

        <div className="hidden md:flex items-center gap-12">

          <NavLink
            to="/"
            className={({ isActive }) =>
              `font-montserrat text-sm font-semibold border-b-2 pb-1 transition ${
                isActive
                  ? "border-[#e7debb] text-[#e7debb]"
                  : "border-transparent text-[#e7debb]/80 hover:text-[#e7debb]"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `font-montserrat text-sm font-semibold border-b-2 pb-1 transition ${
                isActive
                  ? "border-[#e7debb] text-[#e7debb]"
                  : "border-transparent text-[#e7debb]/80 hover:text-[#e7debb]"
              }`
            }
          >
            Favorites
          </NavLink>

          <NavLink
            to="/watchlist"
            className={({ isActive }) =>
              `font-montserrat text-sm font-semibold border-b-2 pb-1 transition ${
                isActive
                  ? "border-[#e7debb] text-[#e7debb]"
                  : "border-transparent text-[#e7debb]/80 hover:text-[#e7debb]"
              }`
            }
          >
            Watchlist
          </NavLink>

        </div>

        {/* Right */}

        <div className="hidden md:flex items-center gap-6">

          <button className="flex items-center gap-2 text-[#e7debb] hover:opacity-80 transition">

            <div className="w-10 h-10 rounded-full border border-[#e7debb] flex items-center justify-center">
              <User size={20} />
            </div>

            <span className="font-montserrat text-sm">
              Ella Bading
            </span>

            <ChevronDown size={18} />

          </button>

          <button className="border border-[#e7debb] text-[#e7debb] rounded-xl px-5 py-2 flex items-center gap-2 hover:bg-[#e7debb] hover:text-[#27452f] transition">

            <LogOut size={18} />

            Logout

          </button>

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

            <NavLink
              to="/"
              onClick={() => setOpen(false)}
              className="block text-[#e7debb]"
            >
              Home
            </NavLink>

            <NavLink
              to="/favorites"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 text-[#e7debb]"
            >
              <Heart size={20} />
              Favorites
            </NavLink>

            <NavLink
              to="/watchlist"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 text-[#e7debb]"
            >
              <Bookmark size={20} />
              Watchlist
            </NavLink>

            <NavLink
              to="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 text-[#e7debb]"
            >
              <User size={20} />
              Ella Bading
            </NavLink>

            <button className="flex items-center gap-3 text-[#e7debb]">

              <LogOut size={20} />

              Logout

            </button>

          </div>

        </div>

      )}

    </header>
  );
}