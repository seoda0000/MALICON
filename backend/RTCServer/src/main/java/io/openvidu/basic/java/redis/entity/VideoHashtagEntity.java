package io.openvidu.basic.java.redis.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name ="video_hashtags")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class VideoHashtagEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "_key", nullable = false)
    private Integer key;

    @Column(name = "video_id", insertable = false, updatable = false)
    private Long videoId;
    @ManyToOne(
        targetEntity = PreviousVideoEntity.class,
            fetch = FetchType.LAZY
    )
    @JoinColumn(name = "video_id")
    private PreviousVideoEntity previousVideo;
}
