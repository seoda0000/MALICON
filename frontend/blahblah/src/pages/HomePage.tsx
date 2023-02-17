import { Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout";
import MainPage from "./MainPage";
import FeedPage from "./FeedPage";
import TutorialPage from "./TutorialPage";
import FeedBackupPage from "./FeedBackupPage";
import AvatarPage from "./AvatarPage";
import ProfilePage from "./ProfilePage";
import VideoPage from "./VideoPage";

// const MainPage = lazy(() => import("./MainPage"));
// const FeedPage = lazy(() => import("./FeedPage"));
// const TutorialPage = lazy(() => import("./TutorialPage"));
// const FeedBackupPage = lazy(() => import("./FeedBackupPage"));
// const AvatarPage = lazy(() => import("./AvatarPage"));
// const ProfilePage = lazy(() => import("./ProfilePage"));
// const VideoPage = lazy(() => import("./VideoPage"));

function HomePage() {
  return (
    <div>
      <Layout>
        {/* <Suspense fallback={<LoadingPage />}> */}
        <Routes>
          <Route path="/main" element={<MainPage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/tutorial" element={<TutorialPage />} />
          <Route path="/test" element={<FeedBackupPage />} />
          <Route path="/avatar" element={<AvatarPage />} />
          <Route path="/video/:videoId" element={<VideoPage />} />
          <Route path="/profile/:userpk" element={<ProfilePage />} />
        </Routes>
        {/* </Suspense> */}
      </Layout>
    </div>
  );
}
export default HomePage;
