import React, { useEffect, useState } from "react";
import ProfileImage from "../components/common/ProfileImage";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/configStore.hooks";
import Carousel from "../components/ui/Carousel";
import styled from "@emotion/styled";
import { Button, IconButton, Input } from "@mui/material";
import {
  CheckRounded,
  CloseRounded,
  EditOutlined,
  HowToRegRounded,
  PersonAdd,
  PersonAddRounded,
  PlayArrowRounded,
} from "@mui/icons-material";
import onAirOn from "../assets/img/onair_turnon.png";
import onAirOff from "../assets/img/onair_turnoff.png";
import InfiniteScroll from "../components/ui/InfiniteScroll";
import FeedList from "../components/feed/FeedList";
import {
  getIsSubscribeAction,
  getAboutMeAction,
  subscribeAction,
  unSubscribeAction,
  getFeedAction,
  updateAboutMeAction,
  addAboutMeAction,
  getVideoAction,
  getIsOnAirAction,
} from "../redux/modules/profile/thunk";
import { updateUserAction } from "../redux/modules/user";
import ButtonComp from "../components/common/ButtonComp";
import OnAirBadge from "../components/common/OnAirBadge";
import { fetchFeedData } from "../redux/modules/feed";

const MoreVideoContainer = styled.div`
  margin-top: 60px;
`;

const FeedContainer = styled.div`
  margin-top: 85px;
`;

const VideoContainer = styled.div`
  margin-top: 60px;
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
      & > .info-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        gap: 150px;
        padding: 9px 0px;
        .info {
          display: flex;
          flex-direction: column;
          & > div {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 10px;
            & > h1 {
              margin: 0;
              font-size: 25px;
              font-weight: bold;
            }
            & > button {
              width: 15px;
              height: 15px;
            }
          }
          .id {
            margin-top: 7px;
            color: #808080;
          }
          .subscriber {
            margin-top: 5px;
            color: #808080;
          }
        }
      }
      & > .aboutme-wrapper {
        & > p {
          margin: 15px 0px 0px 0px;
          font-size: 18px;
        }
        & > button {
        }
      }
    }
  }
`;

const ProfilePageLayout = styled.div`
  max-width: 70vw;
  margin: 75px auto 0px;
  div {
    /* border: 1px solid salmon; */
  }
  div.title {
    display: flex;
    align-items: center;
    gap: 20px;
    & > h2 {
      font-family: "Tenada";
      font-size: 23px;
    }
    & > span {
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      font-size: 18px;
      color: #808080;
      cursor: pointer;
      &:hover {
        color: #979797;
      }
    }
  }
`;

