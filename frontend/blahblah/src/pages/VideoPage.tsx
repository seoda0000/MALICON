import { useParams } from "react-router-dom";
import VideoSection from "../components/video/VideoSection";

export default function VideoPage() {
  const { videoId } = useParams();
  return (
    <div>
      <h1>저장된 비디오 페이지</h1>
      <VideoSection />
    </div>
  );
}
