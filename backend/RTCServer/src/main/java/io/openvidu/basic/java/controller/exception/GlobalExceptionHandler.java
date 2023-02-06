package io.openvidu.basic.java.controller.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(CustomException.class)
    protected ResponseEntity<?> handleCustomException(CustomException e) {
        log.error(e.getMessage());
        return ResponseEntity.status(e.getStatus()).body(ErrorCode.builder().timestamp(e.getTimestamp().toString())
                .message(e.getMessage())
                .status(e.getStatus().value()).build());
    }
}
