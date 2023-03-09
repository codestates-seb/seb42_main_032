package DabuOps.tikkle.category.dto;

import DabuOps.tikkle.category.entity.Category;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class CategoryDto {
    @Getter
    @AllArgsConstructor
    public static class Post {
        @NotBlank
        private String name;
        @NotBlank
        private int budget;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Patch {
        @Pattern(regexp = ".*\\S.*")
        private String name;
        @Pattern(regexp = ".*\\S.*")
        private int budget;
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private long categoryId;
        private long memberId;
        private String name;
        private int budget;
        private Category.CategoryStatus categoryStatus;
    }
}
