package com.blahblah.web.repository;

import com.blahblah.web.entity.CommentEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CommentRepository extends JpaRepository<CommentEntity, Long> {

    Page<CommentEntity> findAllByArticleId(long articleId, Pageable pageable);

    Page<CommentEntity> findAllByVideoId(long videoId, Pageable pageable);

}
