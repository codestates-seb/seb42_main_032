package DabuOps.tikkle.curation_tag.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class TagDto {
    @Getter
    @NoArgsConstructor
    public static class Post{
        private String name;

        @Builder
        public Post(String name) {
            this.name = name;
        }
    }
    @Getter
    @NoArgsConstructor
    public static class Patch{
        private String name;

        @Builder
        public Patch(String name) {
            this.name = name;
        }
    }
    @Getter
    @NoArgsConstructor
    public static class Response{
        private Long id;
        private String name;

        @Builder
        public Response(Long id, String name) {
            this.id = id;
            this.name = name;
        }
    }
}
