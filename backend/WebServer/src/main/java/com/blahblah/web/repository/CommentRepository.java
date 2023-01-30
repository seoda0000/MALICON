package com.blahblah.web.repository;

import com.blahblah.web.dto.request.CommentDTO;
import com.blahblah.web.entity.ArticleEntity;
import com.blahblah.web.entity.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends JpaRepository<CommentEntity, Long> {

    @Query(value="select * from comments where article_id=?", nativeQuery = true)
    List<CommentEntity> findAllByArticleId(@Param("articleId") long articleId);
}
