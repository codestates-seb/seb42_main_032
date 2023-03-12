package DabuOps.tikkle.transaction_history.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TransactionHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long transactionHistoryId;

//    @ManyToOne
//    @JoinColumn(name = "MEMBER_CATEGORY_ID")
//    private long memberCategoryId;

    @Column(name = "DATE")
    private LocalDate date;

    @Column(name = "TIME")
    private LocalTime time;

    @Column(name = "INOUT_TYPE")
    private InoutType inoutType;

    @Column(name = "CONTENT")
    private String content;

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
}
