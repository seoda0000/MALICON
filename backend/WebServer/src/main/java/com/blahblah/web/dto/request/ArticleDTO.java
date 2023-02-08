package com.blahblah.web.dto.request;

import lombok.*;

@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ArticleDTO {

    private long id;

    private long userPK;

    private boolean like;

    private long likeCnt;

    private String userId;

    private String title;

    private String content;


}
