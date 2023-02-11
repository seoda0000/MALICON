package io.openvidu.basic.java.controller;

import io.openvidu.basic.java.controller.exception.CustomException;
import io.openvidu.basic.java.dto.request.RoomUpdateDto;
import io.openvidu.basic.java.dto.request.StartRecordDto;
import io.openvidu.basic.java.dto.request.StopRecordDto;
import io.openvidu.basic.java.redis.entity.LiveRoomEntity;
import io.openvidu.basic.java.redis.entity.PreviousVideoEntity;
import io.openvidu.basic.java.redis.repository.LiveRoomRepository;
import io.openvidu.basic.java.redis.repository.PreviousVideoRepository;
import io.openvidu.basic.java.service.LiveRoomService;
import io.openvidu.java.client.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequiredArgsConstructor
@Slf4j
@Transactional
public class RecordingController {

    private final OpenVidu openvidu;
    private final LiveRoomService liveRoomService;

    @GetMapping(value = "/api/recording/{sessionId}")
    public ResponseEntity<?> startRecording(@PathVariable String sessionId) {
        log.info("\n----------- RECORDING START -----------");

        log.info("받아온 sessionId : "+sessionId);
        //비디오를 저장할 때 옵션 관리
        RecordingProperties properties = new RecordingProperties
                .Builder()
                .outputMode(Recording.OutputMode.COMPOSED)
                .hasAudio(true)
                .hasVideo(true)
                .build();

        LiveRoomEntity liveRoomEntity = liveRoomService.findBySessionId(sessionId);

        if(liveRoomEntity.getRecordingId() != null)
            throw new CustomException(HttpStatus.BAD_REQUEST, "이미 녹화 중입니다.");

        try {
            Recording recording = openvidu.startRecording(sessionId, properties);
            // url 확인 출력
            log.info("start recording : " + recording.getUrl());
            liveRoomService.updateRoom(sessionId, new RoomUpdateDto(null,null),recording);

            return new ResponseEntity<>(recording, HttpStatus.OK);
        } catch (OpenViduJavaClientException | OpenViduHttpException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
