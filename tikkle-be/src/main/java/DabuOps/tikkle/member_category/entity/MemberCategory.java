package DabuOps.tikkle.member_category.entity;

import DabuOps.tikkle.global.audit.Auditable;
import DabuOps.tikkle.global.exception.BusinessLogicException;
import DabuOps.tikkle.global.exception.ExceptionCode;
import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Builder
public class MemberCategory extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne // MEMBER n:1 단방향
    @JoinColumn(name = "MEMBER_ID")
    private Long memberId;

    @ManyToOne // CATEGORY n:1 단방향 // MEMBER : CATEGORY (n:m) 매핑
    @JoinColumn(name = "CATEGORY_ID")
    private Long categoryId;

    @Column(name = "NAME", nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "CATEGORY_STATUS", nullable = false)
    @Builder.Default
    private Status status = Status.ACTIVE;

    public enum Status {
        ACTIVE("활성화"),
        INACTIVE("비활성화");

        private String string;
        Status(String string) { this.string = string; }
    }

    @Builder
    public MemberCategory(Long id, Long memberId, Long categoryId, String name, Status status) {
        this.id = id;
        this.memberId = memberId;
        this.categoryId = categoryId;
        this.name = name;
        this.status = status;
    }
}
