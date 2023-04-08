package DabuOps.tikkle.budget.service;

import DabuOps.tikkle.budget.entity.Budget;
import DabuOps.tikkle.budget.repository.BudgetRepository;
import DabuOps.tikkle.member.entity.Member;
import DabuOps.tikkle.member_category.entity.MemberCategory;
import DabuOps.tikkle.member_category.repository.MemberCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InitBudgetService {
    private final MemberCategoryRepository memberCategoryRepository;
    private final BudgetRepository budgetRepository;

    @Transactional
    public void forOneMemberInitBudget(Member member) {
        List<MemberCategory> memberCategories = memberCategoryRepository.findAllByMemberIdAndStatusNot(member.getId(), MemberCategory.Status.INACTIVE);

        List<Long> memberCategoryIdList = new ArrayList<>();
        for(MemberCategory memberCategory : memberCategories) {
            memberCategoryIdList.add(memberCategory.getId());
        }

        List<Budget> budgets = budgetRepository.findBudgetsByMemberCategoryIdInAndCurrentIsTrue(memberCategoryIdList);
        List<Integer> amountList = new ArrayList<>();

        for(Budget budget : budgets) {
            budget.setCurrent(false);
            budgetRepository.save(budget);
            amountList.add(budget.getAmount());
        }

        for(int i = 0; i < memberCategories.size(); i++) {
            initBudget(memberCategories.get(i), amountList.get(i));
        }
    }

    public Budget initBudget(MemberCategory memberCategory, Integer amount) {
        Budget budget = Budget.builder()
                .memberCategory(memberCategory)
                .startDate(LocalDate.now())
                .endDate(LocalDate.now().plusMonths(1).minusDays(1))
                .current(true)
                .spend(0)
                .amount(amount)
                .build();

        return budgetRepository.save(budget);
    }
}
