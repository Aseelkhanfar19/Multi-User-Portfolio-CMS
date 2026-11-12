const quickLinks = ["FAQ", "Privacy Policy", "Terms of Service", "Support"];

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
      <defs>
        <linearGradient id="ig-grad" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#FEDA75" />
          <stop offset="0.35" stopColor="#FA7E1E" />
          <stop offset="0.6" stopColor="#D62976" />
          <stop offset="1" stopColor="#4F5BD5" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#ig-grad)" />
      <rect x="5" y="5" width="14" height="14" rx="4" fill="none" stroke="#fff" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.3" fill="none" stroke="#fff" strokeWidth="1.8" />
      <circle cx="16.4" cy="7.6" r="1" fill="#fff" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
      <rect width="24" height="24" rx="3" fill="#0A66C2" />
      <rect x="5" y="9" width="3" height="10" fill="#fff" />
      <circle cx="6.5" cy="6" r="1.7" fill="#fff" />
      <path d="M11 9h3v1.4c.5-.9 1.6-1.6 3-1.6 2.6 0 3 1.7 3 3.9V19h-3v-5.3c0-1.2-.1-2.2-1.5-2.2S14 12.5 14 13.6V19h-3z" fill="#fff" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#25D366" />
      <circle cx="12" cy="11.5" r="6.3" fill="none" stroke="#fff" strokeWidth="1.8" />
      <path d="M6.2 18.2l.9-3.2 2.3 2.3z" fill="#fff" />
      <path d="M9.5 8.8c-.3.6-.2 1.6.9 3s2.2 2 3 2.1c.6.1 1.2-.3 1.4-.8l-1.2-.9-.7.5c-.6-.3-1.4-1-1.8-1.8l.5-.7-.9-1.2z" fill="#fff" />
    </svg>
  );
}

const socials = [
  { name: "Instagram", href: "#", Icon: InstagramIcon },
  { name: "LinkedIn", href: "#", Icon: LinkedInIcon },
  { name: "WhatsApp", href: "#", Icon: WhatsAppIcon },
];

function Footer() {
  return (
    <footer className="w-full bg-[#080B0E] text-white py-12 sm:py-16">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <h2 className="text-center text-3xl sm:text-4xl font-extrabold tracking-tight mb-10 sm:mb-14">
          Portfolio
        </h2>

        {/* Columns: 1 col on mobile, 2 on sm, 3 on lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center sm:text-left">
          {/* About us */}
          <div className="flex flex-col gap-4 items-center sm:items-start sm:col-span-2 lg:col-span-1">
            <h3 className="text-xl sm:text-2xl font-light">About us</h3>
            <p className="text-sm text-gray-300 leading-relaxed max-w-sm">
              Notwithstanding that the structure of the arguments and claims cannot be developed
              under such circumstances. It is undeniable that the unification of the integration
              prospects provides a deep insight into The Index of Professional Bounce
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-col gap-4 items-center sm:items-start lg:items-center">
            <div className="flex flex-col gap-4 items-center sm:items-start">
              <h3 className="text-xl sm:text-2xl font-light">Quick Links</h3>
              <ul className="flex flex-col gap-2 text-sm sm:text-base font-medium">
                {quickLinks.map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-gray-300 transition-colors duration-150">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Follow us */}
          <div className="flex flex-col gap-4 items-center sm:items-start lg:items-end">
            <div className="flex flex-col gap-4 items-center sm:items-start">
              <h3 className="text-xl sm:text-2xl font-light">Follow Us</h3>
              <div className="flex items-center gap-4">
                {socials.map(({ name, href, Icon }) => (
                  <a
                    key={name}
                    href={href}
                    aria-label={name}
                    className="hover:opacity-80 transition-opacity duration-150"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider + copyright */}
        <hr className="max-w-2xl mx-auto border-gray-600 mt-12 sm:mt-16" />
        <p className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-300 mt-8">
          <span
            aria-hidden="true"
            className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white text-black text-xs font-bold"
          >
            C
          </span>
          Copyright, All Rights Reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;