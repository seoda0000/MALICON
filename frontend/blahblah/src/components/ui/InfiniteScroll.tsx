import { useState, useEffect, useCallback } from "react";
import styled from "@emotion/styled";
import { VideoType } from "../../model/video/VideoType";
import { ProfileVideoType } from "../../model/profile/profileVideoType";
import VideoCard from "../video/VideoCard";
import { FeedType } from "../../model/feed/feedType";
import { ProfileFeedType } from "../../model/profile/profileFeedType";
import FeedListItem from "../feed/FeedListItem";
import { useAppDispatch, useAppSelector } from "../../redux/configStore.hooks";
import { useParams } from "react-router-dom";
import EmptyMessage from "../common/EmptyMessage";

const InfiniteScrollContainer = styled.div`
  & > ul {
    display: flex;
    flex-direction: column;
    width: 90%;
    gap: 20px;
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
};

export default function InfiniteScroll({
  video = false,
  feed = false,
  feedPage = false,
  actionFunc,
}: InfiniteScrollPropsType): JSX.Element {
  const { userpk } = useParams() as { userpk: string };
  const getVideos = useAppSelector((state) => state.profile.getVideo);
  const getFeeds = useAppSelector((state) => state.profile.getFeed);
  const getFeedFeeds = useAppSelector((state) => state.feed.getFeed);
  const newest = useAppSelector((state) => state.feed.newest);
  const dispatch = useAppDispatch();

  const [text, setText] = useState<string>("");
  const [target, setTarget] = useState<Element | null>(null);
  const [itemArr, setItemArr] = useState<
    VideoType[] | ProfileVideoType[] | FeedType[] | ProfileFeedType[]
  >([]);
  const [pageInfo, setPageInfo] = useState({
    page: -1,
    totalPage: 0,
  });

  // (1)
  const updateItemsFunc = () => {
    if (feed && getFeeds.data) {
      console.log("이거 두번호출돼?? 왜??");
      let temp: ProfileFeedType[] = [...(itemArr as ProfileFeedType[])];

      getFeeds.data.content.map((feed: ProfileFeedType) => {
        temp = [...temp, feed];
        return temp;
      });
      setItemArr(temp);
    } else if (video && getVideos.data) {
      let temp: ProfileVideoType[] = [...(itemArr as ProfileVideoType[])];

      getVideos.data.content.map((video: ProfileVideoType) => {
        temp = [...temp, video];
        return temp;
      });
      setItemArr(temp);
    } else if (feedPage && getFeedFeeds.data) {
      let temp: ProfileFeedType[] = [...(itemArr as ProfileFeedType[])];

      console.log("새 글 감지 직전", newest);
      if (getFeedFeeds.data.content[0].id === newest) {
        temp = [];
      } else if (newest === 0) {
        temp = [];
      } else {
        temp = [...(itemArr as ProfileFeedType[])];
      }
      getFeedFeeds.data.content.map((feed: ProfileFeedType) => {
        temp = [...temp, feed];
        return temp;
      });
      setItemArr(temp);
    }
  };

  // (2)
  const handleIntersect = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting) {
        setPageInfo((prev) => {
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

  // useEffect(() => {
  //   console.log("새 글 감지", newest);
  //   setPageInfo({
  //     page: 1,
  //     totalPage: totalPage,
  //   });
  //   window.scrollTo(0, 0);

  //   updateItemsFunc();
  // }, [newest]);

  // useEffect(() => {
  //   console.log("아이템 어레이", itemArr, pageInfo.page);
  // }, [itemArr]);

  // (3)
  useEffect(() => {
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
    if (feed && getFeeds.data && pageInfo.page !== -1) {
      setPageInfo((prev) => {
        return {
          ...prev,
          totalPage: getFeeds.data.totalPages,
        };
      });
      updateItemsFunc();
    } else if (video && getVideos.data && pageInfo.page !== -1) {
      setPageInfo((prev) => {
        return {
          ...prev,
          totalPage: getVideos.data.totalPages,
        };
      });
      updateItemsFunc();
    } else if (feedPage && getFeedFeeds.data && pageInfo.page !== -1) {
      setPageInfo((prev) => {
        return {
          ...prev,
          totalPage: getFeedFeeds.data.totalPages,
        };
      });
      updateItemsFunc();
    }
  }, [getFeeds.data, getVideos.data, getFeedFeeds.data]);

  useEffect(() => {
    if (feedPage) {
      dispatch(actionFunc({ size: 5, page: pageInfo.page }));
    } else if (feed || video) {
      dispatch(actionFunc({ userPK: userpk, size: 5, page: pageInfo.page }));
    }
  }, [pageInfo.page]);

  useEffect(() => {
    console.log("무한스크롤 안에서 userpk " + userpk);
    setItemArr([]);
    setPageInfo({ page: 0, totalPage: 0 });
    setText(video ? "지난 영상이 없습니다" : "작성된 피드가 없습니다");
    window.scrollTo(0, 0);
  }, [userpk]);

  return (
    <InfiniteScrollContainer>
      {itemArr.length > 0 ? (
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
      ) : (
        <EmptyMessage text={text} />
      )}
    </InfiniteScrollContainer>
  );
}
