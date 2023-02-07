package com.blahblah.web.service;

import com.blahblah.web.controller.exception.CustomException;
import com.blahblah.web.entity.ArticleEntity;
import com.blahblah.web.entity.LikeArticleEntity;
import com.blahblah.web.entity.LikeVideoEntity;
import com.blahblah.web.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class LikeServiceImpl implements LikeService{

    private final LikeArticleRepository likeArticleRepository;
    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;
    private final VideoRepository videoRepository;
    private final LikeVideoRepository likeVideoRepository;
    @Override
    public LikeArticleEntity addLikeArticle(long userPK, long articleId) {
        LikeArticleEntity like = LikeArticleEntity.builder()
                .articleEntity(articleRepository.findById(articleId).orElseThrow(()->new CustomException(HttpStatus.NOT_FOUND, "좋아요 누를 게시글이 유효하지 않습니다.")))
                .userEntity(userRepository.findById(userPK).orElseThrow(()->new CustomException(HttpStatus.NOT_FOUND, "사용자가 유효하지 않습니다.")))
                .build();
        return likeArticleRepository.save(like);
    }

    @Override
    public List<Long> getLikeArticles(long userPK) {
        List<LikeArticleEntity> result =  likeArticleRepository.findAllByUserId(userPK);
        List<Long> articleIds = new ArrayList<>();
        for(LikeArticleEntity like: result){
            articleIds.add(like.getArticleEntity().getId());
        }
        return articleIds;
    }

    @Override
    public void deleteLikeArticle(long userPK, long articleId) {
        LikeArticleEntity like = LikeArticleEntity.builder()
                .articleEntity(articleRepository.findById(articleId).orElseThrow(()->new CustomException(HttpStatus.NOT_FOUND, "좋아요 누를 게시글이 유효하지 않습니다.")))
                .userEntity(userRepository.findById(userPK).orElseThrow(()->new CustomException(HttpStatus.NOT_FOUND, "사용자가 유효하지 않습니다.")))
                .build();
        likeArticleRepository.delete(like);
    }

    @Override
    public LikeVideoEntity addLikeVideo(long userPK, long videoId) {
        LikeVideoEntity like = LikeVideoEntity.builder()
                .videoEntity(videoRepository.findById(videoId).orElseThrow(()->new CustomException(HttpStatus.NOT_FOUND, "좋아요 누를 게시글이 유효하지 않습니다.")))
                .userEntity(userRepository.findById(userPK).orElseThrow(()->new CustomException(HttpStatus.NOT_FOUND, "사용자가 유효하지 않습니다.")))
                .build();
        return likeVideoRepository.save(like);
    }

    @Override
    public void deleteLikeVideo(long userPK, long videoId) {
        LikeVideoEntity like = LikeVideoEntity.builder()
                .videoEntity(videoRepository.findById(videoId).orElseThrow(()->new CustomException(HttpStatus.NOT_FOUND, "좋아요 누를 동영상이 유효하지 않습니다.")))
                .userEntity(userRepository.findById(userPK).orElseThrow(()->new CustomException(HttpStatus.NOT_FOUND, "사용자가 유효하지 않습니다.")))
                .build();
        likeVideoRepository.delete(like);
    }

}
