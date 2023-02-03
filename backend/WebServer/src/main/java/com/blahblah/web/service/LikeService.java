package com.blahblah.web.service;

import com.blahblah.web.entity.LikeArticleEntity;

public interface LikeService {
    LikeArticleEntity addLike(long userPK, long articleId);

    void deleteLike(long userPK, long articleId);
}
