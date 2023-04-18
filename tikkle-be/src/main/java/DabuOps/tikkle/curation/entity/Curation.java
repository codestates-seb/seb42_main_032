package DabuOps.tikkle.curation.entity;

import DabuOps.tikkle.curation_likes.entity.CurationLikes;
import DabuOps.tikkle.curation_tag.entity.Tag;
import DabuOps.tikkle.global.audit.Auditable;
import DabuOps.tikkle.member.entity.Member;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

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

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID", nullable = true)
    private Member member;

    @Column
    @Builder.Default
    private Integer likesCount = 0;

    @Column
    @Builder.Default
    @Enumerated(value = EnumType.STRING)
    private CurationState state = CurationState.ACTIVE;

    @Builder
    public Curation(Long id, String title, String content, Tag tag, Member member, Integer likesCount, CurationState state) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.tag = tag;
        this.member = member;
        this.likesCount = likesCount;
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
