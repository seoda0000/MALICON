package io.openvidu.basic.java.redis.repository;

import io.openvidu.basic.java.redis.entity.LiveRoomEntity;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;


@EnableRedisRepositories
public interface LiveRoomRepository extends CrudRepository<LiveRoomEntity, String> {

    /**
     * 필요한 함수
     1. 방 추가
     2. 방 삭제
     3. 방 조회
     4. 방 있는지 확인 후 리턴
     */

    Optional<LiveRoomEntity> findByTitle(String title);

    boolean existsByTitle(String title);

    void deleteByTitle(String title);

    boolean existsByStreamer(String streamer);
}
