package DabuOps.tikkle.member_category.service;

import DabuOps.tikkle.budget.entity.Budget;
import DabuOps.tikkle.budget.repository.BudgetRepository;
import DabuOps.tikkle.budget.service.BudgetServiceImpl;
import DabuOps.tikkle.category.entity.Category;
import DabuOps.tikkle.category.repository.CategoryRepository;
import DabuOps.tikkle.global.exception.BusinessLogicException;
import DabuOps.tikkle.global.exception.ExceptionCode;
import DabuOps.tikkle.member.entity.Member;
import DabuOps.tikkle.member.repository.MemberRepository;
import DabuOps.tikkle.member_category.entity.MemberCategory;
import DabuOps.tikkle.member_category.repository.MemberCategoryRepository;
import DabuOps.tikkle.transaction_history.entity.TransactionHistory;
import DabuOps.tikkle.transaction_history.repository.TransactionHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

//@Service
@RequiredArgsConstructor
@Service

public class MemberCategoryServiceImpl implements MemberCategoryService{
    private final MemberRepository memberRepository;
    private final MemberCategoryRepository memberCategoryRepository;
    private final BudgetRepository budgetRepository;
    private final TransactionHistoryRepository transactionHistoryRepository;

    private final CategoryRepository categoryRepository;


    // 사용자가 직접 카테고리 만들 때 쓸 메서드
    public MemberCategory createOriginalMemberCategory(MemberCategory memberCategory, Long memberId) {
        Member member = memberRepository.findById(memberId)
                        .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        Category category = categoryRepository.findByName("기타");
        memberCategory.setCategory(category); // '기타' 카테고리로 고정
        memberCategory.setMember(member);
        memberCategory.setImage(category.getImage());
        MemberCategory savedMemberCategory = memberCategoryRepository.save(memberCategory);

        return savedMemberCategory;
    }

    // 처음 가입했을 때 멤버 카테고리 자동 생성
    public MemberCategory createAutoMemberCategory(Member member, Category category) {
        MemberCategory memberCategory = MemberCategory.builder()
                .member(member)
                .category(category)
                .name(category.getName())
                .image(category.getImage())
                .build();

        return memberCategoryRepository.save(memberCategory);
    }


    public MemberCategory updateMemberCategory(MemberCategory memberCategory, Long memberCategoryId) {
        MemberCategory updatedMemberCategory = findMemberCategory(memberCategoryId);
        if(updatedMemberCategory.getCategory().getName().equals("기타")) {
            throw new BusinessLogicException(ExceptionCode.CANNOT_CHANGE_CATEGORY_NAME);
        }

        Optional.ofNullable(memberCategory.getName())
                .ifPresent(name -> updatedMemberCategory.setName(name));

        return memberCategoryRepository.save(updatedMemberCategory);
    }

    public MemberCategory findMemberCategory(Long memberCategoryId) {
        Optional<MemberCategory> optionalMemberCategory = memberCategoryRepository.findById(memberCategoryId);
        MemberCategory findMemberCategory =
                optionalMemberCategory.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.CATEGORY_NOT_FOUND));
        if(findMemberCategory.getStatus().equals(MemberCategory.Status.INACTIVE)) { throw new BusinessLogicException(ExceptionCode.CATEGORY_IS_INACTIVE); }
        return findMemberCategory;
    }

    public List<MemberCategory> findAllMemberCategories(Long memberId) {
        List<MemberCategory> memberCategories = memberCategoryRepository.findAllByMemberIdAndStatusNot(memberId, MemberCategory.Status.INACTIVE);

        return memberCategories;
    }

    public void deleteMemberCategory(Long memberCategoryId) {
        MemberCategory memberCategory = findMemberCategory(memberCategoryId);
        if(memberCategory.getCategory().getName().equals("기타")) {
            throw new BusinessLogicException(ExceptionCode.CANNOT_CHANGE_CATEGORY_STATUS);
        }
        else {
            memberCategory.setStatus(MemberCategory.Status.INACTIVE);
            MemberCategory etcCategory = memberCategoryRepository.findByCategoryIdAndMemberIdAndStatusNot(21L, memberCategory.getMember().getId(), MemberCategory.Status.INACTIVE);

            List<Budget> budgets = budgetRepository.findByMemberCategoryId(memberCategoryId);
            for(Budget budget : budgets) {
                budget.setMemberCategory(etcCategory);
            }

            List<TransactionHistory> transactionHistories = transactionHistoryRepository.findByMemberCategoryId(memberCategoryId);

            for(TransactionHistory transactionHistory : transactionHistories) {
                transactionHistory.setMemberCategory(etcCategory);
            }
        }
    }
}
