package DabuOps.tikkle.budget.dto;

import DabuOps.tikkle.budget.entity.Budget;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class BudgetDto {
    @Getter
    @NoArgsConstructor
    public static class Post {
        private Long memberCategoryId;

        @NotNull
        private Integer amount;

        @Builder
        public Post(Long memberCategoryId, int amount) {
            this.memberCategoryId = memberCategoryId;
            this.amount = amount;
        }
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Patch {
        private int amount;

        @Builder
        public Patch(int amount) {
            this.amount = amount;
        }
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Response {
        private long id;
        private long memberCategoryId;
        private int amount;
        private LocalDate startDate;
        private LocalDate endDate;
        private int spend;
        private LocalDateTime createdAt;
        private boolean current;
        private Budget.Status status;

        @Builder

        public Response(long id, long memberCategoryId, int amount, LocalDate startDate, LocalDate endDate, int spend, LocalDateTime createdAt, boolean current, Budget.Status status) {
            this.id = id;
            this.memberCategoryId = memberCategoryId;
            this.amount = amount;
            this.startDate = startDate;
            this.endDate = endDate;
            this.spend = spend;
            this.createdAt = createdAt;
            this.current = current;
            this.status = status;
        }
    }
}
