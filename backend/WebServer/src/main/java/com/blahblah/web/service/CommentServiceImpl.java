package com.blahblah.web.service;

import com.blahblah.web.controller.exception.CustomException;
import com.blahblah.web.dto.request.CommentDTO;
import com.blahblah.web.entity.CommentEntity;
import com.blahblah.web.repository.ArticleRepository;
import com.blahblah.web.repository.CommentRepository;
import com.blahblah.web.repository.UserRepository;
import com.blahblah.web.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.xml.stream.events.Comment;

@Transactional
@Service
@RequiredArgsConstructor
@Slf4j
public class CommentServiceImpl implements CommentService{

    private final CommentRepository commentRepository;

    private final UserRepository userRepository;

    private final ArticleRepository articleRepository;

    private final VideoRepository videoRepository;

    @Override
    public CommentEntity createComment(CommentDTO commentDTO) {
        CommentEntity comment = CommentEntity.builder()
                .userEntity(userRepository.findById(commentDTO.getUserPK()).orElseThrow(()->new CustomException(HttpStatus.NOT_FOUND, "작성자가 유효하지 않습니다.")))
                .articleEntity(articleRepository.findById(commentDTO.getArticleId()).orElse(null))
                .videoEntity(videoRepository.findById(commentDTO.getVideoId()).orElse(null))
                .content(commentDTO.getContent())
                .build();
        return commentRepository.save(comment);
    }

    @Override
    public Page<CommentDTO> readComments(long check, long articleId, long size, long page) {
        PageRequest pageRequest = PageRequest.of((int)page, (int)size, Sort.by(Sort.Direction.DESC, "createDate"));
        if(check==1) {
            Page<CommentEntity> commentEntities = commentRepository.findAllByArticleId(articleId, pageRequest);
            Page<CommentDTO> result = new CommentDTO().toADtoList(commentEntities);
            return result;
        }else{
            Page<CommentEntity> commentEntities = commentRepository.findAllByVideoId(articleId, pageRequest);
            Page<CommentDTO> result = new CommentDTO().toVDtoList(commentEntities);
            return result;
        }
    }

    @Override
    public void deleteComment(long id) {
        commentRepository.deleteById(id);
    }
}
