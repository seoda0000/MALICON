package com.blahblah.web.controller.exception.handler;

import com.blahblah.web.controller.exception.CustomException;
import com.blahblah.web.controller.exception.ErrorCode;
import com.blahblah.web.dto.response.Message;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
    @ExceptionHandler(Exception.class)
    protected ResponseEntity<?> handleAllException(Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Message("전역 에러"));
    }

    @ExceptionHandler(CustomException.class)
    protected ResponseEntity<?> handleCustomException(CustomException e) {
        log.error(e.getMessage());
        return ResponseEntity.status(e.getStatus()).body(ErrorCode.builder().timestamp(e.getTimestamp().toString())
                .message(e.getMessage())
                .status(e.getStatus().value()).build());
    }
}
