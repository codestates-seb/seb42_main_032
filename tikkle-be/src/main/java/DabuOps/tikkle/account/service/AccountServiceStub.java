package DabuOps.tikkle.account.service;

import DabuOps.tikkle.account.entity.Account;
import java.util.List;
import org.springframework.stereotype.Service;


public class AccountServiceStub{
    public Account createAccount(Account account, Long memberId){return null;}
    public Account updateAccount(Account account, Long id, Long memberId){return null;}
    public List<Account> getAccounts(Long memberId){return null;}
    public void deleteAccount(Long id, Long memberId){}

    public Account findExistAccountById(Long id){return null;}
}
