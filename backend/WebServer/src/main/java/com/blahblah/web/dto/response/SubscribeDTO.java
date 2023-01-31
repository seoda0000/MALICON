package com.blahblah.web.dto.response;

import lombok.*;

@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class SubscribeDTO {
    private long userPK;

    private String userId;

    private String nickName;

    private String avatar;
}
