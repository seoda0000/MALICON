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
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

@RequestMapping("/articles")
@RestController
@Slf4j
@RequiredArgsConstructor
public class ArticleController {
    private final ArticleService articleService;

    private final String filePath = "/var/blahblah/attachments/img/";

    @PostMapping
    public ResponseEntity insertArticle(@RequestPart("postData") @Validated ArticleDTO articleDTO, @RequestPart(value="files", required = false) MultipartFile file, HttpServletRequest request) throws Exception{
        long userId = JWTutil.getLongIdByAccessToken(request);
        if(articleDTO.getTitle().isEmpty() || articleDTO.getContent().isEmpty()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Message("빈 문자열"));
        }

        ArticleEntity result = null;
        if(file!=null) {
            String saveFolder = filePath;
            File folder = new File(saveFolder);
            String saveFileName = "";
            if(!folder.exists())
                folder.mkdirs();
            String originalFileName = file.getOriginalFilename();

            if(!originalFileName.isEmpty()){
                saveFileName = System.nanoTime()+originalFileName.substring(originalFileName.lastIndexOf('.'));
                file.transferTo(new File(folder, saveFileName));
            }

            ArticleDTO a = ArticleDTO.builder()
                    .title(articleDTO.getTitle())
                    .content(articleDTO.getContent())
                    .userPK(userId)
                    .filePath(folder+"/"+saveFileName)
                    .build();
            result = articleService.createArticle(a);
        } else{
            ArticleDTO a = ArticleDTO.builder()
                    .title(articleDTO.getTitle())
                    .content(articleDTO.getContent())
                    .userPK(userId)
                    .build();
            result = articleService.createArticle(a);
        }

        if (result == null) {
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR, "글 작성 실패");
        } else {
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


    @DeleteMapping("/{articleId}/{userPK}")
    public ResponseEntity deleteArticle(@PathVariable long articleId, @PathVariable long userPK, HttpServletRequest request){

        if(JWTutil.getLongIdByAccessToken(request) != userPK) throw new CustomException(HttpStatus.FORBIDDEN, "권한이 없습니다.");

        articleService.deleteArticle(articleId);
        return ResponseEntity.status(HttpStatus.OK).body(new Message("피드 삭제 완료"));
    }

    @GetMapping("/{size}/{page}")
    public ResponseEntity readArticle(@PathVariable long size, @PathVariable long page, HttpServletRequest request){
        long id = JWTutil.getLongIdByAccessToken(request);

        Page<SubscribeArticleDTO> articleList = articleService.readArticle(id, size, page);
        return ResponseEntity.ok(articleList);

    }

    @GetMapping("/{userPK}/{size}/{page}")
    public ResponseEntity readMyArticle(@PathVariable long userPK, @PathVariable long size, @PathVariable long page, HttpServletRequest request){
        long id = JWTutil.getLongIdByAccessToken(request);
        Page<SubscribeArticleDTO> articleList = articleService.readMyArticle(userPK, id, size, page);
        if(articleList.isEmpty()){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Message("피트 목록이 없습니다"));
        }
        return ResponseEntity.ok(articleList);
    }

    @RequestMapping("/loadfile.do")
    public ResponseEntity loadFile(@RequestParam("filePath") String filePath, HttpServletResponse response) throws IOException {
        response.setContentType("image/png");
        ServletOutputStream out = response.getOutputStream();
        FileInputStream f = new FileInputStream(filePath);
        int length;
        byte[] buffer = new byte[10];
        while((length=f.read(buffer))!=-1){
            out.write(buffer, 0, length);
        }
        return ResponseEntity.ok(new Message("파일로드"));
    }

}
