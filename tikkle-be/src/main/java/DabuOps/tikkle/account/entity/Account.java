package DabuOps.tikkle.account.entity;

import DabuOps.tikkle.global.audit.Auditable;
import DabuOps.tikkle.member.entity.Member;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;

@Entity
public class Account extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column
    private String number;

    @Column
    private String bankName;

    @Column
    private Long balance;

    @Column
    @Builder.Default
    @Enumerated(value = EnumType.STRING)
    private AccountState state = AccountState.ACTIVE;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    public enum AccountState {
        ACTIVE("활성화"),
        INACTIVE("비활성화");

        @Getter
        private String string;
        AccountState(String string) { this.string = string; }
    }

}
