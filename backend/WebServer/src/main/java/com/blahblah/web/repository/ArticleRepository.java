package com.blahblah.web.repository;

import com.blahblah.web.entity.ArticleEntity;
import com.blahblah.web.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<ArticleEntity, Long> {


    UserEntity findById(long Id);


}
