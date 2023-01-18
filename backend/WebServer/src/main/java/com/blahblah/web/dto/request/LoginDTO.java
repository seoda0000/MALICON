package com.blahblah.web.dto.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class LoginDTO {
    private String userId;
    private String password;
}
