package com.blahblah.web.repository;


import com.blahblah.web.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    boolean existsByUserId(String userId);

    boolean existsByNickName(String nickName);

    void deleteByUserId(String userId);

    Optional<UserEntity> findByUserId(String userId);

    @Query(value = "select * from users u where u.id in (select subscribe_user_id from user_subscribes where user_id = ? )", nativeQuery = true)
    List<UserEntity> findAllByUserId (long userId);
}
