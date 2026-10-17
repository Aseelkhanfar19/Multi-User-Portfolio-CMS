


function Lists(){
      const links = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
  ];
return (
  <div className="relative mx-auto max-w-6xl px-6">
    <ul
      className="
        absolute left-6 right-6 top-1
        z-40
        rounded-2xl border border-gray-200
        bg-white/95 p-3
        shadow-lg backdrop-blur-md
        animate-[slideDown_0.25s_ease-out]
        md:hidden
      "
    >
      {links.map((link) => (
        <li key={link.name}>
          <a
            href={link.href}
            className="
              block rounded-xl px-4 py-3
              text-sm font-medium text-gray-700
              transition-all duration-200
              hover:bg-blue-100 hover:text-blue-600
            "
          >
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

}

export default Lists;