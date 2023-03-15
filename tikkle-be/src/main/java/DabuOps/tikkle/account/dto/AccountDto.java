package DabuOps.tikkle.account.dto;


import DabuOps.tikkle.account.entity.Account.AccountState;
import DabuOps.tikkle.global.audit.Auditable;
import DabuOps.tikkle.member.entity.Member;
import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class AccountDto {
    @Getter
    @NoArgsConstructor
    public static class Post{
        private String name;

        private String number;

        private String bankName;

        private Long balance;


        @Builder
        public Post(String name, String number, String bankName, Long balance) {
            this.name = name;
            this.number = number;
            this.bankName = bankName;
            this.balance = balance;
        }
    }

    @Getter
    @NoArgsConstructor
    public static class Patch{
        private String name;

        @Builder
        public Patch(String name) {
            this.name = name;
        }
    }

    @Getter
    @NoArgsConstructor
    public static class Response extends Auditable {

        private Long id;

        private String name;

        private String number;

        private String bankName;

        private Long balance;

        private AccountState state;

        private Long memberId;

        @Builder
        public Response(Long id, String name, String number, String bankName, Long balance,
            AccountState state, Long memberId) {
            this.id = id;
            this.name = name;
            this.number = number;
            this.bankName = bankName;
            this.balance = balance;
            this.state = state;
            this.memberId = memberId;
        }
    }


}
