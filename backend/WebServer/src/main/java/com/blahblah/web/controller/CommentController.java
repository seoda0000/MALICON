package com.blahblah.web.controller;

import com.blahblah.web.controller.exception.CustomException;
import com.blahblah.web.dto.request.CommentDTO;
import com.blahblah.web.dto.response.Message;
import com.blahblah.web.entity.CommentArticleEntity;
import com.blahblah.web.entity.CommentVideoEntity;
import com.blahblah.web.service.CommentService;
import com.blahblah.web.util.JWTutil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
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

    @PostMapping("/articles")
    public ResponseEntity insertArticleComment(@RequestBody CommentDTO comment, HttpServletRequest request){
        long userId = JWTutil.getLongIdByAccessToken(request);
        if(comment.getContent().isEmpty()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Message("댓글 내용이 없습니다."));
        }
        CommentDTO commentDTO = CommentDTO.builder()
                .userPK(userId)
                .articleId(comment.getArticleId())
                .content(comment.getContent())
                .build();
        CommentArticleEntity result = commentService.createArticleComment(commentDTO);
        if(result==null){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Message("댓글 작성 실패"));
        }else{
            return ResponseEntity.status(HttpStatus.OK).body(new Message("댓글 작성 완료"));
        }
    }

    @PostMapping("/videos")
    public ResponseEntity insertVideoComment(@RequestBody CommentDTO comment, HttpServletRequest request){
        long userId = JWTutil.getLongIdByAccessToken(request);
        if(comment.getContent().isEmpty()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Message("댓글 내용이 없습니다."));
        }
        CommentDTO commentDTO = CommentDTO.builder()
                .userPK(userId)
                .videoId(comment.getVideoId())
                .content(comment.getContent())
                .build();
        CommentVideoEntity result = commentService.createVideoComment(commentDTO);
        if(result==null){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Message("댓글 작성 실패"));
        }else{
            return ResponseEntity.status(HttpStatus.OK).body(new Message("댓글 작성 완료"));
        }
    }

    @GetMapping("articles/{articleId}/{size}/{page}")
    public ResponseEntity getArticleComments(@PathVariable long articleId, @PathVariable long size, @PathVariable long page){
        Page<CommentDTO> commentList = commentService.readArticleComments(articleId, size, page);
        if(commentList.isEmpty()){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Message("작성된 댓글이 없습니다."));
        }
        return ResponseEntity.ok(commentList);
    }

    @GetMapping("videos/{videoId}/{size}/{page}")
    public ResponseEntity getVideoComments(@PathVariable long videoId, @PathVariable long size, @PathVariable long page){
        Page<CommentDTO> commentList = commentService.readVideoComments(videoId, size, page);
        if(commentList.isEmpty()){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Message("작성된 댓글이 없습니다."));
        }
        return ResponseEntity.ok(commentList);
    }


    @DeleteMapping("articles/{commentId}/{userPK}")
    public ResponseEntity deleteArticleComment(@PathVariable long commentId, @PathVariable long userPK, HttpServletRequest request){
        long userId = JWTutil.getLongIdByAccessToken(request);
        if(userPK!= userId) throw new CustomException(HttpStatus.FORBIDDEN, "권한이 없습니다.");

        commentService.deleteArticleComment(commentId);
        return ResponseEntity.status(HttpStatus.OK).body(new Message("댓글 삭제 완료"));
    }

    @DeleteMapping("videos/{commentId}/{userPK}")
    public ResponseEntity deleteVideoComment(@PathVariable long commentId, @PathVariable long userPK, HttpServletRequest request){
        long userId = JWTutil.getLongIdByAccessToken(request);
        if(userPK!= userId) throw new CustomException(HttpStatus.FORBIDDEN, "권한이 없습니다.");

        commentService.deleteVideoComment(commentId);
        return ResponseEntity.status(HttpStatus.OK).body(new Message("댓글 삭제 완료"));
    }
}
