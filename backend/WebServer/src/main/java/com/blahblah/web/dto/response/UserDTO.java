package com.blahblah.web.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class UserDTO {
    private Long id;
    private String department;
    private String name;
    private String password;
    private String position;
    private String userId;
}
