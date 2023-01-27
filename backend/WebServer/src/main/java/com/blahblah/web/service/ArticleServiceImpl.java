package com.blahblah.web.service;

import com.blahblah.web.controller.exception.CustomException;
import com.blahblah.web.dto.request.ArticleDTO;
import com.blahblah.web.entity.ArticleEntity;
import com.blahblah.web.entity.UserEntity;
import com.blahblah.web.repository.ArticleRepository;
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
public class ArticleServiceImpl implements ArticleService{

    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;

    @Override
    public ArticleEntity createArticle(ArticleDTO articleDTO) {
        ArticleEntity article = ArticleEntity.builder()
                .userEntity(userRepository.findById(articleDTO.getUserId()))
                .title(articleDTO.getTitle())
                .content(articleDTO.getContent())
                .build();

        return articleRepository.save(article);

    }

    @Override
    public boolean updateArticle(ArticleDTO articleDTO) {
//        ArticleEntity article = articleRepository.findById(articleDTO.getId()).orElseThrow(()->new CustomException(HttpStatus.NOT_FOUND, "존재하지 않는 피드입니다."));
        ArticleEntity article = articleRepository.findById(articleDTO.getId());
        ArticleEntity update = ArticleEntity.builder()
                .id(articleDTO.getId())
                .userEntity(article.getUserEntity())
                .title(articleDTO.getTitle()==null?article.getTitle():articleDTO.getTitle())
                .content(articleDTO.getContent()==null?article.getContent():articleDTO.getContent())
                .build();
        articleRepository.save(update);
        return true;
    }
}
