import React from "react";
import ReactPlayer from "react-player/youtube";
import { useState, useRef, useEffect } from "react";

// const VideoPlayer: React.FC<{ }> = (props) => {

function VideoPlayer() {
  const videoRef = useRef<any>(null);
  const videoControllerRef = useRef(null);
  const controlsRef = useRef(null);
  const [video, setVideo] = useState("");
  const [timeDisplayFormat, setTimeDisplayFormat] = useState("normal");
  const [played, setPlayed] = useState(0);

  const [state, setState] = useState({
    playing: false, // 재생중인지
    muted: false, // 음소거인지
    controls: false, // 기본으로 제공되는 컨트롤러 사용할건지
    volume: 0.5, // 볼륨크기
    played: 0, // 재생의 정도 (value)
    seeking: false, // 재생바를 움직이고 있는지
    duration: 0, // 전체 시간
  });

  const { playing, muted, volume } = state;

  return (
    <div>
      <h1 style={{ color: "white" }}>현재 재생 시점 : {played} sec</h1>

      <ReactPlayer
        url="https://www.youtube.com/watch?v=11cta61wi0g"
        ref={videoRef}
        // url={video}                    // 서버에서 받아온 video url
        playing={playing} // true = 재생중 / false = 멈춤
        played={played}
        onProgress={(progress) => {
          setPlayed(progress.playedSeconds);
        }}
        // controls={true} // 기본 컨트롤러 사용 여부
        muted={muted} // 음소거인지
        volume={volume} // 소리조절 기능
        // onProgress={progressHandler} // 재생 및 로드된 시점을 반환
        width="100%"
        // height="100%"
      />
    </div>
  );
}

export default VideoPlayer;
