package DabuOps.tikkle.member.service;

import DabuOps.tikkle.member.entity.Member;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class MemberServiceStub implements MemberService{

    @Override
    public Member createMember(Member member) { return null; }

    @Override
    public Member createMemberByOauth2(Member member) { return null; }

    @Override
    public Member updateMember(Member member) { return null; }

    @Override
    public Member getMember(Long memberId) { return null; }

    @Override
    public Member getMember(String email) { return null; }

    @Override
    public void deleteMember(Long memberId) {}

    @Override
    public void verifyExistEmail(String email) {}

    @Override
    public Member findExistMemberByEmail(String email) { return null; }

}
