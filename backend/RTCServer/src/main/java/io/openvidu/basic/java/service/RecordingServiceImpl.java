package io.openvidu.basic.java.service;

import io.openvidu.basic.java.redis.repository.PreviousVideoRepository;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class RecordingServiceImpl implements RecordingService{
    private final OpenVidu openVidu;
    private final PreviousVideoRepository previousVideoRepository;

    @Override
    public boolean deleteByRecordingId(String recordingId){
        previousVideoRepository.deleteByRecordingId(recordingId);
        try {
            openVidu.deleteRecording(recordingId);
        }catch (OpenViduJavaClientException | OpenViduHttpException e){
            return false;
        }
        return true;
    }
}
