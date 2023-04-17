package DabuOps.tikkle.curation_like_up.entity;

import DabuOps.tikkle.curation.entity.Curation;
import DabuOps.tikkle.member.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Builder
@NoArgsConstructor
@Getter
@Setter
public class CurationLikeUp {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;


    @ManyToOne
    @JoinColumn(name = "CURATION_ID")
    private Curation curation;

    @Builder
    public CurationLikeUp(Long id, Member member, Curation curation) {
        this.id = id;
        this.member = member;
        this.curation = curation;
    }
}
