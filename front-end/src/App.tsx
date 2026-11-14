import "./App.css";
import LandingPage from "./pages/landingPage";
import SignUp from "./pages/signup";
import SignIn from "./pages/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;