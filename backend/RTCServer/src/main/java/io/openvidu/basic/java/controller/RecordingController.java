package io.openvidu.basic.java.controller;

import io.openvidu.basic.java.dto.request.StartRecordDto;
import io.openvidu.basic.java.dto.request.StopRecordDto;
import io.openvidu.basic.java.redis.entity.PreviousVideoEntity;
import io.openvidu.basic.java.redis.repository.PreviousVideoRepository;
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

    private final PreviousVideoRepository previousVideoRepository;

    private Map<String, Boolean> sessionRecordings = new ConcurrentHashMap<>();


    //*********************
    //**** recording API **
    //*********************


    @PostMapping(value = "/api/recording/start")
    public ResponseEntity<?> startRecording(@RequestBody StartRecordDto startRecordDto) {
        log.info("\n----------- RECORDING START -----------");

        String sessionId = startRecordDto.getSessionId();

        log.info("받아온 sessionId : "+sessionId);
        //비디오를 저장할 때 옵션 관리
        RecordingProperties properties = new RecordingProperties
                .Builder()
                .outputMode(Recording.OutputMode.COMPOSED)
                .hasAudio(true)
                .hasVideo(true)
                .build();

        if(sessionRecordings.get(sessionId)){
            return new ResponseEntity<>("이미 녹음중 입니다.", HttpStatus.ALREADY_REPORTED);
        }

        try {
            Recording recording = openvidu.startRecording(sessionId, properties);
            // url 확인 출력
            log.info("start recording : " + recording.getUrl());
            sessionRecordings.put(sessionId, true);

            return new ResponseEntity<>(recording, HttpStatus.OK);
        } catch (OpenViduJavaClientException | OpenViduHttpException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }



    @PostMapping(value = "/api/recording/stop")
    public ResponseEntity<?> stopRecording(@RequestBody StopRecordDto stopRecordDto) {
        log.info("\n----------- RECORDING stop -----------");
        String recordingId = stopRecordDto.getRecordingId();
        String title = stopRecordDto.getTitle();
        String thumbnail = stopRecordDto.getThumbnail();
        String hashTags = stopRecordDto.getHashTags();
        Long userId = stopRecordDto.getUser_id();

        log.info("recordingId : " + recordingId +  ",  title : "+title);

        try {
            //녹화를 저장함과 동시에 정보추출
            Recording recording = openvidu.stopRecording(recordingId);
            sessionRecordings.remove(recording.getSessionId());

            //추철한정보를 객체에 담아 jpa로 저장한다.
            String url = recording.getUrl();
            Long createAt = recording.getCreatedAt();
            Double playTime = recording.getDuration();
            String id = recording.getId();
            String sessionId = recording.getSessionId();


            PreviousVideoEntity previousVideoEntity = PreviousVideoEntity.builder()
                    .recordingId(id)
                    .title(title)
                    .sessionId(sessionId)
                    .timeStamp(createAt)
                    .playTime(playTime)
                    .pathUrl(url)
                    .thumbnail(thumbnail)
                    .hashTags(hashTags)
                    .userId(userId)
                    .build();

            log.info("저장될 지난영상정보 : "+previousVideoEntity.toString());
            previousVideoRepository.save(previousVideoEntity);

            return new ResponseEntity<>(previousVideoEntity, HttpStatus.OK);
        } catch (OpenViduJavaClientException | OpenViduHttpException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping(value = "/api/recording/delete/{recordingId}")
    public ResponseEntity<?> deleteRecording(@PathVariable("recordingId")String recordingId) {
        log.info("\n----------- DELETE RECORDING START -----------");

        System.out.println("Deleting recording | {recordingId}=" + recordingId);

        try {
            this.openvidu.deleteRecording(recordingId);
            previousVideoRepository.deleteByRecordingId(recordingId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (OpenViduJavaClientException | OpenViduHttpException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }



    //*********************
    //**** recording API **
    //*********************

}
