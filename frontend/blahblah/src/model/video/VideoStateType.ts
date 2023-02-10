import { VideoType } from "./VideoType";
import { VideoDetailType } from "./VideoDetailType";
export type VideoStateType = {
  allVideoList: VideoType[];
  followingVideoList: VideoType[];
  currentVideo: VideoDetailType;
};
