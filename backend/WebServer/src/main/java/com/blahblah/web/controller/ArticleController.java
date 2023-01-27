package com.blahblah.web.controller;


import com.blahblah.web.controller.exception.CustomException;
import com.blahblah.web.dto.request.ArticleDTO;
import com.blahblah.web.dto.response.Message;
import com.blahblah.web.dto.response.SubscribeDTO;
import com.blahblah.web.dto.response.UserDTO;
import com.blahblah.web.entity.ArticleEntity;
import com.blahblah.web.service.ArticleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/articles")
@RestController
@Slf4j
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;


    @PostMapping
    public ResponseEntity insertArticle(@RequestBody @Validated ArticleDTO articleDTO){
        UserDTO loginUser = (UserDTO) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long userId = loginUser.getId();
        if(articleDTO.getTitle() =="" || articleDTO.getContent()==""){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Message("빈 문자열"));
        }
        ArticleDTO a = ArticleDTO.builder().title(articleDTO.getTitle()).content(articleDTO.getContent()).userId(userId).build();
        ArticleEntity result = articleService.createArticle(a);
        if(result==null){
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR, "글 작성 실패");
        }else {
            return ResponseEntity.status(HttpStatus.OK).body(new Message("글 작성 완료"));
        }
    }

    @PutMapping()
    public ResponseEntity updateArticle(@RequestBody ArticleDTO articleDTO){
        UserDTO loginUser = (UserDTO)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        log.info("id"+articleDTO.getUserId());
        if(loginUser.getId() != articleDTO.getUserId()) throw new CustomException(HttpStatus.FORBIDDEN, "권한이 없습니다.");
        if(articleService.updateArticle(articleDTO))
            return ResponseEntity.ok(new Message("피드 수정 성공"));
        else return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    @DeleteMapping
    public ResponseEntity deleteArticle(@RequestBody ArticleDTO articleDTO, HttpRequest){
        long id = articleDTO.getId();
        UserDTO loginUser = (UserDTO)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(loginUser.getId() != id) throw new CustomException(HttpStatus.FORBIDDEN, "권한이 없습니다.");

        articleService.deleteArticle(id);
        return ResponseEntity.status(HttpStatus.OK).body(new Message("피드 삭제 완료"));
    }

    @GetMapping("/subscribe")
    public ResponseEntity readArticle(){
        UserDTO loginUser = (UserDTO)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        long id = loginUser.getId();

        Page<ArticleEntity> articleList = articleService.readArticle(id);
        return ResponseEntity.ok(articleList);

    }
}
