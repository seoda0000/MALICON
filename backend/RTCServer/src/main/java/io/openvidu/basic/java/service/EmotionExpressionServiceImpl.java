package io.openvidu.basic.java.service;

import io.openvidu.basic.java.dto.EmotionExpressionDto;
import io.openvidu.basic.java.redis.entity.LiveRoomEntity;
import io.openvidu.basic.java.redis.repository.LiveRoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.influxdb.dto.BoundParameterQuery;
import org.influxdb.dto.Point;
import org.influxdb.dto.Query;
import org.influxdb.dto.QueryResult;
import org.influxdb.impl.InfluxDBResultMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.influxdb.InfluxDBTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmotionExpressionServiceImpl implements EmotionExpressionService {
    private final InfluxDBTemplate<Point> influxDBTemplate;
    private final LiveRoomRepository liveRoomRepository;
    @Value("${spring.influxdb.database}")
    private String databaseName;

    public void write(String sessionId, EmotionExpressionDto emotionExpressionDto) {

        LiveRoomEntity liveRoomEntity = liveRoomRepository.findById(sessionId).orElseThrow();
        emotionExpressionDto.setTimestamp(LocalDateTime.now().toInstant(ZoneOffset.of("+9")).toEpochMilli() - liveRoomEntity.getStartAt());

        Point point = Point.measurement(sessionId)
                .addFieldsFromPOJO(emotionExpressionDto)
                .build();

        influxDBTemplate.write(point);
    }
    
    public List<EmotionExpressionDto> select(String sessionId) {

        StringBuilder sb = new StringBuilder();
        sb.append("select * from ").append(sessionId);
        Query query = BoundParameterQuery.QueryBuilder.newQuery(sb.toString()).forDatabase(databaseName).create();

        QueryResult queryResult = influxDBTemplate.query(query);

        InfluxDBResultMapper resultMapper = new InfluxDBResultMapper();
        return resultMapper.toPOJO(queryResult, EmotionExpressionDto.class, sessionId);
    }

    public List<EmotionExpressionDto> select(String sessionId, int from, int count) {

        StringBuilder sb = new StringBuilder();
        sb.append("select * from ").append(sessionId).append(" limit ").append(count).append(" offset ").append(from);
        Query query = BoundParameterQuery.QueryBuilder.newQuery(sb.toString()).forDatabase(databaseName).create();

        QueryResult queryResult = influxDBTemplate.query(query);

        InfluxDBResultMapper resultMapper = new InfluxDBResultMapper();
        return resultMapper.toPOJO(queryResult, EmotionExpressionDto.class, sessionId);
    }
}