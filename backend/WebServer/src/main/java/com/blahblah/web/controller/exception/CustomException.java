package com.blahblah.web.controller.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@Getter
@RequiredArgsConstructor
public class CustomException extends RuntimeException{
    private final LocalDateTime timestamp = LocalDateTime.now();
    private final HttpStatus status;
    private final String message;
}
