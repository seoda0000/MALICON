package com.blahblah.web.repository;

import com.blahblah.web.entity.CommentArticleEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentArticleRepository extends JpaRepository<CommentArticleEntity, Long> {

    Page<CommentArticleEntity> findAllByArticleId(long articleId, Pageable pageable);

}
