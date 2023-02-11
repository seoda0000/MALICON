package io.openvidu.basic.java.service;

import io.openvidu.basic.java.dto.UserDto;
import io.openvidu.basic.java.redis.entity.LiveRoomEntity;
import io.openvidu.basic.java.redis.entity.PreviousVideoEntity;
import io.openvidu.basic.java.redis.repository.PreviousVideoRepository;
import io.openvidu.java.client.Recording;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class VideoServiceImpl implements VideoService{

    private final PreviousVideoRepository videoRepository;

    @Override
    public boolean saveVideo(LiveRoomEntity liveRoomEntity, Recording recording, Long userId) {
        return videoRepository.save(
                PreviousVideoEntity.builder()
                        .recordingId(recording.getId())
                        .userId(userId)
                        .recordingId(recording.getId())
                        .sessionId(liveRoomEntity.getSessionId())
                        .thumbnail(liveRoomEntity.getThumbnail())
                        .hashTags(liveRoomEntity.getHashTag())
                        .pathUrl(recording.getUrl())
                        .playTime(recording.getDuration())
                        .title(liveRoomEntity.getTitle()) // 일단 방송 제목으로
                        .build()
        ) != null;
    }
}
