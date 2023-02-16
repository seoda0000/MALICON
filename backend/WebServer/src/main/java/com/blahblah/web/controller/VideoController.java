package com.blahblah.web.controller;

import com.blahblah.web.controller.exception.CustomException;
import com.blahblah.web.dto.response.HashTagResponse;
import com.blahblah.web.dto.response.Message;
import com.blahblah.web.dto.response.VideoDTO;
import com.blahblah.web.entity.VideoEntity;
import com.blahblah.web.service.VideoService;
import com.blahblah.web.util.JWTutil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/videos")
@Slf4j
@RequiredArgsConstructor
public class VideoController {
    private final VideoService videoService;
    
    @GetMapping("/{size}/{page}")
    public ResponseEntity readVideo(@PathVariable long size, @PathVariable long page, HttpServletRequest request){
        long userPK = JWTutil.getLongIdByAccessToken(request);
        Page<VideoDTO> videoList = videoService.readVideos(userPK, size, page);
        if(videoList.isEmpty()){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Message("지난 동영상이 없습니다."));
        }
        return ResponseEntity.ok(videoList);
    }

    @GetMapping("/{userPK}/{size}/{page}")
    public ResponseEntity readMyVideo(@PathVariable long userPK, @PathVariable long size, @PathVariable long page){
        Page<VideoDTO> videoList = videoService.readMyVideos(userPK, size, page);
        if(videoList.isEmpty()){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Message("지난 동영상이 없습니다."));
        }
        return ResponseEntity.ok(videoList);
    }

    @GetMapping("/main/{size}/{page}")
    public ResponseEntity readAllVideo(@PathVariable long size, @PathVariable long page){
        Page<VideoDTO> videoList = videoService.readAllVideos( size, page);
        if(videoList.isEmpty()){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Message("지난 동영상이 없습니다."));
        }
        return ResponseEntity.ok(videoList);

    }

    @GetMapping("/details/{videoId}")
    public ResponseEntity videoDetail(@PathVariable long videoId, HttpServletRequest request){
        long userPK = JWTutil.getLongIdByAccessToken(request);
        VideoDTO video = videoService.getVideo(videoId, userPK);
        if(video==null){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Message("상세 조회 실패"));
        }
        return ResponseEntity.ok(video);
    }

    @DeleteMapping("/{videoId}/{userPK}")
    public ResponseEntity deleteVideo(@PathVariable long videoId, @PathVariable long userPK, HttpServletRequest request){
        long userId = JWTutil.getLongIdByAccessToken(request);
        if(userPK!=userId) throw new CustomException(HttpStatus.FORBIDDEN, "권한이 없습니다.");

        videoService.deleteVideo(videoId);
        return ResponseEntity.status(HttpStatus.OK).body(new Message("동영상 삭제 완료"));

    }

    @PostMapping("/{size}/{page}")
    public ResponseEntity readVideoAllByHashTags(@PathVariable long size, @PathVariable long page, @RequestBody HashTagResponse hashTag){
        Page<VideoDTO> videos = videoService.readVideosByHashTag(size, page, hashTag.getHashTag());
        return ResponseEntity.ok(videos);
    }
}
