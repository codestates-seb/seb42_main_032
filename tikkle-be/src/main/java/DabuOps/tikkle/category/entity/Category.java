package DabuOps.tikkle.category.entity;

import DabuOps.tikkle.exception.BusinessLogicException;
import DabuOps.tikkle.exception.ExceptionCode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Category {
    @Id
    private Long categoryId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Long memberId;
    private String name;
    private int budget = 0;

    private CategoryStatus categoryStatus;
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
