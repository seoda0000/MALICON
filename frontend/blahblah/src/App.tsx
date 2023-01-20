import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/Layout";
import MainPage from "./pages/MainPage";
import LandingPage from "./pages/LandingPage";
import FeedPage from "./pages/FeedPage";
import TutorialPage from "./pages/TutorialPage";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/tutorial" element={<TutorialPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/feed" element={<FeedPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
