import { Avatar } from "@mui/material";
import { createAvatar } from "@dicebear/core";
import React from "react";
import { personas } from "@dicebear/collection";
import { useAppSelector } from "../../redux/configStore.hooks";
import styled from "@emotion/styled";
import { SubscriberType } from "../../model/subscribe/subscriberType";
import { useNavigate } from "react-router-dom";

const ItemContainer = styled.li`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  margin-bottom: 18px;
  & > span {
    font-size: 17px;
  }
  &:hover {
    cursor: pointer;
  }
`;

export default function SubscriberItem({
  item,
}: {
  item: SubscriberType;
}): JSX.Element {
  const navigator = useNavigate();

  const dataUri = createAvatar(personas, {
    ...JSON.parse(item.avatar),
    backgroundColor: ["ffdfbf"],
  }).toDataUriSync();

  const onClickItem = () => {
    navigator(`/profile/${item.userPK}`);
  };

  return (
    <ItemContainer onClick={onClickItem}>
      <Avatar
        src={dataUri}
        alt="profile_img"
        sx={{ width: "45px", height: "45px" }}
      />
      <span>{item.nickName}</span>
    </ItemContainer>
  );
}

