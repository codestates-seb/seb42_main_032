package DabuOps.tikkle.transaction_history.dto;

import DabuOps.tikkle.transaction_history.entity.TransactionHistory;
import DabuOps.tikkle.transaction_history.entity.TransactionHistory.InoutType;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

public class TransactionHistoryDto {
    @Getter
    @NoArgsConstructor
    public static class Post {
        private long memberCategoryId;
        private LocalDate date;
        private LocalTime time;
        private InoutType inoutType;
        private String memo;
        private int amount;
        private String branchName;

        @Builder
        public Post(long memberCategoryId, LocalDate date, LocalTime time, InoutType inoutType, String memo, int amount, String branchName) {
            this.memberCategoryId = memberCategoryId;
            this.date = date;
            this.time = time;
            this.inoutType = inoutType;
            this.memo = memo;
            this.amount = amount;
            this.branchName = branchName;
        }
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Patch {
        private long memberCategoryId;
        private LocalDate date;
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
        private long id;
        private long memberCategoryId;
        private LocalDate date;
        private LocalTime time;
        private InoutType inoutType;
        private String memo;
        private int amount;
        private String branchName;

        @Builder
        public Response(long id, long memberCategoryId, LocalDate date, LocalTime time, InoutType inoutType, String memo, int amount, String branchName) {
            this.id = id;
            this.memberCategoryId = memberCategoryId;
            this.date = date;
            this.time = time;
            this.inoutType = inoutType;
            this.memo = memo;
            this.amount = amount;
            this.branchName = branchName;
        }
    }
}