export default function ProfilePage(): JSX.Element {
  const { userpk } = useParams() as { userpk: string };
  const loggedUser = useAppSelector((state) => state.user.userData);
  const user = useAppSelector((state) => state.profile.userData);
  const videos = useAppSelector((state) => state.profile.videoData);
  // const videos = useAppSelector((state) => state.video.allVideoList);
  // const feeds = useAppSelector((state) => state.profile.feedData);
  const feeds = useAppSelector((state) => state.feed.feeds);
  const isSubscribing = useAppSelector((state) => state.profile.isSubscribing);
  const isOnAir = useAppSelector((state) => state.profile.userData.isOnAir);
  const dispatch = useAppDispatch();

  const [isMine, setIsMine] = useState<boolean>(false);
  const [isEditNickName, setIsEditNickName] = useState<boolean>(false);
  const [newNickName, setNewNickName] = useState<string>(user.nickName);
  const [isEditAboutMe, setIsEditAboutMe] = useState<boolean>(false);
  const [newAboutMe, setNewAboutMe] = useState<string>(user.aboutMe);
  const [isAboutMeExist, setIsAboutMeExist] = useState<boolean>(false);
  // const [getProfile, setGetProfile] = useState<boolean>(false);
  // const [getisOnAir, setGetisOnAir] = useState<boolean>(false);
  // const [getVideos, setGetVideos] = useState<boolean>(false);
  // const [getFeed, setGetFeed] = useState<boolean>(false);

  // const [isSubscribing, setIsSubscribing] = useState<boolean>(isSub);
  const [moreVideo, setMoreVideo] = useState<boolean>(false);

  const onClickSubscribe = () => {
    if (!isSubscribing) {
      dispatch(subscribeAction(userpk)); // 확인필요
    } else {
      dispatch(unSubscribeAction(userpk));
    }
  };

  const onChangeNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNickName(e.target.value);
  };
  const onClickEditNickName = () => {
    setIsEditNickName((prev) => !prev);
  };
  const onClickSaveNickName = () => {
    dispatch(
      updateUserAction({
        id: loggedUser.id,
        userId: loggedUser.userId,
        nickName: newNickName,
      })
    ).then(() => {
      setIsEditNickName((prev) => !prev);
    });
  };

  const onChangeAboutMe = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAboutMe(e.target.value);
  };
  const onClickEditAboutMe = () => {
    setIsEditAboutMe((prev) => !prev);
  };
  const onClickSaveAboutMe = () => {
    if (newAboutMe === "") {
      alert("자기소개를 입력해주세요");
    } else {
      if (isAboutMeExist) {
        dispatch(
          updateAboutMeAction({ userPK: loggedUser.id, content: newAboutMe })
        ).then(() => {
          setIsEditAboutMe((prev) => !prev);
        });
      } else {
        dispatch(addAboutMeAction(newAboutMe)).then(() => {
          setIsEditAboutMe((prev) => !prev);
          setIsAboutMeExist(true);
        });
      }
    }
  };

  const onClickOnAir = () => {
    // 생방송 시청하러가기
  };

  const onClickMoreVideo = () => {
    setMoreVideo((prev) => !prev);
  };

  useEffect(() => {
    if (user.aboutMe === "") {
      setIsAboutMeExist(false);
    } else {
      setIsAboutMeExist(true);
    }
  }, [user.aboutMe]);

  useEffect(() => {
    if (loggedUser.id === parseInt(userpk)) {
      setIsMine(true);
    } else {
      setIsMine(false);
    }
  }, [loggedUser, userpk]);

  useEffect(() => {
    // 프로필 가져오기
    dispatch(getAboutMeAction(userpk)).then(() => {
      // 생방송 중 여부 가져오기
      // dispatch(getIsOnAirAction(user.userId));

      // 팔로잉 목록 가져오기 (구독중인지확인)
      dispatch(getIsSubscribeAction());
    });

    // 지난 동영상 목록 가져오기
    dispatch(getVideoAction({ userPK: userpk, size: 5, page: 0 }));

    // 피드 목록 가져오기
    // dispatch(getFeedAction(userpk)); // 확인필요
    // dispatch(fetchFeedData());
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
            <ProfileImage
              big={true}
              border={true}
              borderColor={isOnAir ? "#e24553" : "black"}
            />
            {isMine && (
              <Link to="/avatar">
                <IconButton area-label="edit">
                  <EditOutlined />
                </IconButton>
              </Link>
            )}
          </div>
          <div className="profile-info">
            <div className="info-wrapper">
              <div className="info">
                <div>
                  {!isEditNickName && <h1>{user.nickName}</h1>}
                  {isMine && !isEditNickName && (
                    <IconButton area-label="edit" onClick={onClickEditNickName}>
                      <EditOutlined />
                    </IconButton>
                  )}
                  {isEditNickName && (
                    <Input
                      value={newNickName}
                      onChange={onChangeNickName}
                      required
                    />
                  )}
                  {isEditNickName && (
                    <div>
                      <IconButton
                        area-label="edit"
                        onClick={onClickSaveNickName}
                      >
                        <CheckRounded />
                      </IconButton>
                      <IconButton
                        area-label="edit"
                        onClick={onClickEditNickName}
                      >
                        <CloseRounded />
                      </IconButton>
                    </div>
                  )}
                  <OnAirBadge
                    inactiveVisible={true}
                    isOnAir={isOnAir}
                    onClick={onClickOnAir}
                  />
                </div>
                <span className="id">@{user.userId}</span>
                <span className="subscriber">구독자 {user.subscribers}명</span>
              </div>
              {isMine ? (
                <></>
              ) : isSubscribing ? (
                <ButtonComp
                  onClick={onClickSubscribe}
                  text="FOLLOW"
                  width={115}
                  height={39}
                  active={true}
                >
                  <HowToRegRounded />
                </ButtonComp>
              ) : (
                <ButtonComp
                  onClick={onClickSubscribe}
                  text="FOLLOW"
                  width={115}
                  height={39}
                >
                  <PersonAddRounded />
                </ButtonComp>
              )}
            </div>
            <div className="aboutme-wrapper">
              {!isEditAboutMe && user.aboutMe.length !== 0 && (
                <p>{user.aboutMe}</p>
              )}
              {isMine && isAboutMeExist && !isEditAboutMe && (
                <IconButton area-label="edit" onClick={onClickEditAboutMe}>
                  <EditOutlined />
                </IconButton>
              )}
              {isMine && !isAboutMeExist && !isEditAboutMe && (
                <Button
                  variant="contained"
                  size="small"
                  endIcon={<CheckRounded />}
                  onClick={onClickEditAboutMe}
                >
                  자기소개 작성
                </Button>
              )}
              {isMine && isEditAboutMe && (
                <Input value={newAboutMe} onChange={onChangeAboutMe} required />
              )}
              {isMine && isEditAboutMe && (
                <div>
                  <IconButton area-label="edit" onClick={onClickSaveAboutMe}>
                    <CheckRounded />
                  </IconButton>
                  <IconButton area-label="edit" onClick={onClickEditAboutMe}>
                    <CloseRounded />
                  </IconButton>
                </div>
              )}
            </div>
          </div>
        </div>
      </InfoContainer>
      {/* {!moreVideo ? ( */}
      {moreVideo ? (
        <>
          <VideoContainer>
            <div className="title">
              <h2>Videos</h2>
              <span onClick={onClickMoreVideo}>more &gt;</span>
            </div>
            {videos && <Carousel items={videos} />}
          </VideoContainer>
          <FeedContainer>
            <div className="title">
              <h2>Feed</h2>
            </div>
            <InfiniteScroll feed={true} totalPage={0} items={videos!.content} />
            {/* <FeedList feeds={feeds} /> */}
          </FeedContainer>
        </>
      ) : (
        <MoreVideoContainer>
          <div className="title">
            <h2>Videos</h2>
            <span onClick={onClickMoreVideo}>&lt; back</span>
          </div>
          {videos && (
            <InfiniteScroll
              video={true}
              videosWrap={videos}
              totalPage={videos.totalPages}
              items={videos.content}
            />
          )}
        </MoreVideoContainer>
      )}
    </ProfilePageLayout>
  );
}

