package com.blahblah.web.repository;

import com.blahblah.web.entity.CommentEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CommentRepository extends JpaRepository<CommentEntity, Long> {

//    @Query(value="select * from comments where article_id=?", nativeQuery = true)
//    Page<CommentEntity> findAllByArticleId(@Param("articleId") long articleId, Pageable pageable);
//
//    @Query(value="select * from comments where video_id=?", nativeQuery = true)
//    Page<CommentEntity> findAllByVideoId(@Param("videoId") long videoId, Pageable pageable);

}
