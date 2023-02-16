package io.openvidu.basic.java.redis.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;


import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name ="videos")
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
public class PreviousVideoEntity extends BaseEntity{

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
    @Column(name="hashtags", columnDefinition = "MEDIUMTEXT")
    private String hashTags;

    @ManyToOne(targetEntity = UserEntity.class,
            fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;

    @Builder.Default
    @OneToMany(mappedBy = "previousVideo",
            cascade = CascadeType.REMOVE,
            targetEntity = VideoHashtagEntity.class
    )
    private List<VideoHashtagEntity> hashTagList = new ArrayList<>();
}
