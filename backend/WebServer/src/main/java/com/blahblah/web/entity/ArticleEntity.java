package com.blahblah.web.entity;


import com.blahblah.web.dto.request.ArticleDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name ="articles")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ArticleEntity extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    Long id;


    @Column(name = "user_id", insertable = false, updatable = false)
    private long userId;
    @ManyToOne(
            targetEntity = UserEntity.class,
            fetch = FetchType.EAGER
    )
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;


    @OneToMany(mappedBy = "articleEntity", cascade = CascadeType.REMOVE)
    private List<CommentArticleEntity> comments;

    @Column(name="file_path")
    private String filePath;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "MEDIUMTEXT")
    private String content;

    public ArticleDTO toArticleDTO(){
        return ArticleDTO.builder()
                .id(this.id)
                .userPK(userEntity.getId())
                .title(title)
                .content(content)
                .build();
    }
}