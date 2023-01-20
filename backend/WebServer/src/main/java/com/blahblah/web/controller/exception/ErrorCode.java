package com.blahblah.web.controller.exception;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class ErrorCode {
    private String message;
    private Integer status;
    private String timestamp;
}
