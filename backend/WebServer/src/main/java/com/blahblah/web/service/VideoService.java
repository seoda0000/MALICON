package com.blahblah.web.service;

import com.blahblah.web.dto.response.VideoDTO;
import com.blahblah.web.entity.VideoEntity;

import java.util.List;

public interface VideoService {
    List<VideoDTO> readVideos(long userPK);

    List<VideoDTO> readMyVideos(long userPK);

    void deleteVideo(long id);
}
