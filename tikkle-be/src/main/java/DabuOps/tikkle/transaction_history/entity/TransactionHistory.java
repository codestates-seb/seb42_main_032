package DabuOps.tikkle.transaction_history.entity;

import DabuOps.tikkle.member_category.entity.MemberCategory;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;


@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
public class TransactionHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "MEMBER_CATEGORY_ID")
    private MemberCategory memberCategory;

    @Column(name = "IMAGE")
    private String image;

    @Column(name = "DATE")
    private LocalDate date;

    @Column(name = "TIME")
    private LocalTime time;

    @Column(name = "INOUT_TYPE")
    private InoutType inoutType;

    @Column(name = "MEMO")
    private String memo;

    @Column(name = "AMOUNT")
    private int amount;

    @Column(name = "BRANCH_NAME")
    private String branchName;

    @Column(name = "STATUS")
    private Status status;

    @Column(name = "BANK_NAME")
    private String bankName;

    public enum InoutType {
        INCOME("수입"),
        SPEND("지출");

        @Getter
        private String type;

        InoutType(String type) {
            this.type = type;
        }
    }

    public enum Status {
        ACTIVE("활성화"),
        INACTIVE("비활성화");

        private String string;
        Status(String string) { this.string = string; }
    }

    @Builder
    public TransactionHistory(long id, MemberCategory memberCategory, String image, LocalDate date, LocalTime time, InoutType inoutType, String memo, int amount, String branchName, Status status, String bankName) {
        this.id = id;
        this.memberCategory = memberCategory;
        this.image = image;
        this.date = date;
        this.time = time;
        this.inoutType = inoutType;
        this.memo = memo;
        this.amount = amount;
        this.branchName = branchName;
        this.status = status;
        this.bankName = bankName;
    }
}
