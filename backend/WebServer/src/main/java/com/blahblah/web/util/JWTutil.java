package com.blahblah.web.util;


import com.blahblah.web.controller.exception.JwtAuthenticationException;
import com.blahblah.web.dto.response.UserDTO;
import com.blahblah.web.entity.UserEntity;
import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Date;

@Component
@Slf4j
public class JWTutil {
    private static String SECRET_KEY;
    private static long ACCESS_EXPIRATION_TIME;
    private static long REFRESH_EXPIRATION_TIME;

    private static String ISSUER;


    @Autowired
    private JWTutil(@Value("${jwt.secret}") String secretKey,
                    @Value("${jwt.access_expiration}") long ecc_expirationTime,
                    @Value("${jwt.refresh_expiration}") long ref_expirationTime,
                    @Value("${jwt.issuer}") String issuer){
        SECRET_KEY = secretKey;
        ACCESS_EXPIRATION_TIME = ecc_expirationTime;
        REFRESH_EXPIRATION_TIME = ref_expirationTime;
        ISSUER = issuer;
    };
    public static String getJwtToken(UserDTO user){
        Date now = new Date();
        return Jwts.builder()
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                .setIssuer(ISSUER)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + ACCESS_EXPIRATION_TIME))
                .claim("id", user.getId())
                .claim("userId",user.getUserId())
                .claim("name",user.getNickName())
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    public static String getRefreshToken(UserDTO user){
        Date now = new Date();
        return Jwts.builder()
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                .setIssuer(ISSUER)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + REFRESH_EXPIRATION_TIME))
                .claim("userId", user.getUserId())
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    // JWT 토큰을 복호화하여 토큰에 들어있는 정보를 꺼내는 메서드
    public static Authentication getAuthentication(String accessToken) {
        // 토큰 복호화
        Claims claims = parseClaims(accessToken);

        String userId = (String)claims.get("userId");

        log.info("USER_ID : " + userId);

        if (userId == null) {
            throw new RuntimeException("권한 정보가 없는 토큰입니다.");
        }
        // UserDetails 객체를 만들어서 Authentication 리턴
        UserDTO principal = UserEntity.builder().userId(userId).build().toUserDTO();
        return new UsernamePasswordAuthenticationToken(principal, "", new ArrayList<>());
    }

    public static String  getIdByRefreshToken(String refreshToken){
        return (String) parseClaims(refreshToken).get("userId");
    }

    public static String  getIdByAccessToken(String accessToken){
        return (String) parseClaims(accessToken).get("userId");
    }

    public static Long  getLongIdByAccessToken(HttpServletRequest request){
        String accessToken =request.getHeader("Authorization").substring(7);
        return ((Integer)parseClaims(accessToken).get("id")).longValue();
    }

    public static boolean isValidToken(String token){
        try {
            Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.info("Invalid JWT Token", e);
            throw new JwtAuthenticationException("유효하지 않은 토큰입니다.", HttpStatus.UNAUTHORIZED);
        } catch (ExpiredJwtException e) {
            log.info("Expired JWT Token", e);
            throw new JwtAuthenticationException("만료된 토큰입니다.", HttpStatus.REQUEST_TIMEOUT);
        } catch (UnsupportedJwtException e) {
            log.info("Unsupported JWT Token", e);
            throw new JwtAuthenticationException("지원하지 않는 토큰입니다.",HttpStatus.FORBIDDEN);
        } catch (IllegalArgumentException e) {
            log.info("JWT claims string is empty.", e);
            throw new JwtAuthenticationException("토큰의 클레임이 비어있습니다",HttpStatus.PRECONDITION_FAILED);
        }
    }

    public static Claims parseClaims(String accessToken) {
        try {
            return Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(accessToken).getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }
}
