package com.blahblah.web.repository;

import com.blahblah.web.entity.UserEntity;
import com.blahblah.web.entity.UserSubscribeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SubscribeRepository extends JpaRepository<UserSubscribeEntity, Long> {

//    @Query(value = "select * from users u where u.id in (select subscribe_user_id from user_subscribes where user_id = ? )", nativeQuery = true)
//    List<UserEntity> findAllByUserId (long userId);

//    void delete(UserSubscribeEntity subscribe);

}
