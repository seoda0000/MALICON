import { Routes, Route } from "react-router-dom";
import "./App.css";

import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/*" element={<HomePage />} />
    </Routes>
  );
}

export default App;
