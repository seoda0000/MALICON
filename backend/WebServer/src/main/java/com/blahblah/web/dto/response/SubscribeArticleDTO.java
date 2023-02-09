package com.blahblah.web.dto.response;

import com.blahblah.web.dto.request.CommentDTO;
import com.blahblah.web.entity.ArticleEntity;
import lombok.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import java.time.LocalDateTime;
import java.util.Collections;
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

    private LocalDateTime createDate;

    private LocalDateTime lastModifiedDate;

    private boolean like;

    private long likeCnt;

    private Page<CommentDTO> commentList;

    public Page<SubscribeArticleDTO> toDtoList(Page<ArticleEntity> articleList, List<Long> likes, List<Long> articles){
        PageRequest pageRequest = PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, "createDate"));
        int start = (int) pageRequest.getOffset();
        int end = start+pageRequest.getPageSize();
        Page<SubscribeArticleDTO> dtoList = articleList.map(a ->
                        SubscribeArticleDTO.builder()
                        .id(a.getId())
                        .userPK(a.getUserEntity().getId())
                        .userId(a.getUserEntity().getUserId())
                        .nickName(a.getUserEntity().getNickName())
                        .avatar(a.getUserEntity().getAvatar())
                        .title(a.getTitle())
                        .content(a.getContent())
                        .createDate(a.getCreateDate())
                        .lastModifiedDate(a.getLastModifiedDate())
                        .like(likes.contains(a.getId()))
                                .likeCnt(Collections.frequency(articles, a.getId()))
                        .commentList(new CommentDTO().toADtoList(new PageImpl<>(a.getComments().subList(start, Math.min(end, a.getComments().size())), pageRequest, a.getComments().size())))
                        .build());
        return dtoList;
    }

}
