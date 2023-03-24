package DabuOps.tikkle.budget.service;

import DabuOps.tikkle.budget.entity.Budget;
import DabuOps.tikkle.member_category.entity.MemberCategory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface BudgetService {
    Budget createAutoBudget(MemberCategory memberCategory);

    Budget initBudget(MemberCategory memberCategory, Integer amount);

    Budget createBudget(Budget budget, Long memberCategoryId);

    Budget updateBudget(Budget budget, Long budgetId);

    Budget findBudget(Long budgetId);

    List<Budget> findAllCurrentBudget(Long memberId);

    void deleteBudget(Long budgetId);

    void checkInitDate();
}
