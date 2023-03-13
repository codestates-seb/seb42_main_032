package DabuOps.tikkle.global.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LogInMemberDto {
    private Long memberId;
    private String email;

    @Builder
    public LogInMemberDto(Long memberId, String email) {
        this.memberId = memberId;
        this.email = email;
    }
}
