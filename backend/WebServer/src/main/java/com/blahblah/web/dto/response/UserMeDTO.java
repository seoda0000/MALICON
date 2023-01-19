package com.blahblah.web.dto.response;

import lombok.Builder;
import lombok.Getter;


@Builder
@Getter
public class UserMeDTO {
    private String department;
    private String position;
    private String name;
    private String userId;
}
