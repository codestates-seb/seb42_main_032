package DabuOps.tikkle.member_category.service;

import DabuOps.tikkle.member_category.entity.MemberCategory;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;


@Service
public class MemberCategoryServiceStub implements MemberCategoryService {
    private MemberCategory stubMemberCategory1;
    private MemberCategory stubMemberCategory2;

    @PostConstruct
    public void init() {
        stubMemberCategory1 = MemberCategory.builder()
                .id(1L)
                .name("술")
                .categoryId(1L)
                .memberId(1L)
                .build();

        stubMemberCategory2 = MemberCategory.builder()
                .id(2L)
                .name("배달")
                .categoryId(1L)
                .memberId(1L)
                .build();
    }

    public MemberCategory createMemberCategory(MemberCategory memberCategory, Long memberId) {
        memberCategory.setMemberId(1L);
        memberCategory.setCategoryId(1L);
        return stubMemberCategory1;
    }
    public MemberCategory updateMemberCategory(MemberCategory memberCategory, Long memberCategoryId) {
        return null;
    }

    public MemberCategory findMemberCategory(Long memberCategoryId) {
        return stubMemberCategory1;
    }

    public List<MemberCategory> findAllMemberCategories(Long memberId) {
        return List.of(stubMemberCategory1, stubMemberCategory2);
    }

    public void deleteMemberCategory(Long memberCategoryId) {

    }
}
