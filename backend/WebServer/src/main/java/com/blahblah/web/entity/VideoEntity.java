package com.blahblah.web.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name ="videos")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@DynamicUpdate
public class VideoEntity extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name="recoding_id")
    private String recodingId;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name="session_id", nullable=false)
    private String sessionId;

    @Column(name="time_stamp", nullable = false)
    private Long timeStamp;

    @Column(name = "views")
    @ColumnDefault("0")
    private long views;

    @Column(name = "path_url")
    private String pathUrl;

    @Column(name="play_time")
    private Double playTime;

    @Column(name="thumbnail")
    private String thumbnail;

    @Column(name="hashtags")
    private String hashtags;

    @Column(name = "user_id", insertable = false, updatable = false)
    private long userId;
    @ManyToOne(targetEntity = UserEntity.class,
    fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;

    @OneToMany(mappedBy = "videoEntity", cascade = CascadeType.REMOVE)
    private List<CommentEntity> comments;

}
