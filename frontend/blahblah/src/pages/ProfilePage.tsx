import React, { useEffect, useState } from "react";
import ProfileImage from "../components/auth/ProfileImage";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/configStore.hooks";
import Carousel from "../components/ui/Carousel";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { CheckRounded, PersonAdd } from "@mui/icons-material";
import onAirOn from "../assets/img/onair_turnon.png";
import onAirOff from "../assets/img/onair_turnoff.png";
import InfiniteScroll from "../components/ui/InfiniteScroll";
import { getProfileAction } from "../redux/modules/profile/thunk";

const ProfilePageLayout = styled.div`
  max-width: 90%;
  margin: 75px auto 0px;
  div {
    /* border: 1px solid salmon; */
  }
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: flex-start;
  .info-box {
    flex: 1;
    display: flex;
    align-items: center;
    .profile-image {
      margin-right: 25px;
      & > img {
      }
    }
    .profile-info {
      & > div {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        padding: 9px 0px;
        .info {
          display: flex;
          flex-direction: column;
          & > h1 {
            margin: 0;
            font-size: 25px;
            font-weight: bold;
          }
          .id {
            margin-top: 7px;
            color: #808080;
          }
          .follower {
            margin-top: 5px;
            color: #808080;
          }
        }
        & > button {
          height: 30px;
        }
      }
      & > p {
        margin: 15px 0px 0px 0px;
        font-size: 18px;
      }
    }
  }
  .ticket-box {
    margin-left: 50px;
    width: 150px;
    height: 150px;
    & > img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
`;

const VideoContainer = styled.div`
  margin-top: 60px;
`;

const FeedContainer = styled.div`
  margin-top: 85px;
`;

export default function ProfilePage(): JSX.Element {
  const { userid } = useParams() as { userid: string };
  const loggedUser = useAppSelector((state) => state.user.userData);
  const user = useAppSelector((state) => state.profile.userData);
  const dispatch = useAppDispatch();

  // const [getProfile, setGetProfile] = useState<boolean>(false);
  // const [getisOnAir, setGetisOnAir] = useState<boolean>(false);
  // const [getVideos, setGetVideos] = useState<boolean>(false);
  // const [getFeed, setGetFeed] = useState<boolean>(false);

  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const onClickFollow = () => {
    setIsFollowing((prev) => !prev);
  };

  useEffect(() => {
    console.log(userid);
    console.log(loggedUser);

    // 프로필 가져오기
    dispatch(getProfileAction(userid));

    // 팔로잉 목록 가자오기

    // 생방송 중 여부 가져오기

    // 지난 동영상 목록 가져오기

    // 피드 목록 가져오기
  }, []);

  // if (!(getProfile && getisOnAir && getVideos && getFeed))
  //   return <div>loading..</div>;
  // else
  return (
    <ProfilePageLayout>
      {/* 프로필 */}
      <InfoContainer>
        <div className="info-box">
          <div className="profile-image">
            <ProfileImage width={120} height={120} />
          </div>
          <div className="profile-info">
            <div>
              <div className="info">
                <h1>{user.nickName}</h1>
                <span className="id">@{user.userId}</span>
                <span className="follower">구독자 {user.follower}명</span>
              </div>
              {isFollowing && (
                <Button
                  variant="outlined"
                  size="small"
                  endIcon={<CheckRounded />}
                  onClick={onClickFollow}
                >
                  follow
                </Button>
              )}
              {!isFollowing && (
                <Button
                  variant="contained"
                  size="small"
                  endIcon={<PersonAdd />}
                  onClick={onClickFollow}
                >
                  follow
                </Button>
              )}
            </div>
            <p>{user.content}</p>
          </div>
        </div>
        {/* 티켓박스 */}
        <div className="ticket-box">
          {user.isOnAir ? (
            <img src={onAirOn} alt="onair_on" />
          ) : (
            <img src={onAirOff} alt="onair_off" />
          )}
        </div>
      </InfoContainer>
      <VideoContainer>
        <h2>Videos</h2>
        <Carousel />
      </VideoContainer>
      <FeedContainer>
        <h2>Feed</h2>
        <InfiniteScroll />
      </FeedContainer>
    </ProfilePageLayout>
  );
}

