package com.blahblah.web.controller;

import com.blahblah.web.dto.response.Message;
import com.blahblah.web.dto.response.UserDTO;
import com.blahblah.web.entity.UserEntity;
import com.blahblah.web.entity.UserSubscribeEntity;
import com.blahblah.web.service.SubscribeService;
import com.blahblah.web.util.JWTutil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RequestMapping("/subscribe")
@RestController
@Slf4j
@RequiredArgsConstructor
public class SubscribeController{
    private final SubscribeService subscribeService;

    @PostMapping("/{subscribeId}")
    public ResponseEntity createSubscribe(@PathVariable long subscribeId, HttpServletRequest request){
        long userId = JWTutil.getLongIdByAccessToken(request);

        UserSubscribeEntity sub = subscribeService.addSubscribe(userId, subscribeId);
//        log.info("sub"+sub.getSubscribeUserEntity().getUserId()+" user"+sub.getUserEntity().getUserId());
        if(sub == null){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Message("구독 실패"));
        }else {
            return ResponseEntity.status(HttpStatus.OK).body(new Message("구독 성공"));
        }
    }

    @GetMapping
    public ResponseEntity readSubscribe(HttpServletRequest request){
        long userId = JWTutil.getLongIdByAccessToken(request);

        List<Long> subscribes = subscribeService.readSubscribe(userId);
        if(subscribes==null){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("구독 정보를 가져올 수 없습니다.");
        }
        return ResponseEntity.ok(subscribes);
    }

}
