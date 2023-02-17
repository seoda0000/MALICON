package com.blahblah.web.repository;

import com.blahblah.web.entity.VideoEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
public interface VideoRepository extends JpaRepository<VideoEntity, Long> {

    @Query(value="select * from videos where user_id in (select subscribe_user_id from user_subscribes where user_id = :id) or user_id =:id", nativeQuery = true)
    Page<VideoEntity> findAllBy(@Param("id") long id, Pageable pageable);

    Page<VideoEntity> findAllByUserId(long userId, Pageable pageable);

    void deleteById(long id);

    @Modifying
    @Query(value="update videos v set v.views=:view where v.id=:id", nativeQuery = true)
    int updateViewsById(@Param("view") long view, @Param("id") long id);

    @Query("SELECT DISTINCT  v FROM VideoEntity v JOIN v.hashtagEntityList h WHERE h.key IN :hashtagKeys ORDER BY v.views DESC")
    Page<VideoEntity> findByHashtagKeys(@Param("hashtagKeys") List<Integer> hashtagKeys, Pageable pageable);
}
