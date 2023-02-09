package com.blahblah.web.service;

import com.blahblah.web.dto.response.VideoDTO;
import com.blahblah.web.entity.VideoEntity;
import org.springframework.data.domain.Page;

public interface VideoService {

    VideoEntity createVideo(VideoDTO videoDTO);

    Page<VideoDTO> readVideos(long userPK, long size, long page);

    Page<VideoDTO> readMyVideos(long userPK, long size, long page);

    Page<VideoDTO> readAllVideos(long size, long page);

    VideoDTO getVideo(long videoId, long userPK);

    void deleteVideo(long id);

}
