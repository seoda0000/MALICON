package com.blahblah.web.repository;

import com.blahblah.web.entity.UserSubscribeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubscribeRepository extends JpaRepository<UserSubscribeEntity, Long> {
}
