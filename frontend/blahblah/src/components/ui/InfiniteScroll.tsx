import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import { VideoType } from "../../model/video/VideoType";
import { ProfileVideoType } from "../../model/profile/profileVideoType";
import VideoCard from "../video/VideoCard";
import { FeedType } from "../../model/feed/feedType";
import { ProfileFeedType } from "../../model/profile/profileFeedType";
import FeedListItem from "../feed/FeedListItem";

type UserType = {
  avatar: string;
  email: string;
  first_name: string;
  id: number;
  last_name: number;
};

type UsersType = {
  data: UserType[];
  page: number;
  total_pages: number;
};

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
  items?:
    | VideoType[]
    | ProfileVideoType[]
    | FeedType[]
    | ProfileFeedType[]
    | null;
};

export default function InfiniteScroll({
  video = false,
  feed = false,
  items,
}: InfiniteScrollPropsType): JSX.Element {
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    totalPage: 1,
  });
  const [users, setUsers] = useState<UsersType>();
  // (1)
  const [target, setTarget] = useState<Element | null>(null);

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

  useEffect(() => {
    const instance = axios.get<UsersType>(
      `https://reqres.in/api/users?page=${pageInfo.page}`
    );
    instance.then((response) => {
      if (response.status === 200) {
        setUsers((prev) => {
          if (prev && prev.data?.length > 0) {
            return {
              ...response.data,
              data: [...prev.data, ...response.data.data],
            };
          }
          return response.data;
        });

        setPageInfo((prev) => ({
          ...prev,
          totalPage: response.data.total_pages,
        }));
      }
    });
  }, [pageInfo.page]);

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

  return (
    <InfiniteScrollContainer>
      <ul>
        {items?.map((item, idx) => (
          <li key={item.id} ref={items?.length - 1 === idx ? setTarget : null}>
            {video && (
              <VideoCard
                nth={idx}
                video={item as VideoType | ProfileVideoType}
              />
            )}
            {feed && <FeedListItem feed={item as FeedType | ProfileFeedType} />}
          </li>
        ))}
      </ul>
    </InfiniteScrollContainer>
  );
}

