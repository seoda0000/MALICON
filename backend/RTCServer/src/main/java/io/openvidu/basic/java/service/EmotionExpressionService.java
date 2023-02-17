package io.openvidu.basic.java.service;

import io.openvidu.basic.java.config.InfluxDBConfig;
import io.openvidu.basic.java.dto.EmotionExpressionDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface EmotionExpressionService {
    public void write(String sessionId, EmotionExpressionDto emotionExpressionDto);
    public List<EmotionExpressionDto> select(String sessionId);
    public List<EmotionExpressionDto> select(String sessionId, int from, int count);
}
