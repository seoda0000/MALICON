package com.blahblah.web.controller;


import com.blahblah.web.controller.exception.CustomException;
import com.blahblah.web.dto.request.ArticleDTO;
import com.blahblah.web.dto.response.Message;
import com.blahblah.web.dto.response.SubscribeArticleDTO;
import com.blahblah.web.entity.ArticleEntity;
import com.blahblah.web.service.ArticleService;
import com.blahblah.web.util.JWTutil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RequestMapping("/articles")
@RestController
@Slf4j
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;


    @PostMapping
    public ResponseEntity insertArticle(@RequestBody @Validated ArticleDTO articleDTO, HttpServletRequest request){
        long userId = JWTutil.getLongIdByAccessToken(request);
        if(articleDTO.getTitle().isEmpty() || articleDTO.getContent().isEmpty()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Message("빈 문자열"));
        }
        ArticleDTO a = ArticleDTO.builder().title(articleDTO.getTitle()).content(articleDTO.getContent()).userPK(userId).build();
        ArticleEntity result = articleService.createArticle(a);
        if(result==null){
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR, "글 작성 실패");
        }else {
            return ResponseEntity.status(HttpStatus.OK).body(new Message("글 작성 완료"));
        }
    }

    @PutMapping()
    public ResponseEntity updateArticle(@RequestBody ArticleDTO articleDTO, HttpServletRequest request){
        if(JWTutil.getLongIdByAccessToken(request) != articleDTO.getUserPK()) throw new CustomException(HttpStatus.FORBIDDEN, "권한이 없습니다.");
        if(articleService.updateArticle(articleDTO))
            return ResponseEntity.ok(new Message("피드 수정 성공"));
        else return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    @DeleteMapping
    public ResponseEntity deleteArticle(@RequestBody ArticleDTO articleDTO, HttpServletRequest request){
        if(JWTutil.getLongIdByAccessToken(request) != articleDTO.getUserPK()) throw new CustomException(HttpStatus.FORBIDDEN, "권한이 없습니다.");

        articleService.deleteArticle(articleDTO.getId());
        return ResponseEntity.status(HttpStatus.OK).body(new Message("피드 삭제 완료"));
    }

    @GetMapping("/subscribe")
    public ResponseEntity readArticle(HttpServletRequest request){
        long id = JWTutil.getLongIdByAccessToken(request);

        Page<SubscribeArticleDTO> articleList = articleService.readArticle(id);
        return ResponseEntity.ok(articleList);

    }

    @GetMapping("/{userPK}")
    public ResponseEntity readMyArticle(@PathVariable long userPK){
        Page<SubscribeArticleDTO> articleList = articleService.readMyArticle(userPK);
        if(articleList.isEmpty()){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Message("피트 목록이 없습니다"));
        }
        return ResponseEntity.ok(articleList);
    }
}
