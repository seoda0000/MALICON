package io.openvidu.basic.java.redis.entity;

import lombok.*;


import javax.persistence.*;

@Entity
@Table(name ="previousvideos")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PreviousVideoEntity {

    @Id
    @Column(name = "recording_id")
    private String recordingId;
    @Column(name = "title", nullable = false)
    private String title;
    @Column(name = "session_id", nullable = false)
    private String sessionId;
    @Column(name = "create_at", nullable = false)
    private Long createAt;
    @Column(name = "url", nullable = false, unique = true)
    private String url;
    @Column(name = "play_time", nullable = false)
    private Double playTime;
    @Column(name = "video_like", nullable = false)
    private int videoLike;
    @Column(name = "thumbnail", nullable=false)
    private String thumbnail;

}
