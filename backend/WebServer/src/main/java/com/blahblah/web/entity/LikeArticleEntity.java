package com.blahblah.web.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name ="like_articles")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@IdClass(LikeArticleEntityPK.class)
public class LikeArticleEntity {

    @Column(name = "user_id", insertable = false, updatable = false)
    private long userId;

    @Id
    @ManyToOne(
            targetEntity = UserEntity.class,
            fetch = FetchType.LAZY
    )
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;

    @Id
    @ManyToOne(
            targetEntity = ArticleEntity.class,
            fetch = FetchType.LAZY
    )
    @JoinColumn(name = "article_id")
    private ArticleEntity articleEntity;

}
