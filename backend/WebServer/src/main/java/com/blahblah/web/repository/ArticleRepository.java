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

    @Query(value="select * from articles where user_id in (select subscribe_user_id from user_subscribes where user_id = :id) or user_id=:id", nativeQuery = true)
    Page<ArticleEntity> findAllBy(long id, Pageable pageable);

    List<ArticleEntity> findAllById(long id);
}
