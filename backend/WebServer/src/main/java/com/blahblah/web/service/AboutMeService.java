package com.blahblah.web.service;

import com.blahblah.web.dto.AboutMeDTO;
import com.blahblah.web.dto.response.ProfileDTO;
import com.blahblah.web.entity.AboutMeEntity;

public interface AboutMeService {

    AboutMeEntity createAboutMe(AboutMeDTO aboutMeDTO);

    boolean updateAboutMe(AboutMeDTO aboutMeDTO);

    ProfileDTO getAboutMe(long userPK);
}
