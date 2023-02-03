package com.blahblah.web.service;

import com.blahblah.web.controller.exception.CustomException;
import com.blahblah.web.entity.LikeArticleEntity;
import com.blahblah.web.repository.ArticleRepository;
import com.blahblah.web.repository.LikeArticleRepository;
import com.blahblah.web.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class LikeServiceImpl implements LikeService{

    private final LikeArticleRepository likeArticleRepository;
    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;
    @Override
    public LikeArticleEntity addLike(long userPK, long articleId) {
        LikeArticleEntity like = LikeArticleEntity.builder()
                .articleEntity(articleRepository.findById(articleId).orElseThrow(()->new CustomException(HttpStatus.NOT_FOUND, "좋아요 누를 게시글이 유효하지 않습니다.")))
                .userEntity(userRepository.findById(userPK).orElseThrow(()->new CustomException(HttpStatus.NOT_FOUND, "사용자가 유효하지 않습니다.")))
                .build();
        return likeArticleRepository.save(like);
    }

    @Override
    public void deleteLike(long userPK, long articleId) {
        LikeArticleEntity like = LikeArticleEntity.builder()
                .articleEntity(articleRepository.findById(articleId).orElseThrow(()->new CustomException(HttpStatus.NOT_FOUND, "좋아요 누를 게시글이 유효하지 않습니다.")))
                .userEntity(userRepository.findById(userPK).orElseThrow(()->new CustomException(HttpStatus.NOT_FOUND, "사용자가 유효하지 않습니다.")))
                .build();
        likeArticleRepository.delete(like);
    }


}
