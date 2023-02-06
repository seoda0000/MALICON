package io.openvidu.basic.java.redis.entity;

import io.openvidu.basic.java.dto.UserDto;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.util.Date;

@RedisHash("LiveRoom")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class LiveRoomEntity {

    //고유 아이디
    //redis는 String을 주로 사용함
    //랜덤한 key값이 들어가게 된다.

    @Id
    private String sessionId;

    //타이틀
    private String title;

    //방송 시작시간
    private Date startAt;

    //썸네일
    private String thumbnail;

    //스트리머 정보
    private UserDto streamer;

    private String hashTag;
}
