package DabuOps.tikkle.member.dto;

import DabuOps.tikkle.global.audit.Auditable;
import DabuOps.tikkle.member.entity.Member.Gender;
import DabuOps.tikkle.member.entity.Member.MemberState;
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

        @Builder
        public Post(String email, String name) {
            this.email = email;
            this.name = name;
        }
    }
    @Getter
    @NoArgsConstructor
    public static class Patch{
        private String name;
        private String location;
        private Integer payDay;
        private Integer initDate;

        @Builder
        public Patch(String name, String location, Integer payDay, Integer initDate) {
            this.name = name;
            this.location = location;
            this.payDay = payDay;
            this.initDate = initDate;
        }
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
    public static class Response extends Auditable {
        private Long memberId;
        private String email;
        private String name;
        private String location;
        private MemberState state;
        private Gender gender;
        private Integer payDay;
        private Integer initDate;
        @Builder
        public Response(Long memberId, String email, String name, String location,
            MemberState state, Gender gender, Integer payDay,
            Integer initDate) {
            this.memberId = memberId;
            this.email = email;
            this.name = name;
            this.location = location;
            this.state = state;
            this.gender = gender;
            this.payDay = payDay;
            this.initDate = initDate;
        }
    }

}
