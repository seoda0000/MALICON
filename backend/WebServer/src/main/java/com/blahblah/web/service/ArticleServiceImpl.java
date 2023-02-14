package com.blahblah.web.service;

import com.blahblah.web.controller.exception.CustomException;
import com.blahblah.web.dto.FileInfoDTO;
import com.blahblah.web.dto.request.ArticleDTO;
import com.blahblah.web.dto.response.SubscribeArticleDTO;
import com.blahblah.web.entity.ArticleEntity;
import com.blahblah.web.entity.FileInfoEntity;
import com.blahblah.web.entity.LikeArticleEntity;
import com.blahblah.web.repository.ArticleRepository;
import com.blahblah.web.repository.FileInfoRepository;
import com.blahblah.web.repository.LikeArticleRepository;
import com.blahblah.web.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Transactional
@Service
@RequiredArgsConstructor
@Slf4j
public class ArticleServiceImpl implements ArticleService{

    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;
    private final LikeArticleRepository likeArticleRepository;
    private final FileInfoRepository fileInfoRepository;

    @Override
    public ArticleEntity createArticle(ArticleDTO articleDTO) {
        List<FileInfoEntity> fileInfos = new ArrayList<>();
        if(articleDTO.getFileInfos()!=null && !articleDTO.getFileInfos().isEmpty()){
            for(FileInfoDTO file : articleDTO.getFileInfos()){
                FileInfoEntity fileInfoEntity = FileInfoEntity.builder()
                        .saveFile(file.getSaveFile())
                        .originalFile(file.getOriginalFile())
                        .saveFolder(file.getSaveFolder())
                        .build();
                fileInfos.add(fileInfoEntity);
                fileInfoRepository.save(fileInfoEntity);
            }

        }
        ArticleEntity article = ArticleEntity.builder()
                .userEntity(userRepository.findById(articleDTO.getUserPK()).orElseThrow(()->new CustomException(HttpStatus.NOT_FOUND, "작성자가 유효하지 않습니다.")))
                .title(articleDTO.getTitle())
                .content(articleDTO.getContent())
                .files(fileInfos)
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
    public Page<SubscribeArticleDTO> readArticle(long id, long size, long page) {

        PageRequest pageRequest = PageRequest.of((int)page, (int)size, Sort.by(Sort.Direction.DESC, "create_date"));
        Page<ArticleEntity> result = articleRepository.findAllBy(id, pageRequest);

        List<LikeArticleEntity> likeEntities =  likeArticleRepository.findAllByUserId(id);
        List<Long> likes = new ArrayList<>();
        for(LikeArticleEntity like: likeEntities){
            likes.add(like.getArticleEntity().getId());
        }
        List<LikeArticleEntity> list = likeArticleRepository.findAllBy();
        List<Long> articleList = new ArrayList<>();
        for(LikeArticleEntity article: list){
            articleList.add(article.getArticleEntity().getId());
        }
        Page<SubscribeArticleDTO> DTOList = new SubscribeArticleDTO().toDtoList(result, likes, articleList);

        return DTOList;
    }

    @Override
    public Page<SubscribeArticleDTO> readMyArticle(long userPK, long id, long size, long page) {
        PageRequest pageRequest = PageRequest.of((int)page, (int)size, Sort.by(Sort.Direction.DESC, "createDate"));

        Page<ArticleEntity> result = articleRepository.findAllByUserId(userPK, pageRequest);
        List<LikeArticleEntity> likeEntities =  likeArticleRepository.findAllByUserId(id);
        List<LikeArticleEntity> list = likeArticleRepository.findAllBy();
        List<Long> likes = new ArrayList<>();
        for(LikeArticleEntity like: likeEntities){
            likes.add(like.getArticleEntity().getId());
        }
        List<Long> articleList = new ArrayList<>();
        for(LikeArticleEntity article: list){
            articleList.add(article.getArticleEntity().getId());
        }
        Page<SubscribeArticleDTO> articles = new SubscribeArticleDTO().toDtoList(result, likes, articleList);

        return articles;
    }


}
