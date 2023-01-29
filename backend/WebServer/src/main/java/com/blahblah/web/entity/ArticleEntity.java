package com.blahblah.web.entity;


import com.blahblah.web.dto.request.ArticleDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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

    @ManyToOne(
            targetEntity = UserEntity.class,
            fetch = FetchType.EAGER
    )
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;


    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    public ArticleDTO toArticleDTO(){
        return ArticleDTO.builder()
                .id(this.id)
                .userId(userEntity.getId())
                .title(title)
                .content(content)
                .build();
    }
}