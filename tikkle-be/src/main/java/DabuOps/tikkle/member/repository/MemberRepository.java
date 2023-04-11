package DabuOps.tikkle.member.repository;

import DabuOps.tikkle.member.entity.Member;
import DabuOps.tikkle.member.entity.Member.MemberState;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByIdAndStateIs(Long id, MemberState state);
    Optional<Member> findByEmailAndStateIs(String email, MemberState state);
    Member findByEmail(String email);
    List<Member> findByStateIs(MemberState state);

    List<Member> findByInitDateAndStateIs(int date, MemberState state);
}
