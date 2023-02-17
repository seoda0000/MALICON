package com.blahblah.web.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Getter
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class MailDto {
    private String address;
    private String title;
    private String message;
    private MultipartFile file;
}
