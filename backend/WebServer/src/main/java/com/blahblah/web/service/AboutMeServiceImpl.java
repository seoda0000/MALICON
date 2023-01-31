package com.blahblah.web.service;

import com.blahblah.web.controller.exception.CustomException;
import com.blahblah.web.dto.AboutMeDTO;
import com.blahblah.web.entity.AboutMeEntity;
import com.blahblah.web.repository.AboutMeRepository;
import com.blahblah.web.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Transactional
@Service
@RequiredArgsConstructor
@Slf4j
public class AboutMeServiceImpl implements AboutMeService{
    private final AboutMeRepository aboutMeRepository;

    private final UserRepository userRepository;

    @Override
    public AboutMeEntity createAboutMe(AboutMeDTO aboutMeDTO) {
        AboutMeEntity a = AboutMeEntity.builder()
                .userEntity(userRepository.findById(aboutMeDTO.getUserPK()).orElseThrow(()->new CustomException(HttpStatus.NOT_FOUND, "사용자가 유효하지 않습니다.")))
                .content(aboutMeDTO.getContent())
                .build();


        return aboutMeRepository.save(a);
    }

    @Override
    public boolean updateAboutMe(AboutMeDTO aboutMeDTO) {
        aboutMeRepository.findById(aboutMeDTO.getUserPK()).orElseThrow(()->new CustomException(HttpStatus.NOT_FOUND, "자기소개가 존재하지 않습니다."));
        AboutMeEntity update = AboutMeEntity.builder()
                .id(aboutMeDTO.getUserPK())
                .userEntity(userRepository.findById(aboutMeDTO.getUserPK()).orElseThrow(()->new CustomException(HttpStatus.NOT_FOUND, "자기소개가 존재하지 않습니다.")))
                .content(aboutMeDTO.getContent())
                .build();
        aboutMeRepository.save(update);
        return true;
    }

    @Override
    public AboutMeEntity getAboutMe(long userPK) {
        return null;
    }
}
