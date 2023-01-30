package com.blahblah.web.service;

import com.blahblah.web.controller.exception.CustomException;
import com.blahblah.web.dto.request.CommentDTO;
import com.blahblah.web.entity.CommentEntity;
import com.blahblah.web.repository.ArticleRepository;
import com.blahblah.web.repository.CommentRepository;
import com.blahblah.web.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
@RequiredArgsConstructor
@Slf4j
public class CommentServiceImpl implements CommentService{

    private final CommentRepository commentRepository;

    private final UserRepository userRepository;

    private final ArticleRepository articleRepository;

    @Override
    public CommentEntity createComment(CommentDTO commentDTO) {
        CommentEntity comment = CommentEntity.builder()
                .userEntity(userRepository.findById(commentDTO.getUserPK()).orElseThrow(()->new CustomException(HttpStatus.NOT_FOUND, "작성자가 유효하지 않습니다.")))
                .articleEntity(articleRepository.findById(commentDTO.getArticleId()).orElseThrow(()->new CustomException(HttpStatus.NOT_FOUND, "게시글이 유효하지 않습니다.")))
                .content(commentDTO.getContent())
                .build();
        return commentRepository.save(comment);
    }

    @Override
    public void deleteComment(long id) {
        commentRepository.deleteById(id);
    }
}
