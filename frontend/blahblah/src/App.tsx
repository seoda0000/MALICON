import { Routes, Route } from "react-router-dom";
import "./App.css";

import MainPage from "./pages/MainPage";
// import LandingPage from "./pages/LandingPage";
import FeedPage from "./pages/FeedPage";
import TutorialPage from "./pages/TutorialPage";

import Layout from "./components/layout/Layout";

function App() {
  return (
    // <BrowserRouter>
    <Layout>
      <Routes>
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/" element={<MainPage />} />
        <Route path="/tutorial" element={<TutorialPage />} />
        <Route path="/feed" element={<FeedPage />} />
      </Routes>
    </Layout>
    // </BrowserRouter>
  );
}

export default App;
