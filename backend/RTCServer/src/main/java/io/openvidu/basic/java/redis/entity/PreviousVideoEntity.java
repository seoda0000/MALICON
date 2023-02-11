package io.openvidu.basic.java.redis.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;


import javax.persistence.*;

@Entity
@Table(name ="videos")
@NoArgsConstructor
public class PreviousVideoEntity extends BaseEntity{

    @Builder
    public PreviousVideoEntity(Long id, String recordingId, String title, String sessionId, Long timeStamp, Long views, String pathUrl, Double playTime, String thumbnail, String hashTags, UserEntity userEntity) {
        this.id = id;
        this.recordingId = recordingId;
        this.title = title;
        this.sessionId = sessionId;
        this.timeStamp = timeStamp;
        this.views = views;
        this.pathUrl = pathUrl;
        this.playTime = playTime;
        this.thumbnail = thumbnail;
        this.hashTags = hashTags;
        this.userEntity = userEntity;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "recoding_id")
    private String recordingId;
    @Column(name = "title", nullable = false)
    private String title;
    @Column(name = "session_id", nullable = false)
    private String sessionId;
    @Column(name = "time_stamp", nullable = false)
    private Long timeStamp;
    @Column(name = "views", nullable = false)
    @ColumnDefault("0")
    private Long views;
    @Column(name = "path_url", nullable = false, unique = true)
    private String pathUrl;
    @Column(name = "play_time", nullable = false)
    private Double playTime;
    @Column(name = "thumbnail", nullable=false, columnDefinition = "MEDIUMTEXT")
    private String thumbnail;
    @Column(name="hashtags")
    private String hashTags;

    @ManyToOne(targetEntity = UserEntity.class,
            fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;
}
