package DabuOps.tikkle.transaction_history.dto;

import DabuOps.tikkle.transaction_history.entity.TransactionHistory;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public class TransactionHistoryDto {
    @Getter
    @NoArgsConstructor
    public static class Post {
        private Long memberCategoryId;
        @DateTimeFormat(pattern = "yyyy-MM-dd")
        private LocalDate date;
        @DateTimeFormat(pattern = "HH:mm:ss")
        private LocalTime time;
        private TransactionHistory.InoutType inoutType;
        private String memo;
        private int amount;
        private String branchName;

        private String bankName;

        @Builder

        public Post(Long memberCategoryId, LocalDate date, LocalTime time, TransactionHistory.InoutType inoutType, String memo, int amount, String branchName, String bankName) {
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

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Patch {
        private Long memberCategoryId;
        @DateTimeFormat(pattern = "yyyy-MM-dd")
        private LocalDate date;
        @DateTimeFormat(pattern = "HH:mm:ss")
        private LocalTime time;
        private String memo;
        private int amount;
        private String branchName;

        @Builder
        public Patch(long memberCategoryId, LocalDate date, LocalTime time, String memo, int amount, String branchName) {
            this.memberCategoryId = memberCategoryId;
            this.date = date;
            this.time = time;
            this.memo = memo;
            this.amount = amount;
            this.branchName = branchName;
        }
    }

    @Getter
    @NoArgsConstructor
    public static class Response {
        private Long id;
        private Long memberCategoryId;
        private LocalDate date;
        private LocalTime time;
        private TransactionHistory.InoutType inoutType;
        private String memo;
        private int amount;
        private String branchName;
        private String bankName;

        @Builder

        public Response(Long id, Long memberCategoryId, LocalDate date, LocalTime time, TransactionHistory.InoutType inoutType, String memo, int amount, String branchName, String bankName) {
            this.id = id;
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

    @Getter
    @Setter
    @AllArgsConstructor
    public static class DailySummaryResponse {
        private List<List<Integer>> dailySummary;
    }

    public static class ApiRequest {
        @DateTimeFormat(pattern = "yyyy-MM-dd")
        private LocalDate date;
        @DateTimeFormat(pattern = "HH:mm:ss")
        private LocalTime time;
        private TransactionHistory.InoutType inoutType;
        private String memo;
        private int amount;
        private String branchName;

        private String bankName;
    }
}
