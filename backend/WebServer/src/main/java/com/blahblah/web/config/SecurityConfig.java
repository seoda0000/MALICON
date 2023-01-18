package com.blahblah.web.config;


import com.blahblah.web.filter.JwtExceptionFilter;
import com.blahblah.web.jwt.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final JwtExceptionFilter jwtExceptionFilter;
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 토큰 기반 인증이므로 세션 사용 하지않음
                .and()
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class) //HTTP 요청에 JWT 토큰 인증 필터를 거치도록 필터를 추가
                .addFilterBefore(jwtExceptionFilter, JwtAuthenticationFilter.class)
                // filter chaining 순서를 지켜 써야함
                .authorizeRequests()
                .antMatchers("/auth/login", "/auth/refresh").permitAll()//인증이 필요한 URL과 필요하지 않은 URL에 대하여 설정
                .antMatchers(HttpMethod.POST, "/users").permitAll()
                // application.properties에 /api/v1를 prefix로 붙여줬다.
                .antMatchers(HttpMethod.OPTIONS).permitAll()
                .anyRequest().authenticated()
                .and().cors()
                .and().build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }
}
