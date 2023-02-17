package com.blahblah.web.dto.response;

import lombok.*;

@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ProfileDTO {
    private long userPK;
    private String nickName;
    private String userId;
    private String avatar;
    private long subscribers;
    private String aboutMe;
}
