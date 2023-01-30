package com.blahblah.web.service;

import com.blahblah.web.dto.request.CommentDTO;
import com.blahblah.web.entity.CommentEntity;

public interface CommentService {

    CommentEntity createComment(CommentDTO commentDTO);

}
