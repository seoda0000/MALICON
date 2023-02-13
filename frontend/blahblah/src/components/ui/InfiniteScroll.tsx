import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import { VideoType } from "../../model/video/VideoType";
import { ProfileVideoType } from "../../model/profile/profileVideoType";
import VideoCard from "../video/VideoCard";
import { FeedType } from "../../model/feed/feedType";
import { ProfileFeedType } from "../../model/profile/profileFeedType";
import FeedListItem from "../feed/FeedListItem";
import { VideoWrapType } from "../../model/profile/videoWrapType";
import { useAppDispatch, useAppSelector } from "../../redux/configStore.hooks";
import {
  getFeedAction,
  getVideoAction,
  GetVideoActionPropsType,
} from "../../redux/modules/profile";
import { useParams } from "react-router-dom";
import { FeedWrapType } from "../../model/profile/feedWrapType";
import { AsyncThunk, AsyncThunkAction } from "@reduxjs/toolkit";

let isInitial = true;
const InfiniteScrollContainer = styled.div`
  & > ul {
    display: flex;
    flex-direction: column;
    width: 90%;
    gap: 50px;
    & > li {
      list-style: none;
      width: 100%;
    }
  }
`;

type InfiniteScrollPropsType = {
  video?: boolean;
  feed?: boolean;
  feedPage?: boolean;
  actionFunc: any;
  itemsWrap?: VideoWrapType | FeedWrapType;
  totalPage: number;
};

export default function InfiniteScroll({
  video = false,
  feed = false,
  feedPage = false,
  actionFunc,
  itemsWrap,
  totalPage,
}: InfiniteScrollPropsType): JSX.Element {
  const { userpk } = useParams() as { userpk: string };
  const videos = useAppSelector((state) => state.profile.videoData);
  const profileFeeds = useAppSelector((state) => state.profile.feedData);
  const feedFeeds = useAppSelector((state) => state.feed.feedData);
  const newest = useAppSelector((state) => state.feed.newest);
  // const feedFeeds = itemsWrap;
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    totalPage: totalPage,
  });
  // const [itemArr, setItemArr] = useState<
  //   VideoType[] | ProfileVideoType[] | FeedType[] | ProfileFeedType[]
  // >([]);
  const [itemArr, setItemArr] = useState<
    VideoType[] | ProfileVideoType[] | FeedType[] | ProfileFeedType[]
  >([]);
  // (1)
  const [target, setTarget] = useState<Element | null>(null);
  const dispatch = useAppDispatch();

  const updateItemsFunc = () => {
    if (video && videos) {
      let temp: ProfileVideoType[] = [...(itemArr as ProfileVideoType[])];

      videos.content.map((video) => {
        temp = [...temp, video];
        return temp;
      });
      setItemArr(temp);
    } else if (feed && profileFeeds) {
      let temp: ProfileFeedType[] = [...(itemArr as ProfileFeedType[])];

      profileFeeds.content.map((feed) => {
        temp = [...temp, feed];
        return temp;
      });
      setItemArr(temp);
    } else if (feedPage && feedFeeds) {
      console.log("붙이는 데이터입니다", feedFeeds);
      let temp: ProfileFeedType[] = [...(itemArr as ProfileFeedType[])];

      feedFeeds.content.map((feed) => {
        temp = [...temp, feed];
        return temp;
      });
      setItemArr(temp);
    }
  };

  // const replaceItemsFunc = () => {
  //   console.log("replace");
  //   if (video && videos) {
  //     let temp: ProfileVideoType[] = [];

  //     videos.content.map((video) => {
  //       temp = [...temp, video];
  //       return temp;
  //     });
  //     setItemArr(temp);
  //   } else if (feed && profileFeeds) {
  //     let temp: ProfileFeedType[] = [];

  //     profileFeeds.content.map((feed) => {
  //       temp = [...temp, feed];
  //       return temp;
  //     });
  //     setItemArr(temp);
  //   } else if (feedPage && feedFeeds) {
  //     let temp: ProfileFeedType[] = [];

  //     console.log("replace 데이터입니다", feedFeeds);
  //     feedFeeds.content.map((feed) => {
  //       temp = [...temp, feed];
  //       return temp;
  //     });
  //     setItemArr(temp);
  //   }
  // };

  // (2)
  const handleIntersect = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting) {
        setPageInfo((prev) => {
          console.log("츄츄!", prev.page);
          if (prev.totalPage > prev.page) {
            return {
              ...prev,
              page: prev.page + 1,
            };
          }
          return prev;
        });
      }
    },
    []
  );
  // const func = async () => {
  //   replaceItemsFunc();
  // };

  // const handleFunc = async () => {
  //   // setItemArr((itemArr) => []);
  //   await func();
  // };

  // useEffect(() => {
  //   console.log("누가먼저 실행될까요ㄴㄴㄴ");
  //   if (newest !== 0) {
  //     handleFunc();
  //   }
  //   console.log("왜...?");
  // }, [newest]);

  // useEffect(() => {
  //   console.log("나는야 아이템 어레이", itemArr, pageInfo.page);
  // }, [itemArr]);

  // (3)
  useEffect(() => {
    console.log("누가먼저 실행될까요3");
    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0,
      root: null,
    });

    target && observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [handleIntersect, target]);

  useEffect(() => {
    console.log("누가먼저 실행될까요ㅇㅇㅇ");
    if (feedPage) {
      dispatch(actionFunc({ size: 5, page: pageInfo.page })).then(() => {
        console.log("183", pageInfo);
        updateItemsFunc();
      });
    } else {
      dispatch(
        actionFunc({ userPK: userpk, size: 5, page: pageInfo.page })
      ).then(() => {
        console.log("188", pageInfo);
        updateItemsFunc();
      });
    }
  }, [pageInfo.page]);

  useEffect(() => {
    console.log("누가먼저 실행될까요ㅅㅅㅅㅅ");
    window.scrollTo(0, 0);
  }, []);

  return (
    <InfiniteScrollContainer>
      <ul>
        {itemArr.map((item, idx) => (
          <li key={idx} ref={itemArr.length - 1 === idx ? setTarget : null}>
            {video && (
              <VideoCard
                nth={idx}
                video={item as VideoType | ProfileVideoType}
              />
            )}
            {(feed || feedPage) && (
              <FeedListItem feed={item as FeedType | ProfileFeedType} />
            )}
          </li>
        ))}
      </ul>
    </InfiniteScrollContainer>
  );
}
