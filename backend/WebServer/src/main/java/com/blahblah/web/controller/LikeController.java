package com.blahblah.web.controller;

import com.blahblah.web.dto.response.Message;
import com.blahblah.web.entity.LikeArticleEntity;
import com.blahblah.web.service.LikeService;
import com.blahblah.web.util.JWTutil;
import io.swagger.models.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RequestMapping("/like")
@RestController
@Slf4j
@RequiredArgsConstructor
public class LikeController {

    private final LikeService likeService;

    @PostMapping("/{articleId}")
    public ResponseEntity createLike(@PathVariable long articleId, HttpServletRequest request){
        long userPK = JWTutil.getLongIdByAccessToken(request);
        LikeArticleEntity result = likeService.addLike(userPK, articleId);
        if(result == null){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Message("좋아요 실패"));
        }else {
            return ResponseEntity.status(HttpStatus.CREATED).body(new Message("좋아요 성공"));
        }
    }

    @DeleteMapping("/{articleId}")
    public ResponseEntity deleteLike(@PathVariable long articleId, HttpServletRequest request){
        long userPK = JWTutil.getLongIdByAccessToken(request);
        likeService.deleteLike(userPK, articleId);
        return ResponseEntity.status(HttpStatus.OK).body(new Message("좋아요 취소 성공"));
    }


}
