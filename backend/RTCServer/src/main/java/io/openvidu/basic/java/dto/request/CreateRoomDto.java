package io.openvidu.basic.java.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Builder
@Getter
@RequiredArgsConstructor
public class CreateRoomDto {
    private String title;
    private String hashTag;
}
