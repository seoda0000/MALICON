package com.blahblah.web.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class SubscribeDTO {
    private long id;

    private long userId;

    private String userNickName;

    private String avatar;

    private String title;

    private String content;

    private String createDate;

    private String lastModifiedDate;

}
