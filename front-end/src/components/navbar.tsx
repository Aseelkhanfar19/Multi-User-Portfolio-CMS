
import { useState } from 'react';
import menuIcon from "../assets/dots.png";
import Lists from './lists';


function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
  ];

  return (
    <div className="relative">
    <nav className="sticky top-0 z-50 px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-gray-200 bg-white/90 px-6 py-3 shadow-sm backdrop-blur-md">

        {/* Logo */}
        <a
          href="#home"
          className="text-xl font-bold tracking-tight text-gray-900"
        >
          Aseel<span className="text-blue-600">Khanfar</span>
        </a>

        {/* Navigation */}
        <ul className="hidden items-center gap-12 md:flex">
          {links.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="text-md font-medium text-gray-600 transition-colors duration-200 hover:text-gray-900"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-blue-600 md:block"
        >
          Let's Talk
        </a>
        <button className='flex w-6 h-6 md:hidden rounded-lg hover:scale-110 transition duration-200' onClick={(e)=>{
          e.stopPropagation();
          setMenuOpen(!menuOpen);
        }
        }>
          <img src={ menuIcon } />
        </button>

      </div>
    </nav>
    {menuOpen && <Lists />}
    </div>
  );
  
}

export default Navbar;