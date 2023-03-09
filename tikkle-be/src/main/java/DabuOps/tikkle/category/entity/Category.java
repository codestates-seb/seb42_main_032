package DabuOps.tikkle.category.entity;

import DabuOps.tikkle.global.exception.BusinessLogicException;
import DabuOps.tikkle.global.exception.ExceptionCode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long categoryId;

//    @ManyToOne // MEMBER n:1 양방향
//    @JoinColumn(name = "MEMBER_ID")
    private Long memberId;

    @Column(name = "NAME", nullable = false)
    private String name;

    @Column(name = "BUDGET", nullable = false)
    private int budget = 0;

    @Enumerated(EnumType.STRING)
    @Column(name = "CATEGORY_STATUS", nullable = false)
    private CategoryStatus categoryStatus = CategoryStatus.CATEGORY_ACTIVE;

    public enum CategoryStatus {
        CATEGORY_ACTIVE("활성화"),
        CATEGORY_INACTIVE("비활성화");

        private String string;
        CategoryStatus(String string) { this.string = string; }
    }

    public void setCategoryStatus(Category category) {
        canChangeCategoryStatus(category);
        if(category.categoryStatus == CategoryStatus.CATEGORY_ACTIVE) this.categoryStatus = CategoryStatus.CATEGORY_INACTIVE;
        else this.categoryStatus = CategoryStatus.CATEGORY_ACTIVE;
    }

    public void canChangeCategoryStatus(Category category) {
        if(category.budget != 0) throw new BusinessLogicException(ExceptionCode.CANNOT_CHANGE_CATEGORY_STATUS);
    }
}
