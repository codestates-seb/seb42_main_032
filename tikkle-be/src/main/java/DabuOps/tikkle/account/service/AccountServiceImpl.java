package DabuOps.tikkle.account.service;

import DabuOps.tikkle.account.entity.Account;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class AccountServiceImpl implements AccountService{

    @Override
    public Account createAccount(Account account, Long memberId) {
        return null;
    }

    @Override
    public Account updateAccount(Account account, Long id, Long memberId) {
        return null;
    }

    @Override
    public List<Account> getAccounts(Long memberId) {
        return null;
    }

    @Override
    public void deleteAccount(Long id, Long memberId) {

    }

    @Override
    public Account findExistAccountById(Long id) {
        return null;
    }
}
