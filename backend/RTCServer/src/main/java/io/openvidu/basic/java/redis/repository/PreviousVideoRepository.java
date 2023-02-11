package io.openvidu.basic.java.redis.repository;


import io.openvidu.basic.java.redis.entity.PreviousVideoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PreviousVideoRepository extends JpaRepository<PreviousVideoEntity, Long> {

    List<PreviousVideoEntity> findAllBySessionId(String sessionId);
    void deleteByRecordingId(String recordingId);
}
