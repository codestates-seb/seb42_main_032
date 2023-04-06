package DabuOps.tikkle.userauth.dto;

import DabuOps.tikkle.transaction_history.entity.TransactionHistory;
import java.time.LocalDate;
import java.time.LocalTime;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ModifiedTransactionHistoryDto {
    private Long memberCategoryId;
    private LocalDate date;
    private LocalTime time;
    private TransactionHistory.InoutType inoutType;
    private String memo;
    private int amount;
    private String branchName;

    private String bankName;

    @Builder
    public ModifiedTransactionHistoryDto(Long memberCategoryId, LocalDate date, LocalTime time,
        TransactionHistory.InoutType inoutType, String memo,
        int amount, String branchName, String bankName) {
        this.memberCategoryId = memberCategoryId;
        this.date = date;
        this.time = time;
        this.inoutType = inoutType;
        this.memo = memo;
        this.amount = amount;
        this.branchName = branchName;
        this.bankName = bankName;
    }
}
