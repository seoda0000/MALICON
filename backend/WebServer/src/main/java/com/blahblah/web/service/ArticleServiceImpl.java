package com.blahblah.web.service;

import com.blahblah.web.controller.exception.CustomException;
import com.blahblah.web.dto.request.ArticleDTO;
import com.blahblah.web.dto.request.CommentDTO;
import com.blahblah.web.dto.response.SubscribeArticleDTO;
import com.blahblah.web.entity.ArticleEntity;
import com.blahblah.web.entity.CommentEntity;
import com.blahblah.web.repository.ArticleRepository;
import com.blahblah.web.repository.CommentRepository;
import com.blahblah.web.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Transactional
@Service
@RequiredArgsConstructor
@Slf4j
public class ArticleServiceImpl implements ArticleService{

    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;

    private final CommentRepository commentRepository;

    @Override
    public ArticleEntity createArticle(ArticleDTO articleDTO) {
        ArticleEntity article = ArticleEntity.builder()
                .userEntity(userRepository.findById(articleDTO.getUserPK()).orElseThrow(()->new CustomException(HttpStatus.NOT_FOUND, "작성자가 유효하지 않습니다.")))
                .title(articleDTO.getTitle())
                .content(articleDTO.getContent())
                .build();

        return articleRepository.save(article);

    }

    @Override
    public boolean updateArticle(ArticleDTO articleDTO) {
        ArticleEntity article = articleRepository.findById(articleDTO.getId()).orElseThrow(()->new CustomException(HttpStatus.NOT_FOUND, "존재하지 않는 피드입니다."));
        ArticleEntity update = ArticleEntity.builder()
                .id(articleDTO.getId())
                .userEntity(article.getUserEntity())
                .title(articleDTO.getTitle()==null?article.getTitle():articleDTO.getTitle())
                .content(articleDTO.getContent()==null?article.getContent():articleDTO.getContent())
                .build();
        articleRepository.save(update);
        return true;
    }

    @Override
    public void deleteArticle(long id) {
        articleRepository.deleteById(id);
    }

    @Override
    public List<SubscribeArticleDTO> readArticle(long id) {

//        PageRequest pageRequest = PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, "create_date"));
//        List<ArticleEntity> lst = articleRepository.findAllBy(id, pageRequest);
        List<ArticleEntity> lst = articleRepository.findAllBy(id);
        List<SubscribeArticleDTO> DTOList = new ArrayList<>();
        for(ArticleEntity a: lst){
            List<CommentEntity> commentEntities = commentRepository.findAllByArticleId(a.getId());
            List<CommentDTO> commentDTOS = new ArrayList<>();
            for(CommentEntity c: commentEntities){
                commentDTOS.add(CommentDTO.builder()
                        .id(c.getId())
                        .articleId(c.getArticleEntity().getId())
                        .userPK(c.getUserEntity().getId())
                        .userId(c.getUserEntity().getUserId())
                        .content(c.getContent())
                        .avatar(c.getUserEntity().getAvatar())
                        .createDate(a.getCreateDate().toString())
                        .lastModifiedDate(a.getLastModifiedDate().toString())
                        .build()
                );
            }
            DTOList.add(SubscribeArticleDTO.builder()
                    .id(a.getId())
                    .userPK(a.getUserEntity().getId())
                    .userId(a.getUserEntity().getUserId())
                    .userNickName(a.getUserEntity().getNickName())
                    .avatar(a.getUserEntity().getAvatar())
                    .title(a.getTitle())
                    .content(a.getContent())
                    .createDate(a.getCreateDate().toString())
                    .lastModifiedDate(a.getLastModifiedDate().toString())
                    .commentList(commentDTOS)
                    .build()
            );
        }


        return DTOList;
    }


}
