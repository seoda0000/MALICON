package io.openvidu.basic.java.dto;


import lombok.*;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    //아이디
    private String userId;
    //닉네임
    private String nickName;
    //아바타 정보
    private String avatar;


    //사람에 들어가는것 : 닉네임, 역할정보, 아바타정보,

}
