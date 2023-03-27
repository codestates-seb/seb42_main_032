package DabuOps.tikkle.account.repository;

import DabuOps.tikkle.account.entity.Account;
import DabuOps.tikkle.account.entity.Account.AccountState;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    List<Account> findAllByMemberIdAndStateIs(Long id, AccountState state);

    Optional<Account> findByIdAndStateIs(Long id, AccountState state);

    Optional<Account> findByNumber(String number);

    Optional<Account> findByFintechUseNum(String fintechUseNum);
}
