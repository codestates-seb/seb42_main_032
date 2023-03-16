package DabuOps.tikkle.member_category.service;

import DabuOps.tikkle.category.entity.Category;
import DabuOps.tikkle.global.exception.BusinessLogicException;
import DabuOps.tikkle.global.exception.ExceptionCode;
import DabuOps.tikkle.member.entity.Member;
import DabuOps.tikkle.member.repository.MemberRepository;
import DabuOps.tikkle.member.service.MemberService;
import DabuOps.tikkle.member_category.entity.MemberCategory;
import DabuOps.tikkle.member_category.repository.MemberCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

//@Service
@RequiredArgsConstructor
@Service
public class MemberCategoryServiceImpl implements MemberCategoryService{
    private final MemberService memberService;
    private final MemberCategoryRepository memberCategoryRepository;

    private final Category category = Category.builder()
        .id(1L)
        .name("식비")
        .build();
     // 사용자 설정 멤버 카테고리가 갖다 쓸 카테고리 ID


    //@Override
    public MemberCategory createMemberCategory(MemberCategory memberCategory, Long memberId) {
        Member member = memberService.findExistMemberById(memberId);
        memberCategory.setCategory(category);
        memberCategory.setMember(member);

        return memberCategoryRepository.save(memberCategory);
    }

    @Override
    public MemberCategory updateMemberCategory(MemberCategory memberCategory, Long memberCategoryId) {
        return null;
    }

    public MemberCategory updateMemberCategory(MemberCategory memberCategory, long memberCategoryId) {
        MemberCategory updatedMemberCategory = findMemberCategory(memberCategoryId);

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
