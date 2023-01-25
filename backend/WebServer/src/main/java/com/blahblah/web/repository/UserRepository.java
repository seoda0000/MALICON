package com.blahblah.web.repository;


import com.blahblah.web.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    boolean existsByUserId(String userId);
    void deleteByUserId(String userId);

    Optional<UserDetails> findByUserId(String userId);

    UserEntity findById(long id);
}
