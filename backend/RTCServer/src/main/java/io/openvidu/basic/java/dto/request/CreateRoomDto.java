package io.openvidu.basic.java.dto.request;

import lombok.*;

@Builder
@Getter
public class CreateRoomDto {
    private String title;
    private String hashTag;
}
