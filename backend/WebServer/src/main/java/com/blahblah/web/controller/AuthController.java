package com.blahblah.web.controller;


import com.blahblah.web.dto.TokenDTO;
import com.blahblah.web.dto.request.LoginDTO;
import com.blahblah.web.dto.response.MessageWithToken;
import com.blahblah.web.dto.response.UserDTO;
import com.blahblah.web.service.UserService;
import com.blahblah.web.util.JWTutil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/auth")
public class AuthController {
    private final UserService userService;

    // RequestBody는 파라미터로 여러개를 받을 수 없음
    // DTO 하나 만들어서 쓰자
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO){
        String userId = loginDTO.getUserId();
        String password = loginDTO.getPassword();
        log.info("id : " + userId + " pw : " + password);
        TokenDTO token = userService.login(userId, password);
        return ResponseEntity.ok(new MessageWithToken("로그인 성공", token));
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestBody Map<String, String> reqRefreshTokenMap){
        // @RequestBody를 String으로 받으면 JSON이 파싱되지 않고 그대로 들어옴
        String reqRefreshToken = reqRefreshTokenMap.get("reqRefreshToken");
        log.info(reqRefreshToken);
        // Exception 핸들러로 캐치하자 나중에
        if(JWTutil.isValidToken(reqRefreshToken)){
            String userId = JWTutil.getIdByRefreshToken(reqRefreshToken);
            UserDTO user = userService.readUserByUserId(userId);
            String resAcessToken = JWTutil.getJwtToken(user);
            String resRefreshToken = JWTutil.getRefreshToken(user);
            return ResponseEntity.ok(new MessageWithToken("토큰 재발급 성공",new TokenDTO(resAcessToken, resRefreshToken)));
        }
        return ResponseEntity.internalServerError().build();
    }
}
