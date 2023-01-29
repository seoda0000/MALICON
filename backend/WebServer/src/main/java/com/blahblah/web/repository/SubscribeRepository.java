package com.blahblah.web.repository;

import com.blahblah.web.entity.UserEntity;
import com.blahblah.web.entity.UserSubscribeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SubscribeRepository extends JpaRepository<UserSubscribeEntity, Long> {

    @Query(value = "select subscribe_user_id from user_subscribes where user_id=?", nativeQuery = true)
    List<Long> findAllByUserId (@Param("userId") long userId);

}
