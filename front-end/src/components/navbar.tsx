import { useState } from "react";
import Container from "./container";

const navItems = ["Discover", "About", "Contact us"];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative w-full text-white py-4">
      <div className="max-w-7xl mx-auto">
        <Container direction="horizontal" className="items-center justify-between">
          {/* Logo */}
          <a href="#" className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Portfolio
          </a>

          {/* Desktop: links + actions (hidden on small screens) */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8 text-base font-medium">
              {navItems.map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-gray-300 transition-colors duration-150">
                    {item}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4 text-sm font-medium">
              <a
                href="#"
                className="bg-[#F44336] hover:bg-[#d32f2f] text-white px-4 py-2 rounded-sm transition-colors duration-150 font-semibold"
              >
                Create My Portfolio
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors duration-150">
                login
              </a>
            </div>
          </div>

          {/* Hamburger (small screens only) */}
          <button
            type="button"
            className="md:hidden text-white focus:outline-none"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </Container>
      </div>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        className={`md:hidden absolute left-0 right-0 top-full z-50 px-4 sm:px-6 transition-all duration-200 origin-top ${
          isOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"
        }`}
      >
        <div className="bg-black/80 backdrop-blur-md rounded-md p-5 flex flex-col gap-4 text-base font-medium">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              onClick={() => setIsOpen(false)}
              className="hover:text-gray-300 transition-colors duration-150"
            >
              {item}
            </a>
          ))}
          <hr className="border-white/20" />
          <a
            href="#"
            onClick={() => setIsOpen(false)}
            className="bg-[#F44336] hover:bg-[#d32f2f] text-white px-4 py-2 rounded-sm text-center font-semibold transition-colors duration-150"
          >
            Create My Portfolio
          </a>
          <a
            href="#"
            onClick={() => setIsOpen(false)}
            className="text-center hover:text-gray-300 transition-colors duration-150"
          >
            login
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;