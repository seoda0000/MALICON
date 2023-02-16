package com.blahblah.web.repository;

import com.blahblah.web.entity.NotificationEntity;
import com.blahblah.web.entity.UserSubscribeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<NotificationEntity, Long> {
    List<NotificationEntity> findAllByUserIdOrderByTimestampDesc(long userId);
}
