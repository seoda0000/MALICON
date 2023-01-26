package com.blahblah.web.service;

import com.blahblah.web.dto.request.ArticleDTO;
import com.blahblah.web.entity.ArticleEntity;

public interface ArticleService {

    ArticleEntity createArticle(ArticleDTO articleDTO);

    boolean updateArticle(ArticleDTO articleDTO);

    void deleteArticle(long id);

}
