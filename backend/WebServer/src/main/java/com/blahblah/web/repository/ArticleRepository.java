package com.blahblah.web.repository;

import com.blahblah.web.dto.response.SubscribeArticleDTO;
import com.blahblah.web.entity.ArticleEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ArticleRepository extends JpaRepository<ArticleEntity, Long> {

    @Override
    void deleteById(Long id);


    Page<ArticleEntity> findAllByUserId(long userId, Pageable pageable);

    // 아래코드는 에러 발생
    // SubscribeDTO로 받는 걸로 다시 작성
//    @Query(value="select com.blahblah.web.dto.response.SubscribeDTO"+
//            "(a.id, a.userEntity.userId, a.userEntity.nickName, a.userEntity.avatar, a.title, a.content, a.createDate, a.lastModifiedDate) "+
//            "from ArticleEntity a " +
//            "where a.userId="+
//            "(select us.subscribeUserEntity.userId from UserSubscribeEntity us where us.userEntity.userId = :id)")
       //       @Query(value="select new com.blahblah.web.dto.response.SubscribeArticleDTO(a.id, u.userId, u.nickName, u.avatar, a.title, a.content, a.createDate, a.lastModifiedDate,c)" +
//               "from ArticleEntity a " +
//               "join a.userEntity u " +
//               "join CommentEntity c on articleId " +
//               "where a.id=:id")
    @Query(value="select * from articles a where a.user_id=(select us.subscribe_user_id from user_subscribes us where us.user_id = :id) or a.user_id=:id", nativeQuery = true)
    Page<ArticleEntity> findAllBy(@Param("id") long id, Pageable pageable);

}
