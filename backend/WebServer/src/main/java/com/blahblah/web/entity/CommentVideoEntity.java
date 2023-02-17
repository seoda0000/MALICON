package com.blahblah.web.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name ="video_comments")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentVideoEntity extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(
            targetEntity = UserEntity.class,
            fetch = FetchType.LAZY
    )
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;

    @Column(name = "video_id", insertable = false, updatable = false, nullable = true)
    private Long videoId;
    @ManyToOne(
            targetEntity = VideoEntity.class,
            fetch = FetchType.LAZY
    )
    @JoinColumn(name = "video_id")
    private VideoEntity videoEntity;


    @Column(name = "content", length = 150, nullable = false)
    private String content;
}
