package DabuOps.tikkle.member_category.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class MemberCategoryDto {
    @Getter
    @NoArgsConstructor
    public static class Post {
        @NotBlank
        private String name;

        @Builder
        public Post(String name) {
            this.name = name;
        }
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Patch {
        @Pattern(regexp = ".*\\S.*")
        private String name;

        @Builder
        public Patch(String name) {
            this.name = name;
        }
    }

    @Getter
    @NoArgsConstructor
    public static class Response {
        private long id;
        private String name;
        private long memberId;
        private long categoryId;
        private String image;
        private LocalDateTime createdAt;

        @Builder
        public Response(long id, String name, long memberId, long categoryId, String image, LocalDateTime createdAt) {
            this.id = id;
            this.name = name;
            this.memberId = memberId;
            this.categoryId = categoryId;
            this.image = image;
            this.createdAt = createdAt;
        }
    }
}
