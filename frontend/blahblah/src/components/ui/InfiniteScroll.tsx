import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styled from "@emotion/styled";

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
    & > li {
      border: 2px solid salmon;
      width: 100%;
      height: 100px;
    }
  }
`;

export default function InfiniteScroll(): JSX.Element {
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
        {users?.data?.map((user, i) => (
          <li
            key={user.id}
            ref={users.data.length - 1 === i ? setTarget : null}
          >
            {user.first_name}
          </li>
        ))}
      </ul>
    </InfiniteScrollContainer>
  );
}

