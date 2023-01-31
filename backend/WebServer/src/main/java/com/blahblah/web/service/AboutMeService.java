package com.blahblah.web.service;

import com.blahblah.web.dto.AboutMeDTO;
import com.blahblah.web.entity.AboutMeEntity;

public interface AboutMeService {

    AboutMeEntity createAboutMe(AboutMeDTO aboutMeDTO);

    boolean updateAboutMe(AboutMeDTO aboutMeDTO);

    AboutMeEntity getAboutMe(long userPK);
}
