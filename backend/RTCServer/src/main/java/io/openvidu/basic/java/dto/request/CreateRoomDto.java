package io.openvidu.basic.java.dto.request;

import lombok.*;

@Builder
@Getter
@RequiredArgsConstructor
@AllArgsConstructor
public class CreateRoomDto {
    private String title;
    private String hashTag;
}
