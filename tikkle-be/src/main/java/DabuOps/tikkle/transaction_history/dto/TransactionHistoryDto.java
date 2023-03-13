package DabuOps.tikkle.transaction_history.dto;

import DabuOps.tikkle.transaction_history.entity.TransactionHistory;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

public class TransactionHistoryDto {
    @Getter
    @AllArgsConstructor
    public static class Post {
        private long memberCategoryId;
        private LocalDate date;
        private LocalTime time;
        private TransactionHistory.InoutType inoutType;
        private String memo;
        private int amount;
        private String branchName;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Patch {
        private long memberCategoryId;
        private LocalDate date;
        private LocalTime time;
        private String memo;
        private int amount;
        private String branchName;
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private long id;
        private long memberCategoryId;
        private LocalDate date;
        private LocalTime time;
        private TransactionHistory.InoutType inoutType;
        private String memo;
        private int amount;
        private String branchName;
    }
}
