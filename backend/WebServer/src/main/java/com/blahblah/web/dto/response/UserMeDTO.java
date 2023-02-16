package com.blahblah.web.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class UserMeDTO {
    private Long id;

    private String nickName;

    private String userId;
    private String email;
    private String phoneNumber;
    private String avatar;
    private String lightStick;
    private long subscribers;
}
