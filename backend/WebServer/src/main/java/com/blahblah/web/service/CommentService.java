package com.blahblah.web.service;

import com.blahblah.web.dto.request.CommentDTO;
import com.blahblah.web.entity.CommentArticleEntity;
import com.blahblah.web.entity.CommentVideoEntity;
import org.springframework.data.domain.Page;

public interface CommentService {

    CommentArticleEntity createArticleComment(CommentDTO commentDTO);

    CommentVideoEntity createVideoComment(CommentDTO commentDTO);

    Page<CommentDTO> readArticleComments(long articleId, long size, long page);

    Page<CommentDTO> readVideoComments(long videoId, long size, long page);

    void deleteArticleComment(long id);

    void deleteVideoComment(long id);
}
