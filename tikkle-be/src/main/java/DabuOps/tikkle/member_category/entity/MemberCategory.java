package DabuOps.tikkle.member_category.entity;

import DabuOps.tikkle.global.exception.BusinessLogicException;
import DabuOps.tikkle.global.exception.ExceptionCode;
import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Builder
public class MemberCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberCategoryId;

//    @ManyToOne // MEMBER n:1 양방향
//    @JoinColumn(name = "MEMBER_ID")
    private Long memberId;

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
    public MemberCategory(Long memberCategoryId, Long memberId, Long categoryId, String name, Status status) {
        this.memberCategoryId = memberCategoryId;
        this.memberId = memberId;
        this.categoryId = categoryId;
        this.name = name;
        this.status = status;
    }
}
