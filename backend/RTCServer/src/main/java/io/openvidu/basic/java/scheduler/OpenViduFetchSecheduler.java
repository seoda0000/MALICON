package io.openvidu.basic.java.scheduler;

import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduException;
import io.openvidu.java.client.OpenViduHttpException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class OpenViduFetchSecheduler {

    private final OpenVidu openVidu;

    @Async
    @Scheduled(fixedDelay=60000)
    public void fetch(){
        try {
            openVidu.fetch();
        }catch (OpenViduException e){
            log.error("OpenVidu Fetch Failed.");
        }
    }
}
