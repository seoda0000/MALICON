package io.openvidu.basic.java.redis.entity;

import io.openvidu.basic.java.dto.UserDto;
import io.openvidu.java.client.Recording;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@RedisHash("LiveRoom")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class LiveRoomEntity {
    @Id
    private String sessionId;

    //타이틀
    private String title;

    //방송 시작시간
    private Long startAt;

    //썸네일
    private String thumbnail;

    //스트리머 정보
    private UserDto streamer;

    private String hashTag;

    private String recordingId;
}
