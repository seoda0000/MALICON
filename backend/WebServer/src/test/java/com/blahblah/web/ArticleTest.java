package com.blahblah.web;

import com.blahblah.web.dto.request.ArticleDTO;
import com.blahblah.web.entity.ArticleEntity;
import com.blahblah.web.service.ArticleService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;
import java.sql.SQLException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
@Transactional
public class ArticleTest {

    @Autowired
    ArticleService service;

    @Test
    void insertTest() throws SQLException {
        //give
        ArticleDTO article = ArticleDTO.builder().userPK(1).title("제목").content("내용").build();
        //when
        ArticleEntity result = service.createArticle(article);
        //then
        assertNotNull(result);
    }



}
