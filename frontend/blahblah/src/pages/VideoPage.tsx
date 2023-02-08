import { useParams } from "react-router-dom";

export default function VideoPage() {
  const { videoId } = useParams() as { videoId: string };
  return (
    <div>
      <h1>저장된 비디오 페이지</h1>
    </div>
  );
}
