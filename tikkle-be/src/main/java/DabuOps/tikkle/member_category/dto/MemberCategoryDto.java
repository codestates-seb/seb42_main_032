package DabuOps.tikkle.member_category.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class MemberCategoryDto {
    @Getter
    @AllArgsConstructor
    public static class Post {
        @NotBlank
        private String name;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Patch {
        @Pattern(regexp = ".*\\S.*")
        private String name;
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private long memberCategoryId;
        private String name;
        private long memberId;
        private long categoryId;
        private LocalDateTime createdAt;
    }
}
