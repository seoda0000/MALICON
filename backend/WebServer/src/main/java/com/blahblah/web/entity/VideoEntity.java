package com.blahblah.web.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name ="videos")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VideoEntity extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;


    @Column(name = "user_id", insertable = false, updatable = false)
    private long userId;
    @ManyToOne(targetEntity = UserEntity.class,
    fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;

    @OneToMany(mappedBy = "videoEntity", cascade = CascadeType.REMOVE)
    private List<CommentEntity> comments;

    @Column(name = "title")
    private String title;

    @Column(name = "views")
    private long views;

    @Column(name = "path_url")
    private String pathUrl;
}
