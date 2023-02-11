package io.openvidu.basic.java.service;

import io.openvidu.basic.java.controller.exception.CustomException;
import io.openvidu.basic.java.dto.LiveRoomDto;
import io.openvidu.basic.java.dto.UserDto;
import io.openvidu.basic.java.dto.request.CreateRoomDto;
import io.openvidu.basic.java.dto.request.RoomUpdateDto;
import io.openvidu.basic.java.redis.entity.LiveRoomEntity;
import io.openvidu.basic.java.redis.repository.LiveRoomRepository;
import io.openvidu.java.client.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class LiveRoomServiceImpl implements LiveRoomService{

    private final LiveRoomRepository liveRoomRepository;
    private final OpenVidu openVidu;

    @Override
    public LiveRoomEntity saveRoom(CreateRoomDto roomDto, UserDto userInfo, String sessionId, Recording recording) {
        String title = roomDto.getTitle();
        String hashTag = roomDto.getHashTag();
        Instant date = LocalDateTime.now().toInstant(ZoneOffset.of("+9"));

        LiveRoomEntity liveRoomEntity = LiveRoomEntity.builder()
                .title(title)
                .streamer(userInfo)
                .startAt(date.toEpochMilli())
                .sessionId(sessionId)
                .hashTag(hashTag)
                .recording(recording)
                .build();

        return liveRoomRepository.save(liveRoomEntity);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean existBySessionId(String sessionId) {
        return liveRoomRepository.existsById(sessionId);
    }

    @Override
    public boolean deleteRoomBySessionId(String sessionId) {
        liveRoomRepository.deleteById(sessionId);
        return true;
    }

    @Override
    public boolean updateRoom(String sessionId, RoomUpdateDto roomUpdateDto) {
        LiveRoomEntity liveRoomEntity = liveRoomRepository.findById(sessionId).orElseThrow(
                ()-> new CustomException(HttpStatus.NOT_FOUND, "존재하지 않는 방송 입니다.")
        );

        String title = roomUpdateDto.getTitle();
        String thumbnail = roomUpdateDto.getThumbnail();

        liveRoomEntity.setTitle(title == null? liveRoomEntity.getTitle():title);
        liveRoomEntity.setThumbnail(thumbnail == null? liveRoomEntity.getThumbnail(): thumbnail);
        return true;
    }

    @Override
    @Transactional(readOnly = true)
    public LiveRoomEntity findBySessionId(String sessionId) {
        return liveRoomRepository.findById(sessionId).orElseThrow(
                ()-> new CustomException(HttpStatus.NOT_FOUND, "세션 정보가 존재하지 않습니다.")
        );
    }

    @Override
    @Transactional(readOnly = true)
    public List<LiveRoomDto> getRoomList() throws OpenViduJavaClientException, OpenViduHttpException {
        List<LiveRoomDto> rooms = new ArrayList<>();
        Iterator<LiveRoomEntity> it = liveRoomRepository.findAll().iterator();


        while(it.hasNext()){
            LiveRoomEntity et = it.next();
            int viewNumber = -31;
            Session session = openVidu.getActiveSession(et.getSessionId());
            if(session != null){
                // 비두 서버의 상태로 업데이트
                // thread safe한지 모르겠음
                session.fetch();
                viewNumber = session.getConnections().size();
            }

            rooms.add(
                    LiveRoomDto.builder()
                            .title(et.getTitle())
                            .sessionId(et.getSessionId())
                            .hashTag(et.getHashTag())
                            .startAt(et.getStartAt())
                            .streamer(et.getStreamer())
                            .viewerNumber(viewNumber)
                            .thumbnail(et.getThumbnail())
                            .build()
            );
        }
        return rooms;
    }
}
