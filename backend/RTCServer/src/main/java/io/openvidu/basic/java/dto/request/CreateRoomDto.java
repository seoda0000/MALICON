package io.openvidu.basic.java.dto.request;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class CreateRoomDto {
    private String title;
    private String hashTag;
}
