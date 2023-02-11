package io.openvidu.basic.java.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@AllArgsConstructor
@Getter
public class RoomUpdateDto {
    private String title;
    private String thumbnail;
}
