package DabuOps.tikkle.transaction_history.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class TransactionHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long transactionHistoryId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_CATEGORY_ID")
    private long memberCategoryId;

    @Column(name = "DATE")
    private LocalDate date;

    @Column(name = "TIME")
    private LocalTime time;

    @Enumerated(EnumType.STRING)
    @Column(name = "INOUT_TYPE")
    @Builder.Default
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
    public TransactionHistory(long transactionHistoryId, long memberCategoryId, LocalDate date, LocalTime time, InoutType inoutType, String memo, int amount, String branch_name) {
        this.transactionHistoryId = transactionHistoryId;
        this.memberCategoryId = memberCategoryId;
        this.date = date;
        this.time = time;
        this.inoutType = inoutType;
        this.memo = memo;
        this.amount = amount;
        this.branch_name = branch_name;
    }
}
