package com.blahblah.web.auth;


import com.blahblah.web.controller.exception.CustomException;
import com.blahblah.web.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SsafyUserDetailService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String userId){
        return userRepository.findByUserId(userId).orElseThrow(()->new CustomException(HttpStatus.NOT_FOUND, "존재하지 않는 아이디입니다."));
    }
}
