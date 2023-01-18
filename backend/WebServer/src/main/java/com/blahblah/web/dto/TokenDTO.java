package com.blahblah.web.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class TokenDTO {
    private final String accessToken;
    private final String refreshToken;
}
