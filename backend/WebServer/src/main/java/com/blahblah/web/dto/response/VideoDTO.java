package com.blahblah.web.dto.response;

import com.blahblah.web.entity.CommentEntity;
import lombok.*;

import java.util.List;

@Builder
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class VideoDTO {

    private Long id;
    private Long userPK;
    private String userId;
    private String nickName;
    private String avatar;
    private String title;
    private long views;
    private String pathUrl;
    private String createDate;
    private List<CommentEntity> comments;
}
