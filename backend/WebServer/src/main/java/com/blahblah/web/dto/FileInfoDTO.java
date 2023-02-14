package com.blahblah.web.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class FileInfoDTO {

    private Long articleId;
    private String saveFolder;
    private String originalFile;
    private String saveFile;

}
