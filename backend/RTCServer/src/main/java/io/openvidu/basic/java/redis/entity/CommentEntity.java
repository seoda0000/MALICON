package io.openvidu.basic.java.redis.entity;



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

    @Column(name = "article_id", insertable = false, updatable = false, nullable = true)
    private Long articleId;
    @ManyToOne(
            targetEntity = ArticleEntity.class,
            fetch = FetchType.LAZY
    )
    @JoinColumn(name = "article_id", nullable = true)
    private ArticleEntity articleEntity;


    @ManyToOne(
            targetEntity = UserEntity.class,
            fetch = FetchType.LAZY
    )
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;

    @Column(name = "video_id", insertable = false, updatable = false, nullable = true)
    private Long videoId;
    @ManyToOne(
            targetEntity = PreviousVideoEntity.class,
            fetch = FetchType.LAZY
    )
    @JoinColumn(name = "video_id", nullable = true)
    private PreviousVideoEntity videoEntity;


    @Column(name = "content", length = 150, nullable = false)
    private String content;
}
