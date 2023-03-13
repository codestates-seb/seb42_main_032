package DabuOps.tikkle.member_category.service;

import DabuOps.tikkle.category.entity.Category;
import DabuOps.tikkle.member.entity.Member;
import DabuOps.tikkle.member.entity.Member.Gender;
import DabuOps.tikkle.member.entity.Member.MemberState;
import DabuOps.tikkle.member_category.entity.MemberCategory;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;


@Service
public class MemberCategoryServiceStub implements MemberCategoryService {
    private MemberCategory stubMemberCategory1;
    private MemberCategory stubMemberCategory2;
    private Member stubMember;

    private Category category;
    @PostConstruct
    public void init() {
        category = Category.builder()
            .id(1L)
            .name("식비")
            .build();
        stubMember = Member.builder()
            .id(1L)
            .state(MemberState.ACTIVE)
            .name("홍길동")
            .initDate(25)
            .payDay(25)
            .email("test123@gmail.com")
            .gender(Gender.male)
            .build();
        stubMemberCategory1 = MemberCategory.builder()
                .id(1L)
                .name("술")
                .category(category)
                .member(stubMember)
                .build();

        stubMemberCategory2 = MemberCategory.builder()
                .id(2L)
                .name("배달")
                .category(category)
                .member(stubMember)
                .build();
    }

    public MemberCategory createMemberCategory(MemberCategory memberCategory, Long memberId) {
        return null;
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
