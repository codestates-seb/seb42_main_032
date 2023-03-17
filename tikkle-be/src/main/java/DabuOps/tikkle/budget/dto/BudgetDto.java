package DabuOps.tikkle.budget.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class BudgetDto {
    @Getter
    @NoArgsConstructor
    public static class Post {
        @NotBlank
        private Long memberCategoryId;
        @NotBlank
        private int amount;

        private LocalDate startDate;

        private LocalDate endDate;

        @Builder
        public Post(Long memberCategoryId, int amount, LocalDate startDate, LocalDate endDate) {
            this.memberCategoryId = memberCategoryId;
            this.amount = amount;
            this.startDate = startDate;
            this.endDate = endDate;
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

        @Builder
        public Response(long id, long memberCategoryId, int amount, LocalDate startDate, LocalDate endDate, int spend, LocalDateTime createdAt) {
            this.id = id;
            this.memberCategoryId = memberCategoryId;
            this.amount = amount;
            this.startDate = startDate;
            this.endDate = endDate;
            this.spend = spend;
            this.createdAt = createdAt;
        }
    }
}
