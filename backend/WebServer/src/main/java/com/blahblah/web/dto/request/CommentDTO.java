package com.blahblah.web.dto.request;

import com.blahblah.web.entity.CommentArticleEntity;
import com.blahblah.web.entity.CommentVideoEntity;
import lombok.*;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;

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

    private LocalDateTime createDate;

    private LocalDateTime lastModifiedDate;

    public Page<CommentDTO> toVDtoList(Page<CommentVideoEntity> commentList){
        Page<CommentDTO> dtoList = commentList.map(c -> CommentDTO.builder()
                .id(c.getId())
                .videoId((c.getVideoEntity())==null?null:c.getVideoEntity().getId())
                .userPK(c.getUserEntity().getId())
                .userId(c.getUserEntity().getUserId())
                .content(c.getContent())
                .nickName(c.getUserEntity().getNickName())
                .avatar(c.getUserEntity().getAvatar())
                .createDate(c.getCreateDate())
                .lastModifiedDate(c.getLastModifiedDate())
                .build());

        return dtoList;
    }
    public Page<CommentDTO> toADtoList(Page<CommentArticleEntity> commentList) {
        Page<CommentDTO> dtoList = commentList.map(c -> CommentDTO.builder()
                .id(c.getId())
                .articleId((c.getArticleEntity())==null?null:c.getArticleEntity().getId())
                .userPK(c.getUserEntity().getId())
                .userId(c.getUserEntity().getUserId())
                .nickName(c.getUserEntity().getNickName())
                .content(c.getContent())
                .avatar(c.getUserEntity().getAvatar())
                .createDate(c.getCreateDate())
                .lastModifiedDate(c.getLastModifiedDate())
                .build());

        return dtoList;
    }
}
