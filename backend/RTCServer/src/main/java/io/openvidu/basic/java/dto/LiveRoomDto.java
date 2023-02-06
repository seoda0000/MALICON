package io.openvidu.basic.java.dto;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LiveRoomDto {

    //방목록 제공할 때 dto

    private String sessionId; //최초 방제 or 스트리머ID

    private String title; //방제

    private int viewerNumber; //시청자수 (스트리머 포함)

    private Date startAt;  //방송시작시간

    private String thumbnail;

    private UserDto streamer; //스트리머에 대한 정보

}
