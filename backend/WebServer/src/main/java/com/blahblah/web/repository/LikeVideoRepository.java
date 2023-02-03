package com.blahblah.web.repository;

import com.blahblah.web.entity.LikeVideoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeVideoRepository extends JpaRepository<LikeVideoEntity, Long> {
}
