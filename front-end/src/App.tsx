import "./App.css";
import heroBg from "./assets/hero-bg.jpg";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import SearchBar from "./components/searchBar";

function App() {
  return (
    <>
    <section
      className="w-full min-h-[500px] md:min-h-[600px] bg-slate-900"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Navbar />
      <Hero />
    </section>
    <SearchBar />
    </>
  );
}

export default App;