package DabuOps.tikkle.budget.service;

import DabuOps.tikkle.budget.entity.Budget;
import DabuOps.tikkle.budget.repository.BudgetRepository;
import DabuOps.tikkle.global.exception.BusinessLogicException;
import DabuOps.tikkle.global.exception.ExceptionCode;
import DabuOps.tikkle.member.entity.Member;
import DabuOps.tikkle.member.repository.MemberRepository;
import DabuOps.tikkle.member_category.entity.MemberCategory;
import DabuOps.tikkle.member_category.service.MemberCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.scheduling.support.CronTrigger;
import org.springframework.scheduling.support.SimpleTriggerContext;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BudgetService {
    private final BudgetRepository budgetRepository;
    private final MemberRepository memberRepository;

    private final MemberCategoryService memberCategoryService;

    public Budget createBudget(Budget budget, Long memberCategoryId) {
        budget.setMemberCategoryId(memberCategoryId);
        budget.setSpend(0);

        return budgetRepository.save(budget);
    }

    public Budget createAutoBudget(MemberCategory memberCategory) {
        Budget budget = new Budget();
        budget.setMemberCategoryId(memberCategory.getId());
        budget.setSpend(0);
        budget.setAmount(0);
        return budgetRepository.save(budget);
    }

    public Budget updateBudget(Budget budget, Long budgetId) {
        Budget updatedBudget = findBudget(budgetId);
        if(!LocalDate.now().equals(LocalDate.now().withDayOfMonth(updatedBudget.getStartDate().getDayOfMonth()))) {
            throw new BusinessLogicException(ExceptionCode.CANNOT_CHANGE_BUDGET);
        }

        Optional.ofNullable(budget.getAmount())
                .ifPresent(amount -> updatedBudget.setAmount(amount));


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

    public void deleteBudget(Long budgetId) {
        Budget budget = findBudget(budgetId);

        budget.setStatus(Budget.Status.INACTIVE);
    }

    @Scheduled(cron = "0 0 0 * * ?")
    public void checkInitDate() {
        List<Member> members = memberRepository.findByStateEquals("ACTIVE");
        for(Member member : members) {
            LocalDate initDate = LocalDate.now().withDayOfMonth(member.getInitDate());
            LocalDate today = LocalDate.now();
            if(initDate.equals(today)) {
                //createBudget();
            }
        }
    }


}
