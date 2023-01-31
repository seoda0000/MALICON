import React, { useState } from "react";
import ProfileImage from "../components/auth/ProfileImage";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../redux/configStore.hooks";
import Carousel from "../components/ui/Carousel";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { CheckRounded, PersonAdd } from "@mui/icons-material";
import onAirOn from "../assets/img/onair_turnon.png";
import onAirOff from "../assets/img/onair_turnoff.png";
import InfiniteScroll from "../components/ui/InfiniteScroll";

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
  const { userid } = useParams();
  const user = useAppSelector((state) => state.user.userData);
  console.log(userid);

  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const onClickFollow = () => {
    setIsFollowing((prev) => !prev);
  };

  //   useEffect(() => {
  //     console.log(userid);
  //   }, []);
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
                <h1>닉넴나싸피</h1>
                <span className="id">@ssafy12</span>
                <span className="follower">구독자 15명</span>
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
            <p>자기소개를 뭐 닉네임은 닉넴나싸피 나를 팔로우해라!</p>
          </div>
        </div>
        {/* 티켓박스 */}
        <div className="ticket-box">
          {/* 라방중 */}
          <img src={onAirOn} alt="onair_on" />
          {/* 라방아님 */}
          {/* <img src={onAirOff} alt="onair_off" /> */}
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

