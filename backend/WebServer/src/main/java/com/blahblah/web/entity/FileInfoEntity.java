package com.blahblah.web.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name ="files")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FileInfoEntity extends BaseEntity{
    @Id
    private Long id;

    @Column(name = "article_id", insertable = false, updatable = false)
    private Long articleId;
    @ManyToOne(
            targetEntity = UserEntity.class,
            fetch = FetchType.EAGER
    )
    @JoinColumn(name = "article_id")
    private ArticleEntity articleEntity;

    @Column(name="save_folder")
    private String saveFolder;

    @Column(name="original_file")
    private String originalFile;

    @Column(name="save_file")
    private String saveFile;
}
