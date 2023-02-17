package io.openvidu.basic.java.redis.repository;

import io.openvidu.basic.java.redis.entity.VideoHashtagEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VideoHashtagRepository extends JpaRepository<VideoHashtagEntity, Long> {
}
