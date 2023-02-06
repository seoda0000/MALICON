package com.blahblah.web.dto.request;

import com.blahblah.web.entity.CommentEntity;
import lombok.*;
import org.springframework.data.domain.Page;

@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class CommentDTO {

    private long id;

    private long userPK;

    private String userId;

    private String nickName;

    private long articleId;

    private long videoId;

    private String content;

    private String avatar;

    private String createDate;

    private String lastModifiedDate;

    public Page<CommentDTO> toVDtoList(Page<CommentEntity> commentList){
        Page<CommentDTO> dtoList = commentList.map(c -> CommentDTO.builder()
                .id(c.getId())
                .videoId((c.getVideoEntity())==null?null:c.getVideoEntity().getId())
                .userPK(c.getUserEntity().getId())
                .userId(c.getUserEntity().getUserId())
                .content(c.getContent())
                .nickName(c.getUserEntity().getNickName())
                .avatar(c.getUserEntity().getAvatar())
                .createDate(c.getCreateDate().toString())
                .lastModifiedDate(c.getLastModifiedDate().toString())
                .build());

        return dtoList;
    }
    public Page<CommentDTO> toADtoList(Page<CommentEntity> commentList) {
        Page<CommentDTO> dtoList = commentList.map(c -> CommentDTO.builder()
                .id(c.getId())
                .articleId((c.getArticleEntity())==null?null:c.getArticleEntity().getId())
                .userPK(c.getUserEntity().getId())
                .userId(c.getUserEntity().getUserId())
                .nickName(c.getUserEntity().getNickName())
                .content(c.getContent())
                .avatar(c.getUserEntity().getAvatar())
                .createDate(c.getCreateDate().toString())
                .lastModifiedDate(c.getLastModifiedDate().toString())
                .build());

        return dtoList;
    }
}
