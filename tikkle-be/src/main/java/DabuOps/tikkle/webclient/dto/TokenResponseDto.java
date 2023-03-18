package DabuOps.tikkle.webclient.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TokenResponseDto {
    // 토큰요청을 보내고 나서 오는 response 데이터 값들 저장
    private String accessToken;
    private String token_type;
    private String refresh_token;
    private String expires_in;
    private String scope;
    private String user_seq_no;
}
