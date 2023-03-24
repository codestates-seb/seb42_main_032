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

    public Budget createAutoBudget(MemberCategory memberCategory) {
        Budget budget = Budget.builder()
                .memberCategory(memberCategory)
                .spend(0)
                .amount(0)
                .current(true)
                .build();
        budget.setStartDate(LocalDate.now().withDayOfMonth(memberCategory.getMember().getInitDate()));
        budget.setEndDate(budget.getStartDate().plusMonths(1).minusDays(1));

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

        List<Budget> budgets = budgetRepository.findByMemberCategoryIdInAndCurrentIsTrue(memberCategoryIdList);

        return budgets;
    }

    public void deleteBudget(Long budgetId) {
        Budget budget = findBudget(budgetId);

        budget.setCurrent(false);
        budget.setStatus(Budget.Status.INACTIVE);
    }


    public void checkInitDate() { // 매일 자정에 전체 멤버 initDate 검사
        List<Member> members = memberRepository.findByStateIs(Member.MemberState.ACTIVE);
        LocalDate today = LocalDate.now(); // 오늘
        for(Member member : members) { // 전체 멤버 탐색
            LocalDate initDate = LocalDate.now().withDayOfMonth(member.getInitDate()); // member의 initDate
            if(initDate.equals(today)) { //initDate가 오늘인 member가 있으면!
                // 해당 member의 활성화 된 모든 memberCategory 불러오기
                List<MemberCategory> memberCategories = memberCategoryRepository.findAllByMemberIdAndStatusNot(member.getId(), MemberCategory.Status.INACTIVE);

                List<Long> memberCategoryIdList = new ArrayList<>();
                for(MemberCategory memberCategory : memberCategories) {
                    memberCategoryIdList.add(memberCategory.getId());
                }

                List<Budget> budgets = budgetRepository.findByMemberCategoryIdInAndCurrentIsTrue(memberCategoryIdList); // 해당 memberCategory의 현재 budget 땡겨오기
                List<Integer> amountList = new ArrayList<>(); // 전월 예산 설정 모은 리스트
                for(Budget budget : budgets) {
                    budget.setCurrent(false); // 이제 안쓴다!
                    budgetRepository.save(budget);
                    amountList.add(budget.getAmount());
                }
                // 마지막으로 memberCategory마다 예산 하나씩 새로 만들어주고, 전월 설정 가져오기
                for(int i = 0; i < memberCategories.size(); i++) {
                    initBudget(memberCategories.get(i), amountList.get(i));
                }
            }
        }
        System.out.println("스케줄 메서드 잘 실행중!");
    }

}
