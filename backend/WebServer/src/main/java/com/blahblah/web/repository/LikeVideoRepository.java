package com.blahblah.web.repository;

import com.blahblah.web.entity.LikeVideoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LikeVideoRepository extends JpaRepository<LikeVideoEntity, Long> {
    LikeVideoEntity findByUserIdAndVideoId(long userId, long videoId);
}
