package com.blahblah.web.entity;

import com.blahblah.web.dto.response.UserDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Table(name ="user")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
// Entity는 defalut Constructor가 필요
// NoArgsConstructor를 만드는데 Builder 에러뜨니까 AllArgsConstructor도 넣자
public class UserEntity implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String department;
    private String name;
    @JsonIgnore
    private String password;
    private String position;
    @Column(name = "user_id")
    private String userId;

    public UserDTO toUserDTO(){
        return UserDTO.builder().id(this.id)
                .department(this.department)
                .name(this.name)
                .password(this.password)
                .position(this.position)
                .userId(this.userId)
                .build();
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }
    @Override
    public String getUsername() {
        return userId;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
