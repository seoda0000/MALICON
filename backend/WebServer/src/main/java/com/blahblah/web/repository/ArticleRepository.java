package com.blahblah.web.repository;

import com.blahblah.web.entity.ArticleEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ArticleRepository extends JpaRepository<ArticleEntity, Long> {

    @Override
    void deleteById(Long id);

    Page<ArticleEntity> findAllByUserId(long userId, Pageable pageable);

    @Query(value="select * from articles a where a.user_id=(select us.subscribe_user_id from user_subscribes us where us.user_id = :id) or a.user_id=:id", nativeQuery = true)
    Page<ArticleEntity> findAllBy(@Param("id") long id, Pageable pageable);

}
