import { useState } from "react";
import { NavLink } from "react-router-dom";

const navLinks = [
  { label: "Home", to: "/", end: true },
  { label: "About", to: "/about" },
  { label: "Login", to: "/login" },
  { label: "Sign Up", to: "/signup" },
];

const PublicNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  const navLinkClass = ({ isActive }) =>
    `block rounded-lg px-3 py-2 text-base font-semibold transition-colors duration-200 ${
      isActive
        ? "bg-[#3a553f] text-[#F4EBD0]"
        : "text-[#D6D0B8] hover:bg-[#3a553f] hover:text-[#F4EBD0]"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-[#274330] text-[#F4EBD0] shadow-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold sm:text-3xl">RLZone</h1>
          <p className="text-sm text-[#D6D0B8] sm:text-base">Anime / Ghibli Collection</p>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          onClick={toggleMenu}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#3d593e] bg-[#2f5038]/90 text-[#E8DFC3] transition-colors duration-200 hover:bg-[#356041] focus:outline-none focus:ring-2 focus:ring-[#E8DFC3] md:hidden"
        >
          <span className="sr-only">Menu</span>
          <div className="relative flex h-5 w-5 items-center justify-center">
            <span
              className={`absolute block h-0.5 w-full rounded-full bg-current transition-all duration-300 ${
                isOpen ? "rotate-45" : "-translate-y-1.5"
              }`}
            />
            <span
              className={`absolute block h-0.5 w-full rounded-full bg-current transition-opacity duration-300 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute block h-0.5 w-full rounded-full bg-current transition-all duration-300 ${
                isOpen ? "-rotate-45" : "translate-y-1.5"
              }`}
            />
          </div>
        </button>

        <ul className="hidden items-center gap-8 text-sm font-semibold md:flex">
          {navLinks.map(({ label, to, end }) => (
            <li key={label}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  `pb-1 border-b-2 transition-all duration-300 ${
                    isActive
                      ? "border-[#E8DFC3] text-[#F4EBD0]"
                      : "border-transparent text-[#D6D0B8] hover:border-[#E8DFC3] hover:text-[#F4EBD0]"
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div
        className={`md:hidden overflow-hidden bg-[#274330] transition-[max-height,opacity] duration-300 ${
          isOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="space-y-2 border-t border-[#3d593e] px-5 pb-4 pt-4">
          {navLinks.map(({ label, to, end }) => (
            <li key={label}>
              <NavLink to={to} end={end} onClick={closeMenu} className={navLinkClass}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default PublicNavbar;