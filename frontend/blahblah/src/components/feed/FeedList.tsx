import FeedListItem from "./FeedListItem";
import { FeedType } from "../../model/feed/feedType";
import React from "react";
import { ProfileFeedType } from "../../model/profile/profileFeedType";

const FeedList: React.FC<{ feeds: FeedType[] | ProfileFeedType[] }> = (
  props
) => {
  return (
    <div>
      {props.feeds.length !== 0 ? (
        props.feeds.map((feed) => <FeedListItem feed={feed} key={feed.id} />)
      ) : (
        <div>피드가 없습니다.</div>
      )}
    </div>
  );
};

export default FeedList;

