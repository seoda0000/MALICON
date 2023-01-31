package com.blahblah.web.controller;

import com.blahblah.web.controller.exception.CustomException;
import com.blahblah.web.dto.AboutMeDTO;
import com.blahblah.web.dto.response.Message;
import com.blahblah.web.dto.response.ProfileDTO;
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

    private final AboutMeService aboutMeService;

    @PostMapping
    public ResponseEntity insertAboutMe(@RequestBody String content, HttpServletRequest request) {
        long userPK = JWTutil.getLongIdByAccessToken(request);
        if (content.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Message("자기소개를 적어주세요"));
        }
        AboutMeDTO aboutMeDTO = AboutMeDTO.builder().userPK(userPK).content(content).build();
        AboutMeEntity result = aboutMeService.createAboutMe(aboutMeDTO);
        if (result == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Message("자기소개 추가 실패"));
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(new Message("자기소개 추가 성공"));
        }

    }

    @PutMapping
    public ResponseEntity updateAboutme(@RequestBody AboutMeDTO aboutMeDTO, HttpServletRequest request){
        long userPK = JWTutil.getLongIdByAccessToken(request);
        if(userPK != aboutMeDTO.getUserPK()) throw new CustomException(HttpStatus.FORBIDDEN, "권한이 없습니다.");
        if(aboutMeDTO.getContent().isEmpty()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Message("자기소개를 적어주세요"));
        }
        if(aboutMeService.updateAboutMe(aboutMeDTO))
            return ResponseEntity.ok(new Message("자기소개 수정 성공"));
        else return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    @GetMapping("/{userPK}")
    public ResponseEntity readProfile(@PathVariable long userPK, HttpServletRequest request){
//        long userPK = JWTutil.getLongIdByAccessToken(request);
        ProfileDTO profile = aboutMeService.getAboutMe(userPK);
        if(profile==null){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Message("사용자 정보를 가져올 수 없습니다."));
        }
        return ResponseEntity.ok(profile);
    }

}
