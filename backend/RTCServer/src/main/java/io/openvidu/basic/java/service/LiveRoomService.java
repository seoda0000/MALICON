package io.openvidu.basic.java.service;

import io.openvidu.basic.java.dto.LiveRoomDto;
import io.openvidu.basic.java.dto.UserDto;
import io.openvidu.basic.java.dto.request.CreateRoomDto;
import io.openvidu.basic.java.dto.request.RoomUpdateDto;
import io.openvidu.basic.java.redis.entity.LiveRoomEntity;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.Recording;
import org.springframework.stereotype.Service;

import java.util.List;

public interface LiveRoomService {
    public LiveRoomEntity saveRoom(CreateRoomDto roomDto, UserDto userInfo, String sessionId, Recording recording);
    public boolean existBySessionId(String sessionId);
    public boolean deleteRoomBySessionId(String sessionId);
    public boolean updateRoom(String sessionId, RoomUpdateDto roomUpdateDto);
    public LiveRoomEntity findBySessionId(String sessionId);
    public List<LiveRoomDto> getRoomList() throws OpenViduJavaClientException, OpenViduHttpException;
}
