package DabuOps.tikkle.oauth.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
/*
* AccessToken 받아오기
 */
@Getter
@Setter
@ToString
public class AccessTokenDto {
    private String access_token;
    private int expires_in;
    private String scope;
    private String token_type;
    private String id_token;
}