package com.blahblah.web.repository;

import com.blahblah.web.entity.ArticleEntity;
import com.blahblah.web.entity.VideoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VideoRepository extends JpaRepository<VideoEntity, Long> {

    @Query(value="select * from videos v where v.user_id=(select us.subscribe_user_id from user_subscribes us where us.user_id = :id) or v.user_id =:id", nativeQuery = true)
    List<VideoEntity> findAllBy(@Param("id") long id);

    List<VideoEntity> findAllByUserId(long userId);

    void deleteById(long id);
}
