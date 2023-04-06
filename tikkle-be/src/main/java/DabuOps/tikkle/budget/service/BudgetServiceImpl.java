package DabuOps.tikkle.budget.service;

import DabuOps.tikkle.budget.entity.Budget;
import DabuOps.tikkle.budget.repository.BudgetRepository;
import DabuOps.tikkle.global.exception.BusinessLogicException;
import DabuOps.tikkle.global.exception.ExceptionCode;
import DabuOps.tikkle.member.entity.Member;
import DabuOps.tikkle.member.repository.MemberRepository;
import DabuOps.tikkle.member_category.entity.MemberCategory;
import DabuOps.tikkle.member_category.repository.MemberCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BudgetServiceImpl implements BudgetService{
    private final BudgetRepository budgetRepository;
    private final MemberRepository memberRepository;
    private final MemberCategoryRepository memberCategoryRepository;
    private final InitBudgetService initBudgetService;

    public Budget createAutoBudget(MemberCategory memberCategory) {
        Budget budget = Budget.builder()
                .memberCategory(memberCategory)
                .spend(0)
                .amount(0)
                .current(true)
                .startDate(LocalDate.now().withDayOfMonth(memberCategory.getMember().getInitDate()))
                .endDate(LocalDate.now().withDayOfMonth(memberCategory.getMember().getInitDate()).plusMonths(1).minusDays(1))
                .build();

        return budgetRepository.save(budget);
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

    public Budget createBudget(Budget budget, Long memberCategoryId) {
        budget.setMemberCategory(memberCategoryRepository.findById(memberCategoryId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.CATEGORY_IS_INACTIVE)));

        budget.setCurrent(true);
        budget.setStartDate(LocalDate.now().withDayOfMonth(budget.getMemberCategory().getMember().getInitDate()));
        budget.setEndDate(budget.getStartDate().plusMonths(1).minusDays(1));

        return budgetRepository.save(budget);
    }

    public Budget updateBudget(Budget budget, Long budgetId) {
        Budget updatedBudget = findBudget(budgetId);

        Optional.ofNullable(budget.getAmount())
            .ifPresent(amount -> updatedBudget.setAmount(amount));
        Optional.ofNullable(budget.getStatus())
            .ifPresent(status -> updatedBudget.setStatus(status));


        return budgetRepository.save(updatedBudget);
    }

    public Budget findBudget(Long budgetId) {
        Optional<Budget> optionalBudget = budgetRepository.findById(budgetId);
        Budget findBudget =
                optionalBudget.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.BUDGET_NOT_FOUND));
        if(findBudget.getStatus().equals(Budget.Status.INACTIVE)) throw new BusinessLogicException(ExceptionCode.BUDGET_IS_INACTIVE);

        return findBudget;
    }

    public List<Budget> findAllCurrentBudget(Long memberId) {
        List<MemberCategory> memberCategories = memberCategoryRepository.findAllByMemberIdAndStatusNot(memberId, MemberCategory.Status.INACTIVE);

        List<Long> memberCategoryIdList = new ArrayList<>();
        for(MemberCategory memberCategory : memberCategories) {
            memberCategoryIdList.add(memberCategory.getId());
        }

        List<Budget> budgets = budgetRepository.findBudgetsByMemberCategoryIdInAndCurrentIsTrue(memberCategoryIdList);

        return budgets;
    }

    public void deleteBudget(Long budgetId) {
        Budget budget = findBudget(budgetId);

        budget.setCurrent(false);
        budget.setStatus(Budget.Status.INACTIVE);
    }

    public void verifiedBudget(Long budgetId) {
        Optional<Budget> optionalBudget = budgetRepository.findById(budgetId);
        Budget findBudget =
                optionalBudget.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.BUDGET_NOT_FOUND));
        if(findBudget.getStatus().equals(Budget.Status.INACTIVE)) throw new BusinessLogicException(ExceptionCode.BUDGET_IS_INACTIVE);

    }


    @Async("threadPoolTaskExecutor")
    public void checkInitDate() {
        List<Member> members = memberRepository.findByInitDateAndStateIs(LocalDate.now().getDayOfMonth(), Member.MemberState.ACTIVE);
        for(Member member : members) {
            initBudgetService.forOneMemberInitBudget(member);
        }
    }
}
