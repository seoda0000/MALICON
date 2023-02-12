package com.blahblah.web.service;

import com.blahblah.web.controller.exception.CustomException;
import com.blahblah.web.dto.request.CommentDTO;
import com.blahblah.web.entity.CommentArticleEntity;
import com.blahblah.web.entity.CommentVideoEntity;
import com.blahblah.web.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
@RequiredArgsConstructor
@Slf4j
public class CommentServiceImpl implements CommentService{

    private final CommentArticleRepository commentArticleRepository;

    private final CommentVideoRepository commentVideoRepository;

    private final UserRepository userRepository;

    private final ArticleRepository articleRepository;

    private final VideoRepository videoRepository;

    @Override
    public CommentArticleEntity createArticleComment(CommentDTO commentDTO) {
        CommentArticleEntity comment = CommentArticleEntity.builder()
                .userEntity(userRepository.findById(commentDTO.getUserPK()).orElseThrow(()->new CustomException(HttpStatus.NOT_FOUND, "작성자가 유효하지 않습니다.")))
                .articleEntity(articleRepository.findById(commentDTO.getArticleId()).orElse(null))
                .content(commentDTO.getContent())
                .build();
        return commentArticleRepository.save(comment);
    }

    @Override
    public CommentVideoEntity createVideoComment(CommentDTO commentDTO) {
        CommentVideoEntity comment = CommentVideoEntity.builder()
                .userEntity(userRepository.findById(commentDTO.getUserPK()).orElseThrow(()->new CustomException(HttpStatus.NOT_FOUND, "작성자가 유효하지 않습니다.")))
                .videoEntity(videoRepository.findById(commentDTO.getVideoId()).orElse(null))
                .content(commentDTO.getContent())
                .build();
        return commentVideoRepository.save(comment);
    }

    @Override
    public Page<CommentDTO> readArticleComments(long articleId, long size, long page) {
        PageRequest pageRequest = PageRequest.of((int)page, (int)size, Sort.by(Sort.Direction.DESC, "createDate"));
        Page<CommentArticleEntity> commentEntities = commentArticleRepository.findAllByArticleId(articleId, pageRequest);
        Page<CommentDTO> result = new CommentDTO().toADtoList(commentEntities);
        return result;
    }

    @Override
    public Page<CommentDTO> readVideoComments(long videoId, long size, long page) {
        PageRequest pageRequest = PageRequest.of((int)page, (int)size, Sort.by(Sort.Direction.DESC, "createDate"));
        Page<CommentVideoEntity> commentEntities = commentVideoRepository.findAllByVideoId(videoId, pageRequest);
        Page<CommentDTO> result = new CommentDTO().toVDtoList(commentEntities);
        return result;

    }

    @Override
    public void deleteArticleComment(long id) {
        commentArticleRepository.deleteById(id);
    }

    @Override
    public void deleteVideoComment(long id) {
        commentVideoRepository.deleteById(id);
    }
}
