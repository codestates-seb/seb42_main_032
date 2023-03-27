package DabuOps.tikkle.budget.repository;

import DabuOps.tikkle.budget.entity.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BudgetRepository extends JpaRepository<Budget, Long> {
    List<Budget> findBudgetsByMemberCategoryIdInAndCurrentIsTrue(List<Long> memberCategoryIds);
    List<Budget> findByMemberCategoryId(Long memberCategoryId);
    Budget findByMemberCategoryIdAndCurrentIsTrue(Long memberCategoryId);
}
