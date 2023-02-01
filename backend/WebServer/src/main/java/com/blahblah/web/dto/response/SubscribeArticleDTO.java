package com.blahblah.web.dto.response;

import com.blahblah.web.dto.request.CommentDTO;
import lombok.*;

import java.util.List;

@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class SubscribeArticleDTO {
    private long id;

    private long userPK;

    private String userId;

    private String nickName;

    private String avatar;

    private String title;

    private String content;

    private String createDate;

    private String lastModifiedDate;

    private List<CommentDTO> commentList;

}
