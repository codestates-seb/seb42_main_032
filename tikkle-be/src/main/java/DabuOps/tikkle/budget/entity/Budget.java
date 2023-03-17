package DabuOps.tikkle.budget.entity;

import DabuOps.tikkle.global.audit.Auditable;
import DabuOps.tikkle.member_category.entity.MemberCategory;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Budget extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "MEMBER_CATEGORY_ID")
    private MemberCategory memberCategory;

    @Column(name = "AMOUNT")
    private int amount;

    @Column(name = "START_DATE")
    private LocalDate startDate;

    @Column(name = "END_DATE")
    private LocalDate endDate;

    @Column(name = "SPEND")
    private int spend;

    @Column(name = "CURRENT")
    private boolean current;

    @Enumerated(EnumType.STRING)
    @Column(name = "BUDGET_STATUS", nullable = false)
    @Builder.Default
    private Budget.Status status = Budget.Status.ACTIVE;

    public void setMemberCategory(MemberCategory memberCategory) {
        this.memberCategory = memberCategory;
    }

    public enum Status {
        ACTIVE("활성화"),
        INACTIVE("비활성화");

        private String string;
        Status(String string) { this.string = string; }
    }

    @Builder
    public Budget(Long id, MemberCategory memberCategory, int amount, LocalDate startDate, LocalDate endDate, int spend, boolean current, Status status) {
        this.id = id;
        this.memberCategory = memberCategory;
        this.amount = amount;
        this.startDate = startDate;
        this.endDate = endDate;
        this.spend = spend;
        this.current = current;
        this.status = status;
    }
}
