package com.blahblah.web.service;

import com.blahblah.web.dto.request.CommentDTO;
import com.blahblah.web.entity.CommentEntity;
import org.springframework.data.domain.Page;

public interface CommentService {

    CommentEntity createComment(CommentDTO commentDTO);

    Page<CommentDTO> readComments(long check, long articleId, long size, long page);

    void deleteComment(long id);
}
