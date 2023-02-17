package com.blahblah.web.controller;

import com.blahblah.web.dto.response.Message;
import com.blahblah.web.entity.UserEntity;
import com.blahblah.web.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/mails")
@RestController
@Slf4j
@RequiredArgsConstructor
public class MailController {

    final UserService userService;
    @PostMapping("/password")
    public ResponseEntity sendNewPassword(@RequestBody UserEntity user){
        if(!userService.checkUser(user)){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Message("등록된 이메일을 찾을 수 없습니다."));
        }
        userService.sendAuthStringToEmail(user.getEmail());
        return ResponseEntity.ok(new Message("임시 비밀번호 발급 완료"));
    }

    @GetMapping("/{email}")
    public ResponseEntity checkEmail(@PathVariable String email){
        String checkNumber = userService.checkEmail(email);
        return ResponseEntity.ok(checkNumber);
    }
}
