import { Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout";
import FeedPage from "./FeedPage";
import MainPage from "./MainPage";
import TutorialPage from "./TutorialPage";
import AvatarPage from "./AvatarPage";
import FaceapiSamplePage from "./FaceapiSamplePage";
import ProfilePage from "./ProfilePage";

function HomePage() {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/main" element={<MainPage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/tutorial" element={<TutorialPage />} />
          <Route path="/avatar" element={<AvatarPage />} />
          <Route path="/faceapi" element={<FaceapiSamplePage />} />
          <Route path="/profile/:userid" element={<ProfilePage />} />
        </Routes>
      </Layout>
    </div>
  );
}
export default HomePage;

