package DabuOps.tikkle.member_category.service;

import DabuOps.tikkle.budget.service.BudgetService;
import DabuOps.tikkle.category.entity.Category;
import DabuOps.tikkle.category.repository.CategoryRepository;
import DabuOps.tikkle.global.exception.BusinessLogicException;
import DabuOps.tikkle.global.exception.ExceptionCode;
import DabuOps.tikkle.member.entity.Member;
import DabuOps.tikkle.member.repository.MemberRepository;
import DabuOps.tikkle.member.service.MemberService;
import DabuOps.tikkle.member_category.entity.MemberCategory;
import DabuOps.tikkle.member_category.repository.MemberCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

//@Service
@RequiredArgsConstructor
@Service

public class MemberCategoryServiceImpl implements MemberCategoryService{
    private final MemberRepository memberRepository;
    private final MemberCategoryRepository memberCategoryRepository;
    private final BudgetService budgetService;

    private final CategoryRepository categoryRepository;

    private final Category category = Category.builder()
        .id(1L)
        .name("식비")
        .build();
     // 사용자 설정 멤버 카테고리가 갖다 쓸 카테고리 ID


    // 사용자가 직접 카테고리 만들 때 쓸 메서드
    public MemberCategory createOriginalMemberCategory(MemberCategory memberCategory, Long memberId) {
        Member member = memberRepository.findById(memberId)
                        .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        memberCategory.setCategory(categoryRepository.findById(21L).get()); // '기타' 카테고리로 고정
        memberCategory.setMember(member);
        memberCategory.setImage(category.getImage());
        MemberCategory savedMemberCategory = memberCategoryRepository.save(memberCategory);

        budgetService.createAutoBudget(savedMemberCategory);

        return savedMemberCategory;
    }

    // 처음 가입했을 때 멤버 카테고리 자동 생성
    public MemberCategory createAutoMemberCategory(Member member, Category category) {
        MemberCategory memberCategory = new MemberCategory(); // 리퀘스트 바디를 받는게 아니라서
        memberCategory.setMember(member);
        memberCategory.setCategory(category); // 반복문으로 들어오는 카테고리가 매번 바뀜
        memberCategory.setName(category.getName()); // 일단 이름의 기본값을 카테고리거 가져와서 사용
        memberCategory.setImage(category.getImage());

        return memberCategoryRepository.save(memberCategory);
    }


    public MemberCategory updateMemberCategory(MemberCategory memberCategory, Long memberCategoryId) {
        MemberCategory updatedMemberCategory = findMemberCategory(memberCategoryId);
        if(updatedMemberCategory.getCategory().getId() != 21L) {
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

        memberCategory.setStatus(MemberCategory.Status.INACTIVE);
    }
}
