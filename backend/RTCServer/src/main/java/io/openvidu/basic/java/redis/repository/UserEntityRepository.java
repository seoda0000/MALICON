package io.openvidu.basic.java.redis.repository;

import io.openvidu.basic.java.redis.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserEntityRepository extends JpaRepository<UserEntity, Long> {
}
