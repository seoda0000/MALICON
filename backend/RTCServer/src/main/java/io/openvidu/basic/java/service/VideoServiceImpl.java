package io.openvidu.basic.java.service;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import io.openvidu.basic.java.controller.exception.CustomException;
import io.openvidu.basic.java.dto.HashTag;
import io.openvidu.basic.java.redis.entity.LiveRoomEntity;
import io.openvidu.basic.java.redis.entity.PreviousVideoEntity;
import io.openvidu.basic.java.redis.entity.UserEntity;
import io.openvidu.basic.java.redis.entity.VideoHashtagEntity;
import io.openvidu.basic.java.redis.repository.PreviousVideoRepository;
import io.openvidu.basic.java.redis.repository.UserEntityRepository;
import io.openvidu.basic.java.redis.repository.VideoHashtagRepository;
import io.openvidu.java.client.Recording;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.lang.reflect.Type;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class VideoServiceImpl implements VideoService{

    private final PreviousVideoRepository videoRepository;
    private final UserEntityRepository userEntityRepository;


    private final VideoHashtagRepository videoHashtagRepository;

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
                .views((long)0)
                .playTime(recording.getDuration())
                .title(liveRoomEntity.getTitle()) // 일단 방송 제목으로
                .timeStamp(date.toEpochMilli())
                .build();

        Gson gson = new Gson();
        Type type = new TypeToken<List<HashTag>>(){}.getType();

        List<HashTag> hashTags = gson.fromJson(liveRoomEntity.getHashTag(), type);

        PreviousVideoEntity savedPv = videoRepository.save(pv);

        if(savedPv != null)
            hashTags.forEach((ht)->{
                    videoHashtagRepository.save(
                            VideoHashtagEntity.builder()
                                    .previousVideo(savedPv)
                                    .key(ht.getKey())
                                    .build()
                    );}
            );

        return savedPv != null;
    }
}
