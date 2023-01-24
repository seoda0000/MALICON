package com.blahblah.web.controller;


import com.blahblah.web.controller.exception.CustomException;
import com.blahblah.web.dto.response.Message;
import com.blahblah.web.dto.response.UserDTO;
import com.blahblah.web.dto.response.UserMeDTO;
import com.blahblah.web.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RequestMapping("/users")
@RestController
@Slf4j
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping
    public ResponseEntity insertUser(@RequestBody UserDTO userInfo){
        UserDTO ans = userService.createUser(userInfo);
        if(ans == null){
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR, "가입 실패");
        }else {
            return ResponseEntity.status(201).body(new Message("가입 성공"));
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity checkDuplicatedId(@PathVariable String userId){
        log.info(userId);
        if(userService.isExistUserId(userId))
            return ResponseEntity.status(409).body(new Message("이미 존재하는 사용자 ID입니다"));
        else return ResponseEntity.status(200).body(new Message("사용가능한 사용자 ID입니다"));
    }

    @GetMapping("/me")
    public ResponseEntity getMyInfo(HttpServletRequest request){
        UserDTO loginUser = (UserDTO)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long id = loginUser.getId();
        log.info("ID : " + id);
        UserDTO userInfo = userService.readUser(id);

        return ResponseEntity.ok(
                UserMeDTO.builder().avatar(userInfo.getAvatar())
                        .email(userInfo.getEmail())
                        .userId(userInfo.getUserId())
                        .id(userInfo.getId())
                        .lightStick(userInfo.getLightStick())
                        .phoneNumber(userInfo.getPhoneNumber())
                        .nickName(userInfo.getNickName())
                        .build()
        );
    }

    @PutMapping()
    public ResponseEntity updateUser(@RequestBody UserDTO userDTO){
        UserDTO loginUser = (UserDTO)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(loginUser.getId() != userDTO.getId()) throw new CustomException(HttpStatus.FORBIDDEN, "권한이 없습니다.");
        log.info(userDTO.toString());
        if(userService.updateUser(userDTO))
            return ResponseEntity.ok(new Message("회원정보 수정 성공"));
        else return ResponseEntity.internalServerError().build();
    }
}
