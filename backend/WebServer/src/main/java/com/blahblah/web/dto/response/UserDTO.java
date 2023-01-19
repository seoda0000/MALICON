package com.blahblah.web.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@Builder
@ToString
public class UserDTO {
    private Long id;

    private String nickName;
    private String password;
    private String userId;
    private String email;
    private String phoneNumber;
    private String avatar;
    private String lightStick;
    private String aboutMe;
}
