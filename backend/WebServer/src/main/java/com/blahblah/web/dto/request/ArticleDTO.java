package com.blahblah.web.dto.request;

import lombok.*;

@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ArticleDTO {

    private long id;

    private long userId;

    private String title;

    private String content;


}
