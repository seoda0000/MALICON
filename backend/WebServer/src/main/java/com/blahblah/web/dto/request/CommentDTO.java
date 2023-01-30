package com.blahblah.web.dto.request;

import lombok.*;

@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class CommentDTO {

    private long userId;

    private long articleId;

    private String content;
}
