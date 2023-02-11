package io.openvidu.basic.java.dto.request;

import lombok.*;

@Builder
@Getter
@AllArgsConstructor
@RequiredArgsConstructor
public class StopRecordDto {

    private String title;
    private String recordingId;
    private String thumbnail;
    private Long user_id;

    private String hashTags;
}
