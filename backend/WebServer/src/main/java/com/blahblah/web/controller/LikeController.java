package com.blahblah.web.controller;

import com.blahblah.web.dto.LikeDTO;
import com.blahblah.web.dto.response.Message;
import com.blahblah.web.entity.LikeArticleEntity;
import com.blahblah.web.entity.LikeVideoEntity;
import com.blahblah.web.service.LikeService;
import com.blahblah.web.util.JWTutil;
import io.swagger.models.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RequestMapping("/likes")
@RestController
@Slf4j
@RequiredArgsConstructor
public class LikeController {

    private final LikeService likeService;

    @PostMapping("/articles")
    public ResponseEntity createLikeArticle(@RequestBody LikeDTO likeDTO, HttpServletRequest request){
        long userPK = JWTutil.getLongIdByAccessToken(request);
        LikeArticleEntity result = likeService.addLikeArticle(userPK, likeDTO.getArticleId());
        if(result == null){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Message("피드 좋아요 실패"));
        }else {
            return ResponseEntity.status(HttpStatus.CREATED).body(new Message("피드 좋아요 성공"));
        }
    }

    @GetMapping("/articles")
    public ResponseEntity readLikeArticles(HttpServletRequest request){
        long userPK = JWTutil.getLongIdByAccessToken(request);
        List<Long> articleIdList = likeService.getLikeArticles(userPK);
        return ResponseEntity.ok(articleIdList);
    }


    @DeleteMapping("/articles/{articleId}")
    public ResponseEntity deleteLikeArticle(@PathVariable long articleId, HttpServletRequest request){
        long userPK = JWTutil.getLongIdByAccessToken(request);
        likeService.deleteLikeArticle(userPK, articleId);
        return ResponseEntity.status(HttpStatus.OK).body(new Message("피드 좋아요 취소 성공"));
    }

    @PostMapping("/videos")
    public ResponseEntity createLikeVideo(@RequestBody LikeDTO likeDTO, HttpServletRequest request){
        long userPK = JWTutil.getLongIdByAccessToken(request);
        LikeVideoEntity result = likeService.addLikeVideo(userPK, likeDTO.getVideoId());
        if(result == null){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Message("비디오 좋아요 실패"));
        }else {
            return ResponseEntity.status(HttpStatus.CREATED).body(new Message("비디오 좋아요 성공"));
        }
    }

    @DeleteMapping("/videos/{videoId}")
    public ResponseEntity deleteLikeVideo(@PathVariable long videoId, HttpServletRequest request){
        long userPK = JWTutil.getLongIdByAccessToken(request);
        likeService.deleteLikeVideo(userPK, videoId);
        return ResponseEntity.status(HttpStatus.OK).body(new Message("비디오 좋아요 취소 성공"));
    }

}
