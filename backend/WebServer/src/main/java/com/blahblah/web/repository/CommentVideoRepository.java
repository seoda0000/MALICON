package com.blahblah.web.repository;

import com.blahblah.web.entity.CommentVideoEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentVideoRepository extends JpaRepository<CommentVideoEntity, Long> {

    Page<CommentVideoEntity> findAllByVideoId(long videoId, Pageable pageable);
}
