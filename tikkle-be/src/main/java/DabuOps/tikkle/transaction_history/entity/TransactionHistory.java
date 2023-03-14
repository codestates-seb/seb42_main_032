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

//    @ManyToOne
    @JoinColumn(name = "MEMBER_CATEGORY_ID")
    private MemberCategory memberCategory;

    @Column(name = "DATE")
    private LocalDate date;

    @Column(name = "TIME")
    private LocalTime time;

    @Column(name = "INOUT_TYPE")
    @Enumerated(EnumType.STRING)
    private InoutType inoutType;

    @Column(name = "CONTENT")
    private String memo;

    @Column(name = "AMOUNT")
    private int amount;

    @Column(name = "BRANCH_NAME")
    private String branch_name;

    public enum InoutType {
        INCOME("수입"),
        SPEND("지출");

        private String string;

        InoutType(String string) {
            this.string = string;
        }
    }

    @Builder

    public TransactionHistory(long id, MemberCategory memberCategory, LocalDate date, LocalTime time, InoutType inoutType, String memo, int amount, String branch_name) {
        this.id = id;
        this.memberCategory = memberCategory;
        this.date = date;
        this.time = time;
        this.inoutType = inoutType;
        this.memo = memo;
        this.amount = amount;
        this.branch_name = branch_name;
    }
}
