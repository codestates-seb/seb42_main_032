package DabuOps.tikkle.member_category.service;

import DabuOps.tikkle.category.entity.Category;
import DabuOps.tikkle.member.entity.Member;
import DabuOps.tikkle.member_category.entity.MemberCategory;

import java.util.List;

public interface MemberCategoryService {
    MemberCategory createOriginalMemberCategory(MemberCategory memberCategory, Long memberId);

    MemberCategory updateMemberCategory(MemberCategory memberCategory, Long memberCategoryId);

    MemberCategory createAutoMemberCategory(Member member, Category category);

    MemberCategory findMemberCategory(Long memberCategoryId);

    List<MemberCategory> findAllMemberCategories(Long memberId);

    void deleteMemberCategory(Long memberCategoryId);
}
