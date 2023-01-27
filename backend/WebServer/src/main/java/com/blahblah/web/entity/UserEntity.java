package com.blahblah.web.entity;

import com.blahblah.web.dto.response.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Table(name ="users")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
// Entity는 defalut Constructor가 필요
// NoArgsConstructor를 만드는데 Builder 에러뜨니까 AllArgsConstructor도 넣자
public class UserEntity extends BaseEntity implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "nick_name", nullable = false, unique = true)
    private String nickName;
    @Column(nullable = false)
    private String password;
    @Column(name = "user_id", nullable = false, unique = true)
    private String userId;

    @Column(nullable = false, unique = true)
    private String email;
    @Column(name = "phone_number", unique = true)
    private String phoneNumber;

    private String avatar;

    @Column(name = "light_stick")
    private String lightStick;

    public UserDTO toUserDTO(){
        return UserDTO.builder().id(this.id)
                .nickName(nickName)
                .password(this.password)
                .userId(this.userId)
                .email(email)
                .phoneNumber(phoneNumber)
                .avatar(avatar)
                .lightStick(lightStick)
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
