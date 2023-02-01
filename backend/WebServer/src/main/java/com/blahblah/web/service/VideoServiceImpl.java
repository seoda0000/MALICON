package com.blahblah.web.service;

import com.blahblah.web.dto.request.CommentDTO;
import com.blahblah.web.dto.response.VideoDTO;
import com.blahblah.web.entity.CommentEntity;
import com.blahblah.web.entity.VideoEntity;
import com.blahblah.web.repository.CommentRepository;
import com.blahblah.web.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class VideoServiceImpl implements VideoService{
    private final VideoRepository videoRepository;

    private final CommentRepository commentRepository;
    @Override
    public List<VideoDTO> readVideos(long userPK) {
        List<VideoEntity> result = videoRepository.findAllBy(userPK);
        List<VideoDTO> videos = new ArrayList<>();
        for(VideoEntity v: result){
//            List<CommentEntity> commentEntities = commentRepository.findAllByArticleId(v.getId());
//            List<CommentDTO> commentDaTOS = new ArrayList<>();
//            for(CommentEntity c: commentEntities){
//                commentDTOS.add(CommentDTO.builder()
//                        .id(c.getId())
//                        .articleId(c.getArticleEntity().getId())
//                        .userPK(c.getUserEntity().getId())
//                        .userId(c.getUserEntity().getUserId())
//                        .content(c.getContent())
//                        .avatar(c.getUserEntity().getAvatar())
//                        .createDate(v.getCreateDate().toString())
//                        .lastModifiedDate(v.getLastModifiedDate().toString())
//                        .build()
//                );
//            }
            videos.add(VideoDTO.builder()
                            .title(v.getTitle())
//                            .views(v.getViews())
                            .nickName(v.getUserEntity().getNickName())
                            .avatar(v.getUserEntity().getAvatar())
                            .userPK(v.getUserEntity().getId())
                            .pathUrl(v.getPathUrl())
                            .createDate(v.getCreateDate().toString())
                            .userId(v.getUserEntity().getUserId())
//                            .comments(v.getComments())
                    .build());
        }

        return videos;
    }

    @Override
    public List<VideoDTO> readMyVideos(long userPK) {
        List<VideoEntity> result = videoRepository.findAllByUserId(userPK);
        List<VideoDTO> videos = new ArrayList<>();
        for(VideoEntity v: result){
//            List<CommentEntity> commentEntities = commentRepository.findAllByArticleId(v.getId());
//            List<CommentDTO> commentDTOS = new ArrayList<>();
//            for(CommentEntity c: commentEntities){
//                commentDTOS.add(CommentDTO.builder()
//                        .id(c.getId())
//                        .articleId(c.getArticleEntity().getId())
//                        .userPK(c.getUserEntity().getId())
//                        .userId(c.getUserEntity().getUserId())
//                        .content(c.getContent())
//                        .avatar(c.getUserEntity().getAvatar())
//                        .createDate(v.getCreateDate().toString())
//                        .lastModifiedDate(v.getLastModifiedDate().toString())
//                        .build()
//                );
//            }
            videos.add(VideoDTO.builder()
                    .title(v.getTitle())
//                    .views(v.getViews())
                    .nickName(v.getUserEntity().getNickName())
                    .avatar(v.getUserEntity().getAvatar())
                    .userPK(v.getUserEntity().getId())
                    .pathUrl(v.getPathUrl())
                    .createDate(v.getCreateDate().toString())
                    .userId(v.getUserEntity().getUserId())
//                    .comments(v.getComments())
                    .build());
        }
        return videos;
    }

    @Override
    public void deleteVideo(long id) {
        videoRepository.deleteById(id);
    }
}
