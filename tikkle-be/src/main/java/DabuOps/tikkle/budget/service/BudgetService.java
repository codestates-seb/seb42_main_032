package DabuOps.tikkle.budget.service;

import DabuOps.tikkle.budget.entity.Budget;
import DabuOps.tikkle.budget.repository.BudgetRepository;
import DabuOps.tikkle.global.exception.BusinessLogicException;
import DabuOps.tikkle.global.exception.ExceptionCode;
import DabuOps.tikkle.member.entity.Member;
import DabuOps.tikkle.member.repository.MemberRepository;
import DabuOps.tikkle.member_category.entity.MemberCategory;
import DabuOps.tikkle.member_category.repository.MemberCategoryRepository;
import DabuOps.tikkle.member_category.service.MemberCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.scheduling.support.CronTrigger;
import org.springframework.scheduling.support.SimpleTriggerContext;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BudgetService {
    private final BudgetRepository budgetRepository;
    private final MemberRepository memberRepository;

    private final MemberCategoryRepository memberCategoryRepository;

    public Budget createAutoBudget(MemberCategory memberCategory) {
        Budget budget = new Budget();
        budget.setMemberCategory(memberCategory);
        budget.setSpend(0);
        budget.setAmount(0);
        budget.setCurrent(true);
        return budgetRepository.save(budget);
    }

    public Budget initBudget(MemberCategory memberCategory, boolean isKeep) {
        Budget budget = new Budget();
        budget.setMemberCategory(memberCategory);
        budget.setStartDate(LocalDate.now());
        budget.setEndDate(LocalDate.now().plusMonths(1).minusDays(1));
        budget.setCurrent(true);
        budget.setSpend(0);
        if(isKeep) {}
        return budgetRepository.save(budget);
    }

    public Budget updateBudget(Budget budget, Long budgetId) {
        Budget updatedBudget = findBudget(budgetId);

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
    public void checkInitDate(Boolean isKeep) {
        List<Member> members = memberRepository.findByStateEquals("ACTIVE");
        LocalDate today = LocalDate.now(); // 오늘
        for(Member member : members) { // 전체 멤버 탐색
            LocalDate initDate = LocalDate.now().withDayOfMonth(member.getInitDate()); // member의 initDate
            if(initDate.equals(today)) { //initDate가 오늘인 member가 있으면!
                // 해당 member의 활성화 된 모든 memberCategory 불러오기
                List<MemberCategory> memberCategories = memberCategoryRepository.findAllByMemberIdAndStatusNot(member.getId(), MemberCategory.Status.INACTIVE);
                // 걔네의 id만 담을 리스트
                List<Long> memberCategoryIdList = new ArrayList<>();
                for(MemberCategory memberCategory : memberCategories) {
                    memberCategoryIdList.add(memberCategory.getId());
                }

                List<Budget> budgets = budgetRepository.findByMemberCategoryIdInAndCurrentIsTrue(memberCategoryIdList); // 해당 memberCategory의 현재 budget 땡겨오기
                for(Budget budget : budgets) {
                    budget.setCurrent(false); // 이제 안쓴다!
                }
                // 마지막으로 memberCategory마다 예산 하나씩 새로 만들어주기
                for(MemberCategory memberCategory : memberCategories) {
                    createAutoBudget(memberCategory);
                }
            }
        }
    }


}
