package com.blahblah.web.service;

import com.blahblah.web.controller.exception.CustomException;
import com.blahblah.web.dto.request.CommentDTO;
import com.blahblah.web.dto.response.VideoDTO;
import com.blahblah.web.entity.VideoEntity;
import com.blahblah.web.repository.UserRepository;
import com.blahblah.web.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class VideoServiceImpl implements VideoService{
    private final UserRepository userRepository;
    private final VideoRepository videoRepository;

    @Override
    public VideoEntity createVideo(VideoDTO videoDTO) {
        VideoEntity v = VideoEntity.builder()
                .userId(videoDTO.getUserPK())
                .userEntity(userRepository.findById(videoDTO.getUserPK()).orElseThrow(()->new CustomException(HttpStatus.NOT_FOUND, "사용자가 유효하지 않습니다.")))
                .title(videoDTO.getTitle())
                .views(0)
                .pathUrl(videoDTO.getPathUrl())
                .build();
        return videoRepository.save(v);
    }

    @Override
    public Page<VideoDTO> readVideos(long userPK) {
        PageRequest pageRequest = PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, "createDate"));

        Page<VideoEntity> result = videoRepository.findAllBy(userPK, pageRequest);
        Page<VideoDTO> videos = new VideoDTO().toDtoList(result);

        return videos;
    }

    @Override
    public Page<VideoDTO> readMyVideos(long userPK) {
        PageRequest pageRequest = PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, "createDate"));

        Page<VideoEntity> result = videoRepository.findAllByUserId(userPK, pageRequest);
        Page<VideoDTO> videos = new VideoDTO().toDtoList(result);

        return videos;
    }

    @Override
    public VideoDTO getVideo(long videoId) {
        PageRequest pageRequest = PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, "createDate"));
        int start = (int) pageRequest.getOffset();
        int end = start+pageRequest.getPageSize();

        VideoEntity v = videoRepository.findById(videoId).orElseThrow(()->new CustomException(HttpStatus.NOT_FOUND, "찾는 비디오가 유효하지 않습니다."));

        videoRepository.updateViewsById(v.getId());

        VideoDTO video = VideoDTO.builder()
                .id(v.getId())
                .avatar(v.getUserEntity().getAvatar())
                .nickName(v.getUserEntity().getNickName())
                .userId(v.getUserEntity().getUserId())
                .userPK(v.getUserId())
                .pathUrl(v.getPathUrl())
                .comments(new CommentDTO().toVDtoList(new PageImpl<>(v.getComments().subList(start, Math.min(end, v.getComments().size())), pageRequest, v.getComments().size())))
                .title(v.getTitle())
                .createDate(v.getCreateDate().toString())
                .views(v.getViews()+1)
                .build();

        return video;
    }


    @Override
    public void deleteVideo(long id) {
        videoRepository.deleteById(id);
    }
}
