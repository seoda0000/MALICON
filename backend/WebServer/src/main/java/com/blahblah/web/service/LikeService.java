package com.blahblah.web.service;

import com.blahblah.web.entity.ArticleEntity;
import com.blahblah.web.entity.LikeArticleEntity;
import com.blahblah.web.entity.LikeVideoEntity;

import java.util.List;

public interface LikeService {
    LikeArticleEntity addLikeArticle(long userPK, long articleId);

    List<Long> getLikeArticles(long userPK);

    void deleteLikeArticle(long userPK, long articleId);

    LikeVideoEntity addLikeVideo(long userPK, long videoId);

    void deleteLikeVideo(long userPK, long videoId);
}
