package DabuOps.tikkle.account.service;

import DabuOps.tikkle.account.entity.Account;
import java.util.List;

public interface AccountService {
    Account createAccount(Account account, Long memberId);
    Account updateAccount(Account account, Long id, Long memberId);
    List<Account> getAccounts(Long memberId);
    void deleteAccount(Long id, Long memberId);
    Account findExistAccountById(Long id);
    void verifyExistAccountNumber(String number);
}
