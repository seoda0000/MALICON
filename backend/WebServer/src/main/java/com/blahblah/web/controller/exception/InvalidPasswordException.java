package com.blahblah.web.controller.exception;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class InvalidPasswordException extends RuntimeException{
    String message;
}
