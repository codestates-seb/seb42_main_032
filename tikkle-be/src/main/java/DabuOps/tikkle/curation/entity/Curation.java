package DabuOps.tikkle.curation.entity;

import DabuOps.tikkle.curation_tag.entity.Tag;
import DabuOps.tikkle.global.audit.Auditable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Builder
@NoArgsConstructor
@Getter
@Setter
public class Curation extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    @ManyToOne
    @JoinColumn(name = "TAG_ID", nullable = true)
    private Tag tag;

    @Column
    @Builder.Default
    @Enumerated(value = EnumType.STRING)
    private CurationState state = CurationState.ACTIVE;



    @Builder
    public Curation(Long id, String title, String content, Tag tag, CurationState state) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.tag = tag;
        this.state = state;
    }

    public static enum CurationState {
        ACTIVE("활성"),
        DELETED("비활성");
        @Getter
        private String state;

        CurationState(String state) {
            this.state = state;
        }
    }
}
