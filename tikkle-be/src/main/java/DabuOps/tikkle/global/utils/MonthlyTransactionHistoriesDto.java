package DabuOps.tikkle.global.utils;

import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
public class MonthlyTransactionHistoriesDto<T> {
    private List<T> transactionHistories;
    private List<T> dailySummary;

    public MonthlyTransactionHistoriesDto(List<T> data1, List<T> data2) {
        this.transactionHistories = data1;
        this.dailySummary = data2;
    }
}
