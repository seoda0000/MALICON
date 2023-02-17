package io.openvidu.basic.java.controller;

import io.openvidu.basic.java.controller.exception.CustomException;
import io.openvidu.basic.java.dto.UserDto;
import io.openvidu.basic.java.dto.request.RoomUpdateDto;
import io.openvidu.basic.java.redis.entity.LiveRoomEntity;
import io.openvidu.basic.java.service.LiveRoomService;
import io.openvidu.basic.java.service.RecordingService;
import io.openvidu.basic.java.service.UserService;
import io.openvidu.basic.java.util.JwtUtil;
import io.openvidu.java.client.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
@Slf4j
@Transactional
public class RecordingController {

    private final OpenVidu openvidu;
    private final LiveRoomService liveRoomService;

    private final RecordingService recordingService;

    private final UserService userService;
    private final JwtUtil jwtUtil;

    @GetMapping(value = "/api/recording/{sessionId}")
    public ResponseEntity<?> startRecording(@PathVariable String sessionId, HttpServletRequest request) {
        log.info("\n----------- RECORDING START -----------");

        UserDto user = jwtUtil.getUserFromToken(request);

        if(!sessionId.startsWith(user.getUserId()))
            throw new CustomException(HttpStatus.FORBIDDEN, "권한이 없는 사용자입니다.");

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

    @DeleteMapping(value = "/api/recording/{recordingId}")
    public ResponseEntity<?> deleteRecording(@PathVariable String recordingId){
        log.info("delete recording start");
        if(recordingService.deleteByRecordingId(recordingId))
            return ResponseEntity.noContent().build();
        else return ResponseEntity.badRequest().build();
    }
}
