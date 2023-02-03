package com.blahblah.web.service;

import com.blahblah.web.entity.LikeArticleEntity;
import com.blahblah.web.entity.LikeVideoEntity;

public interface LikeService {
    LikeArticleEntity addLikeArticle(long userPK, long articleId);

    void deleteLikeArticle(long userPK, long articleId);

    LikeVideoEntity addLikeVideo(long userPK, long videoId);

    void deleteLikeVideo(long userPK, long videoId);
}
