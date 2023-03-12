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
                .memberCategoryId(1L)
                .name("술")
                .categoryId(1L)
                .build();

        stubMemberCategory2 = MemberCategory.builder()
                .memberCategoryId(2L)
                .name("배달")
                .categoryId(1L)
                .build();
    }

    public MemberCategory createMemberCategory(MemberCategory memberCategory, Long memberId) {
        return null;
    }
    public MemberCategory updateMemberCategory(MemberCategory memberCategory) {
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
