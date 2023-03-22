package DabuOps.tikkle.member.service;

import DabuOps.tikkle.member.entity.Member;
import org.springframework.stereotype.Service;

@Service
public interface MemberService {
    Member createMember(Member member);

    Member createMemberByOauth2(Member member);

    Member updateMember(Member member);

    Member initMember(Member member);

    Member getMember(Long memberId);

    Member getMember(String email);

    Member findExistMemberById(Long memberId);

    void deleteMember(Long memberId);

    void verifyExistEmail(String email);

    Member findExistMemberByEmail(String email);


}
