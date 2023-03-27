package DabuOps.tikkle.account.service;

import DabuOps.tikkle.account.entity.Account;
import java.util.List;

public interface AccountService {
    Account createAccount(Account account);
    Account updateAccount(Account account, Long id);
    List<Account> getAccounts(Long memberId);
    Account getAccount(Long id);
    void deleteAccount(Long id);
    Account findExistAccountById(Long id);
    void verifyExistAccountNumber(String number);
}
