package com.blahblah.web.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name ="like_videos")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@IdClass(LikeVideoEntityPK.class)
public class LikeVideoEntity {
    @Id
    @ManyToOne(
            targetEntity = UserEntity.class,
            fetch = FetchType.LAZY
    )
    @JoinColumn(name="user_id")
    private UserEntity userEntity;

    @Id
    @ManyToOne(
            targetEntity = VideoEntity.class,
            fetch = FetchType.LAZY
    )
    @JoinColumn(name="video_id")
    private VideoEntity videoEntity;
}
