import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLinkClick = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 bg-[#27452f] border-b border-[#e7debb]/10 w-full">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-4 flex items-center justify-between">

        <div className="flex items-start gap-3">
          <div>
            <h1 className="font-playfair font-bold text-3xl md:text-5xl text-[#e7debb] leading-tight">
              RLZone
            </h1>

            <p className="hidden sm:block text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.4em] text-[#e7debb]/80 uppercase font-montserrat">
              Anime / Ghibli Collection
            </p>
          </div>
        </div>

        <ul className="hidden md:flex items-center gap-6">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `font-montserrat text-sm font-medium transition ${
                  isActive
                    ? "text-[#e7debb] border-b-2 border-[#e7debb]"
                    : "text-[#e7debb]/80 hover:text-[#e7debb]"
                }`
              }
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `font-montserrat text-sm font-medium transition ${
                  isActive
                    ? "text-[#e7debb] border-b-2 border-[#e7debb]"
                    : "text-[#e7debb]/80 hover:text-[#e7debb]"
                }`
              }
            >
              About
            </NavLink>
          </li>
        </ul>

        <div className="md:hidden">
          <button
            aria-label="Toggle menu"
            className="p-2 rounded-md text-[#e7debb] hover:bg-[#27452f]/60"
            onClick={() => setOpen((v) => !v)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      <div
        className={`md:hidden bg-[#27452f] overflow-hidden transition-all duration-300 ${
          open ? "max-h-60" : "max-h-0"
        }`}
      >
        <nav className="px-4 pb-4">
          <ul className="flex flex-col gap-3">
            <li>
              <NavLink
                to="/"
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `block font-montserrat text-base font-medium py-2 ${
                    isActive
                      ? "text-[#e7debb]"
                      : "text-[#e7debb]/80 hover:text-[#e7debb]"
                  }`
                }
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/about"
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `block font-montserrat text-base font-medium py-2 ${
                    isActive
                      ? "text-[#e7debb]"
                      : "text-[#e7debb]/80 hover:text-[#e7debb]"
                  }`
                }
              >
                About
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}