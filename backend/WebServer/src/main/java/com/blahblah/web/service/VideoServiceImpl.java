package com.blahblah.web.service;

import com.blahblah.web.dto.response.VideoDTO;
import com.blahblah.web.entity.VideoEntity;
import com.blahblah.web.repository.CommentRepository;
import com.blahblah.web.repository.UserRepository;
import com.blahblah.web.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class VideoServiceImpl implements VideoService{
    private final UserRepository userRepository;
    private final VideoRepository videoRepository;

    private final CommentRepository commentRepository;


    @Override
    public VideoEntity createVideo(VideoDTO videoDTO) {
        VideoEntity v = VideoEntity.builder()
                .userId(videoDTO.getUserPK())
                .userEntity(userRepository.findById(videoDTO.getUserPK()).orElseThrow())
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
    public void deleteVideo(long id) {
        videoRepository.deleteById(id);
    }
}
