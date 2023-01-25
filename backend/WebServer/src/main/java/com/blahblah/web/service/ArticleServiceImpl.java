package com.blahblah.web.service;

import com.blahblah.web.dto.request.ArticleDTO;
import com.blahblah.web.entity.ArticleEntity;
import com.blahblah.web.repository.ArticleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
@RequiredArgsConstructor
@Slf4j
public class ArticleServiceImpl implements ArticleService{

    private final ArticleRepository articleRepository;

    @Override
    public ArticleEntity createArticle(ArticleDTO articleDTO) {
        ArticleEntity article = ArticleEntity.builder()
                .userEntity(articleRepository.findById(articleDTO.getUserId()))
                .title(articleDTO.getTitle())
                .content(articleDTO.getContent())
                .build();

        return articleRepository.save(article);

    }
}
