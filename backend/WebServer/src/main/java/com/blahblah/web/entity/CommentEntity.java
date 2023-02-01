package com.blahblah.web.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name ="comments")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentEntity extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(
            targetEntity = ArticleEntity.class,
            fetch = FetchType.LAZY
    )
    @JoinColumn(name = "article_id")
    private ArticleEntity articleEntity;

    @ManyToOne(
            targetEntity = UserEntity.class,
            fetch = FetchType.LAZY
    )
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;

//    @ManyToOne(
//            targetEntity = UserEntity.class,
//            fetch = FetchType.LAZY
//    )
//    @JoinColumn(name = "video_id")
//    private VideoEntity videoEntity;

    @Column(name = "content", length = 150, nullable = false)
    private String content;
}
