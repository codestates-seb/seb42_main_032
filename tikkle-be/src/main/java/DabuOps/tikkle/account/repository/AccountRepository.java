package DabuOps.tikkle.account.repository;

import DabuOps.tikkle.account.entity.Account;
import DabuOps.tikkle.account.entity.Account.AccountState;
import DabuOps.tikkle.member.entity.Member;
import DabuOps.tikkle.member.entity.Member.MemberState;
import java.util.Optional;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository {
    Optional<Account> findAllByMemberIdAndStateIs(Long id, AccountState state);
}
