package io.openvidu.basic.java.service;

import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import org.springframework.stereotype.Service;

public interface RecordingService {
    public boolean deleteByRecordingId(String recordingId);
}
