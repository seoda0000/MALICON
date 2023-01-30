package com.blahblah.web.dto.request;

import lombok.*;

@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class CommentDTO {

    private long id;
    private long userPK;

    private String userId;

    private long articleId;

    private String content;

    private String createDate;

    private String lastModifiedDate;
}
