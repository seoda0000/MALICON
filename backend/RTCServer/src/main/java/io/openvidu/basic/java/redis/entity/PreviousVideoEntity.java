package io.openvidu.basic.java.redis.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;


import javax.persistence.*;
import java.util.List;

@Entity
@Table(name ="videos")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PreviousVideoEntity extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 이거 필요 없음
    @Column(name = "recording_id")
    private String recordingId;
    @Column(name = "title", nullable = false)
    private String title;
    @Column(name = "session_id", nullable = false)
    private String sessionId;
    @Column(name = "time_stamp", nullable = false)
    private Long timeStamp;
    @Column(name = "views", nullable = false)
    @ColumnDefault("0")
    private int views;
    @Column(name = "path_url", nullable = false, unique = true)
    private String pathUrl;
    @Column(name = "play_time", nullable = false)
    private Double playTime;
    @Column(name = "thumbnail", nullable=false)
    private String thumbnail;
    @Column(name="hashtags")
    private String hashTags;
    @Column(name = "user_id", insertable = false, updatable = false)
    private Long userId;
}
