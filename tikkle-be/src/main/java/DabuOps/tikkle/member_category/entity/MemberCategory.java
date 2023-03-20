package DabuOps.tikkle.member_category.entity;

import DabuOps.tikkle.budget.entity.Budget;
import DabuOps.tikkle.category.entity.Category;
import DabuOps.tikkle.global.audit.Auditable;
import DabuOps.tikkle.global.exception.BusinessLogicException;
import DabuOps.tikkle.global.exception.ExceptionCode;
import DabuOps.tikkle.member.entity.Member;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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
    private Member member;

    @ManyToOne // CATEGORY n:1 단방향 // MEMBER : CATEGORY (n:m) 매핑
    @JoinColumn(name = "CATEGORY_ID")
    private Category category;

    @Column(name = "NAME", nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "CATEGORY_STATUS", nullable = false)
    @Builder.Default
    private Status status = Status.ACTIVE;

    public void setMember(Member member) {
        this.member = member;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public enum Status {
        ACTIVE("활성화"),
        INACTIVE("비활성화");

        private String string;
        Status(String string) { this.string = string; }
    }

    @Builder

    public MemberCategory(Long id, Member member, Category category, String name, Status status) {
        this.id = id;
        this.member = member;
        this.category = category;
        this.name = name;
        this.status = status;
    }
}
