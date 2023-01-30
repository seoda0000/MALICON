package com.blahblah.web.controller;

import com.blahblah.web.controller.exception.CustomException;
import com.blahblah.web.dto.request.CommentDTO;
import com.blahblah.web.dto.response.Message;
import com.blahblah.web.entity.CommentEntity;
import com.blahblah.web.service.CommentService;
import com.blahblah.web.util.JWTutil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RequestMapping("/comments")
@RestController
@Slf4j
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping
    public ResponseEntity insertComment(@RequestBody CommentDTO comment, HttpServletRequest request){
        long userId = JWTutil.getLongIdByAccessToken(request);
        if(comment.getContent().isEmpty()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Message("댓글 내용이 없습니다."));
        }
        CommentDTO commentDTO = CommentDTO.builder().userPK(userId).articleId(comment.getArticleId()).content(comment.getContent()).build();
        CommentEntity result = commentService.createComment(commentDTO);
        if(result==null){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Message("댓글 작성 실패"));
        }else{
            return ResponseEntity.status(HttpStatus.OK).body(new Message("댓글 작성 완료"));
        }
    }

    @DeleteMapping
    public ResponseEntity deleteComment(@RequestBody CommentDTO commentDTO, HttpServletRequest request){
        long userId = JWTutil.getLongIdByAccessToken(request);
        if(commentDTO.getUserPK()!= userId) throw new CustomException(HttpStatus.FORBIDDEN, "권한이 없습니다.");

        commentService.deleteComment(commentDTO.getId());
        return ResponseEntity.status(HttpStatus.OK).body(new Message("댓글 삭제 완료"));
    }
}
