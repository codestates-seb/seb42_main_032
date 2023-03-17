package DabuOps.tikkle.account.service;

import DabuOps.tikkle.account.entity.Account;
import DabuOps.tikkle.account.entity.Account.AccountState;
import DabuOps.tikkle.account.repository.AccountRepository;
import DabuOps.tikkle.global.exception.BusinessLogicException;
import DabuOps.tikkle.global.exception.ExceptionCode;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService{

    private final AccountRepository accountRepository;

    @Override
    public Account createAccount(Account account, Long memberId) {
        return null;
    }

    @Override
    public Account updateAccount(Account account, Long id, Long memberId) {

        Account obtainAccount = findExistAccountById(id);
        Optional.ofNullable(account.getName())
            .ifPresent(content -> obtainAccount.setName(content));
        return accountRepository.save(obtainAccount);
    }

    @Override
    public List<Account> getAccounts(Long memberId) {

        //사용자의 아이디로 계좌를 검색해서 전체 리스트로 반환
        List<Account> accounts = accountRepository.findAllByMemberIdAndStateIs(memberId, AccountState.ACTIVE);

        return accounts;
    }

    @Override
    public void deleteAccount(Long id, Long memberId) {
        //계좌 식별자를 검색해서
        Account obtainAccount = findExistAccountById(id);
        // 삭제 상태로 갱신한후 저장
        obtainAccount.setState(AccountState.INACTIVE);
        accountRepository.save(obtainAccount);
    }

    @Override
    public Account findExistAccountById(Long id) {
        // 계좌 식별자로 찾고
        Optional<Account> optionalAccount = accountRepository.findByIdAndStateIs(id, AccountState.ACTIVE);
        //없으면 에러 있으면 반환
        Account obtainAccount = optionalAccount
            .orElseThrow(() -> new BusinessLogicException(ExceptionCode.ACCOUNT_NOT_FOUND));
        return obtainAccount;
    }


}
