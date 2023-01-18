package com.blahblah.web.jwt;


import com.blahblah.web.util.JWTutil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

// 필터가 서블릿의 request 당 한번만 발생하게 OncePerRequestFilter를 상속그
@Slf4j
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String validToken = resolveToken(request);
        log.info("Token : " + validToken);
        String path = request.getRequestURI();
        log.info("PATH : " + path);

        // Authorization 토큰이 존재하면 그 토큰의 유효성을 검사하고
        if(validToken != null && JWTutil.isValidToken(validToken)){
            // 유효한 토큰인 경우 Authentication 객체를 반환하여
            // Security Context에 저장해준다.
            Authentication authentication = JWTutil.getAuthentication(validToken);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        filterChain.doFilter(request, response);
    }

    private String resolveToken(HttpServletRequest request){
        String bearerToken = request.getHeader("Authorization");
        if(bearerToken != null && bearerToken.startsWith("Bearer")){
            return bearerToken.substring(7);
        }else return null;
    }

}
