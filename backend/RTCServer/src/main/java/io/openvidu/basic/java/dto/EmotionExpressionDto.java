package io.openvidu.basic.java.dto;

import org.influxdb.annotation.Measurement;
import lombok.*;
import org.influxdb.annotation.Column;
import org.influxdb.annotation.TimeColumn;

import java.time.Instant;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
@Data
public class EmotionExpressionDto {
    @TimeColumn
    @Column(name = "time")
    private Instant time;
    @Column(name = "avatar")
    private String avatar;
    @Column(name= "type")
    private String type;
}
