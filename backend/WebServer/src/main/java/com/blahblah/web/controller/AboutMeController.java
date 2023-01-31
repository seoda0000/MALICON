package com.blahblah.web.controller;

import com.blahblah.web.dto.AboutMeDTO;
import com.blahblah.web.dto.response.Message;
import com.blahblah.web.entity.AboutMeEntity;
import com.blahblah.web.service.AboutMeService;
import com.blahblah.web.util.JWTutil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RequestMapping("/aboutme")
@RestController
@Slf4j
@RequiredArgsConstructor
public class AboutMeController {

    private final AboutMeService profileService;

    @PostMapping
    public ResponseEntity insertAboutMe(@RequestBody String contents, HttpServletRequest request){
        long userId = JWTutil.getLongIdByAccessToken(request);
        if(contents.isEmpty()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Message("자기소개를 적어주세요"));
        }
        AboutMeDTO aboutMeDTO = AboutMeDTO.builder().userPK(userId).content(contents).build();
        AboutMeEntity result = profileService.createAboutMe(aboutMeDTO);
        if(result == null){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Message("자기소개 추가 실패"));
        }else{
            return ResponseEntity.status(HttpStatus.OK).body(new Message("자기소개 추가 성공"));
        }

    }


}
