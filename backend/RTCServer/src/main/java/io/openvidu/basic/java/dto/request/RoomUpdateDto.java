package io.openvidu.basic.java.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@RequiredArgsConstructor
@AllArgsConstructor
@Getter
@ToString
public class RoomUpdateDto {
    private String title;
    private String thumbnail;
}
