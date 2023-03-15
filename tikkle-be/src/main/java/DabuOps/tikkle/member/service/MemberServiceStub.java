package DabuOps.tikkle.member.service;

import DabuOps.tikkle.member.entity.Member;
import DabuOps.tikkle.member.entity.Member.Gender;
import DabuOps.tikkle.member.entity.Member.MemberState;
import javax.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
public class MemberServiceStub {
    private Member stubMember;

    @PostConstruct
    public void init(){
        stubMember = Member.builder()
            .id(1L)
            .state(MemberState.ACTIVE)
            .name("홍길동")
            .initDate(25)
            .payDay(25)
            .email("test123@gmail.com")
            .gender(Gender.male)
            .build();
    }
   // @Override
    public Member createMember(Member member) { return null;}

    //@Override
    public Member createMemberByOauth2(Member member) { return null; }

    //@Override
    public Member updateMember(Member member) { return null; }

    //@Override
    public Member getMember(Long memberId) {
        return stubMember;}

    //@Override
    public Member getMember(String email) {
        return stubMember;
    }

    //@Override
    public void deleteMember(Long memberId) {}

    //@Override
    public void verifyExistEmail(String email) {}

    //@Override
    public Member findExistMemberByEmail(String email) { return null; }

}
