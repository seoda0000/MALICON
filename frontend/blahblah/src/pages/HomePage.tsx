import { Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout";
import FeedPage from "./FeedPage";
import MainPage from "./MainPage";
import TutorialPage from "./TutorialPage";
import AvatarPage from "./AvatarPage";
import ProfilePage from "./ProfilePage";
import FeedBackupPage from "./FeedBackupPage";

function HomePage() {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/main" element={<MainPage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/tutorial" element={<TutorialPage />} />
          <Route path="/test" element={<FeedBackupPage />} />
          <Route path="/avatar" element={<AvatarPage />} />
          <Route path="/profile/:userid" element={<ProfilePage />} />
        </Routes>
      </Layout>
    </div>
  );
}
export default HomePage;
