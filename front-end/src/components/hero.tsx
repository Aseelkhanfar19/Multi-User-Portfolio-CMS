function Hero() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
      <div className="max-w-2xl lg:ml-24 flex flex-col gap-6 text-white">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
          Your work deserves to be seen.
        </h1>

        <p className="text-base sm:text-lg text-gray-200 max-w-md">
          Create your portfolio, showcase your projects, and share your journey.
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-10 mt-4">
          <a href="#" className="font-semibold underline underline-offset-2 hover:text-gray-300 transition-colors duration-150">
            Login to My Porfolio
          </a>

          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 bg-[#F44336] hover:bg-[#d32f2f] text-white px-6 py-3 rounded-sm font-medium transition-colors duration-150"
          >
            Create New Account
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Hero;