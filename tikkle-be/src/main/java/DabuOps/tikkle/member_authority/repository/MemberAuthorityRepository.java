package DabuOps.tikkle.member_authority.repository;

import DabuOps.tikkle.member.entity.Member;
import DabuOps.tikkle.member.entity.Member.MemberState;
import DabuOps.tikkle.member_authority.entity.MemberAuthority;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberAuthorityRepository extends JpaRepository<MemberAuthority, Long> {
    Optional<Member> findByMemberId(Long id);
}
