package DabuOps.tikkle.curation.dto;

import DabuOps.tikkle.curation.entity.Curation.CurationState;
import DabuOps.tikkle.curation_tag.entity.Tag;
import DabuOps.tikkle.global.audit.Auditable;
import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class CurationDto {
    @Getter
    @NoArgsConstructor
    public static class Post{
        private String title;
        private String content;
        private Tag tag;

        @Builder
        public Post(String title, String content, Tag tag) {
            this.title = title;
            this.content = content;
            this.tag = tag;
        }
    }
    @Getter
    @NoArgsConstructor
    public static class Patch{
        private String title;
        private String content;
        private Tag tag;

        @Builder
        public Patch(String title, String content, Tag tag) {
            this.title = title;
            this.content = content;
            this.tag = tag;
        }
    }
    @Getter
    @NoArgsConstructor
    public static class Response extends Auditable {
        private Long id;
        private String title;
        private String content;
        private Tag tag;
        private CurationState state;
    }

}
