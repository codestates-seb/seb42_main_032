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
        private String picture;
        private String accessToken;

        @Builder
        public Post(String email, String name, String picture, String accessToken) {
            this.email = email;
            this.name = name;
            this.picture = picture;
            this.accessToken = accessToken;
        }
    }
    @Getter
    @NoArgsConstructor
    public static class Patch{
        private String name;
        private String location;
        private Integer payDay;
        private Integer payAmount;
        private Integer initDate;
        private Integer totalBudget;
        private Gender gender;
        private MemberState state;

        @Builder
        public Patch(String name, String location, Integer payDay,
            Integer payAmount, Integer initDate,
            Integer totalBudget, Gender gender ,MemberState state) {
            this.name = name;
            this.location = location;
            this.payDay = payDay;
            this.payAmount = payAmount;
            this.initDate = initDate;
            this.totalBudget = totalBudget;
            this.gender = gender;
            this.state = state;
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
        private Long id;
        private String email;
        private String name;
        private String location;
        private MemberState state;
        private Gender gender;
        private Integer payDay;
        private Integer payAmount;
        private Integer totalBudget;
        private Integer initDate;
        private String picture;

        @Builder
        public Response(Long id, String email, String name, String location, MemberState state,
            Gender gender, Integer payDay, Integer payAmount, Integer totalBudget, Integer initDate,
            String picture) {
            this.id = id;
            this.email = email;
            this.name = name;
            this.location = location;
            this.state = state;
            this.gender = gender;
            this.payDay = payDay;
            this.payAmount = payAmount;
            this.totalBudget = totalBudget;
            this.initDate = initDate;
            this.picture = picture;
        }
    }

}
