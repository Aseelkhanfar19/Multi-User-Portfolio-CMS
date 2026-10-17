import profilePic from "../assets/profilePic.webp"
function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex flex-col md:flex-row items-center gap-12">

        {/* Info */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Software Developer
          </h1>

          <p className="mt-4 text-base md:text-lg text-gray-400 leading-relaxed">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Labore, dolor. Ut quod dolore ad adipisci corrupti omnis
            atque facere ipsa!
          </p>

          <a
            href="#contact"
            className="inline-block mt-6 px-6 py-3 bg-white text-gray-900 font-medium rounded-lg transition-colors duration-200 hover:bg-gray-800 hover:text-white"
          >
            Contact me
          </a>
        </div>

        {/* Photo */}
        <div className="hidden flex-1 flex justify-center md:justify-end md:flex">
          <img
            src={profilePic}
            alt="Profile"
            className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-2xl"
          />
        </div>

      </div>
    </section>
  );
}

export default Hero;

