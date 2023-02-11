package io.openvidu.basic.java.service;

import io.openvidu.basic.java.dto.UserDto;
import io.openvidu.basic.java.redis.entity.LiveRoomEntity;
import io.openvidu.basic.java.redis.entity.UserEntity;
import io.openvidu.java.client.Recording;

public interface VideoService {
    public boolean saveVideo(LiveRoomEntity liveRoomEntity, Recording recording, Long userId);
}
