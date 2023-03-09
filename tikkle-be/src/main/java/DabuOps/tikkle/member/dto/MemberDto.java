package DabuOps.tikkle.member.dto;

import DabuOps.tikkle.member.entity.Detail;
import DabuOps.tikkle.member.entity.Member.MemberState;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class MemberDto {
    @Getter
    @NoArgsConstructor
    public static class Post{
        private String email;
        private String name;
    }
    public static class Patch{
        private String name;
        private String location;
        private Integer payDay;
        private Integer initdate;
        private Boolean gender;
    }
    @Getter
    @Setter
    @NoArgsConstructor
    public static class MeResponse {

        private Long memberId;
        private String email;
        private String name;

        @Builder
        public MeResponse(Long memberId, String email, String name) {
            this.memberId = memberId;
            this.email = email;
            this.name = name;
        }
    }
    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    public static class Response{
        private Long memberId;
        private String email;
        private String name;
        private String location;
        private MemberState state;
        private LocalDateTime createAt;
        private LocalDateTime modifiedAt;
        private Boolean gender;
        private Integer payDay;
        private Integer initDate;
        private List<Detail> details;
        @Builder
        public Response(Long memberId, String email, String name, String location,
            MemberState state,
            LocalDateTime createAt, LocalDateTime modifiedAt, Boolean gender, Integer payDay,
            Integer initDate, List<Detail> details) {
            this.memberId = memberId;
            this.email = email;
            this.name = name;
            this.location = location;
            this.state = state;
            this.createAt = createAt;
            this.modifiedAt = modifiedAt;
            this.gender = gender;
            this.payDay = payDay;
            this.initDate = initDate;
            this.details = details;
        }
    }

}
