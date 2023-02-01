package com.blahblah.web.controller;

import com.blahblah.web.controller.exception.CustomException;
import com.blahblah.web.dto.response.Message;
import com.blahblah.web.dto.response.VideoDTO;
import com.blahblah.web.service.VideoService;
import com.blahblah.web.util.JWTutil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/videos")
@Slf4j
@RequiredArgsConstructor
public class VideoController {
    private final VideoService videoService;

    @GetMapping
    public ResponseEntity readVideo(HttpServletRequest request){
        long userPK = JWTutil.getLongIdByAccessToken(request);
        List<VideoDTO> videoList = videoService.readVideos(userPK);
        if(videoList.isEmpty()){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Message("지난 동영상이 없습니다."));
        }
        return ResponseEntity.ok(videoList);
    }

    @GetMapping("/{userPK}")
    public ResponseEntity readMyVideo(@PathVariable long userPK){
        List<VideoDTO> videoList = videoService.readMyVideos(userPK);
        if(videoList.isEmpty()){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Message("지난 동영상이 없습니다."));
        }
        return ResponseEntity.ok(videoList);
    }

    @DeleteMapping
    public ResponseEntity deleteVideo(@RequestBody VideoDTO videoDTO, HttpServletRequest request){
        long userId = JWTutil.getLongIdByAccessToken(request);
        if(videoDTO.getUserPK()!=userId) throw new CustomException(HttpStatus.FORBIDDEN, "권한이 없습니다.");

        videoService.deleteVideo(videoDTO.getId());
        return ResponseEntity.status(HttpStatus.OK).body(new Message("동영상 삭제 완료"));

    }

}
