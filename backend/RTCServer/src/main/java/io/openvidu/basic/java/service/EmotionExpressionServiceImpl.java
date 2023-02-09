package io.openvidu.basic.java.service;

import com.influxdb.query.dsl.Flux;
import com.influxdb.query.dsl.functions.restriction.Restrictions;
import io.openvidu.basic.java.dto.EmotionExpressionDto;
import lombok.extern.slf4j.Slf4j;
import org.influxdb.dto.BoundParameterQuery;
import org.influxdb.dto.Point;
import org.influxdb.dto.Query;
import org.influxdb.dto.QueryResult;
import org.influxdb.impl.InfluxDBResultMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.influxdb.InfluxDBTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Slf4j
@Service
public class EmotionExpressionServiceImpl implements EmotionExpressionService {
    @Autowired
    private final InfluxDBTemplate<Point> influxDBTemplate;
    private String databaseName;

    public EmotionExpressionServiceImpl(InfluxDBTemplate<Point> influxDBTemplate,  @Value("${spring.influxdb.database}") String databaseName) {
        this.influxDBTemplate = influxDBTemplate;
        this.databaseName = databaseName;
    }

    @PostConstruct

    public void write(String sessionId, EmotionExpressionDto emotionExpressionDto) {
        Point point = Point.measurement(sessionId)
                .addFieldsFromPOJO(emotionExpressionDto)
                .build();

        influxDBTemplate.write(point);
    }

    @Override
    public List<EmotionExpressionDto> select(String sessionId) {

        StringBuilder sb = new StringBuilder();
        sb.append("select * from ").append(sessionId);
        Query query = BoundParameterQuery.QueryBuilder.newQuery(sb.toString()).forDatabase(databaseName).create();

        QueryResult queryResult = influxDBTemplate.query(query);
        log.info("here =>" + queryResult.toString());

        InfluxDBResultMapper resultMapper = new InfluxDBResultMapper();
        return resultMapper.toPOJO(queryResult, EmotionExpressionDto.class, sessionId);
    }
}