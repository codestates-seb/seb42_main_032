package DabuOps.tikkle.curation.dto;

import DabuOps.tikkle.curation.entity.Curation.CurationState;
import DabuOps.tikkle.curation_tag.entity.Tag;
import DabuOps.tikkle.global.audit.Auditable;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class CurationDto {
    @Getter
    @NoArgsConstructor
    public static class Post{
        private String title;
        private String content;
        private Long tagId;

        @Builder
        public Post(String title, String content, Long tagId) {
            this.title = title;
            this.content = content;
            this.tagId = tagId;
        }
    }
    @Getter
    @NoArgsConstructor
    public static class Patch{
        private String title;
        private String content;
        private Long tagId;

        @Builder
        public Patch(String title, String content, Long tagId) {
            this.title = title;
            this.content = content;
            this.tagId = tagId;
        }
    }

    @Getter
    @NoArgsConstructor
    public static class Search{
        private int searchType;

        @Builder
        public Search(int searchType) {
            this.searchType = searchType;
        }
    }

    @Getter
    @NoArgsConstructor
    public static class Response extends Auditable {
        private Long id;
        private String title;
        private String content;
        private Long tagId;
        private CurationState state;
        @Builder
        public Response(Long id, String title, String content, Long tagId, CurationState state) {
            this.id = id;
            this.title = title;
            this.content = content;
            this.tagId = tagId;
            this.state = state;
        }
    }

}
