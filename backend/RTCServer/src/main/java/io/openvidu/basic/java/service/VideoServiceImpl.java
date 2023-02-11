package io.openvidu.basic.java.service;

import io.openvidu.basic.java.controller.exception.CustomException;
import io.openvidu.basic.java.redis.entity.LiveRoomEntity;
import io.openvidu.basic.java.redis.entity.PreviousVideoEntity;
import io.openvidu.basic.java.redis.entity.UserEntity;
import io.openvidu.basic.java.redis.repository.PreviousVideoRepository;
import io.openvidu.basic.java.redis.repository.UserEntityRepository;
import io.openvidu.java.client.Recording;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class VideoServiceImpl implements VideoService{

    private final PreviousVideoRepository videoRepository;
    private final UserEntityRepository userEntityRepository;

    @Override
    public boolean saveVideo(LiveRoomEntity liveRoomEntity, Recording recording, Long userId) {

        Instant date = LocalDateTime.now().toInstant(ZoneOffset.of("+9"));

        UserEntity userEntity = userEntityRepository.findById(userId).orElseThrow(
                ()-> new CustomException(HttpStatus.NOT_FOUND, "해당 유저가 존재하지 않습니다.")
        );

        PreviousVideoEntity pv = PreviousVideoEntity.builder()
                .recordingId(recording.getId())
                .userEntity(userEntity)
                .sessionId(liveRoomEntity.getSessionId())
                .thumbnail(liveRoomEntity.getThumbnail())
                .hashTags(liveRoomEntity.getHashTag())
                .pathUrl(recording.getUrl())
                .playTime(recording.getDuration())
                .title(liveRoomEntity.getTitle()) // 일단 방송 제목으로
                .timeStamp(date.toEpochMilli())
                .build();

        log.info(pv.toString());

        return videoRepository.save(pv) != null;
    }
}
