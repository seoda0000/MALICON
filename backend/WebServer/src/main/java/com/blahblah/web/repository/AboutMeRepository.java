package com.blahblah.web.repository;

import com.blahblah.web.entity.AboutMeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface AboutMeRepository extends JpaRepository<AboutMeEntity, Long> {

}
