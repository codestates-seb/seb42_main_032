package DabuOps.tikkle.member_category.service;

import DabuOps.tikkle.member_category.entity.MemberCategory;

import java.util.List;

public interface MemberCategoryService {
    MemberCategory createMemberCategory(MemberCategory memberCategory, Long memberId);

    MemberCategory updateMemberCategory(MemberCategory memberCategory);

    MemberCategory findMemberCategory(Long memberCategoryId);

    List<MemberCategory> findAllMemberCategories(Long memberId);

    void deleteMemberCategory(Long memberCategoryId);
}
