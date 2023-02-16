package com.blahblah.web.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long id;

    private String nickName;
    private String password;
    private String userId;
    private String email;
    private String phoneNumber;
    private String avatar;
    private String lightStick;
    private long subscribers;
}
