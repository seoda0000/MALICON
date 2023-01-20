import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";

import MainPage from "./pages/MainPage";
import LandingPage from "./pages/LandingPage";
import FeedPage from "./pages/FeedPage";
import TutorialPage from "./pages/TutorialPage";

import Layout from "./components/layout/Layout";

const isAuthorized = false;

function App() {
  return (
    // <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/tutorial" element={<TutorialPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/feed" element={<FeedPage />} />
      </Routes>
    </Layout>
    // </BrowserRouter>
  );
}

export default App;
