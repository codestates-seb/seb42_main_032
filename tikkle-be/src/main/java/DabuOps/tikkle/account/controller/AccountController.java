package DabuOps.tikkle.account.controller;

import DabuOps.tikkle.account.dto.AccountDto;
import DabuOps.tikkle.account.entity.Account;
import DabuOps.tikkle.account.mapper.AccountMapper;
import DabuOps.tikkle.account.service.AccountService;
import DabuOps.tikkle.global.utils.ResponseListDto;
import DabuOps.tikkle.global.utils.UriCreator;
import java.net.URI;
import java.util.List;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin
@RequestMapping("/accounts")
@Validated
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;

    private final AccountMapper mapper;

    @PostMapping
    public ResponseEntity postAccount(@Valid @RequestBody AccountDto.Post post) {
        Account account = accountService.createAccount(mapper.postDtoToAccount(post), 1L);
        URI location = UriCreator.createURI("/accounts", account.getId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{account-id}")
    public ResponseEntity patchAccount(@Valid @RequestBody AccountDto.Patch patch,
        @Positive @PathVariable("account-id") long id) {
        accountService.updateAccount(mapper.patchDtoToAccount(patch), id,1L);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/{member-id}")
    public ResponseEntity getAccounts(@Positive @PathVariable("member-id") long id) {
        List<Account> Accounts = accountService.getAccounts(id);

        return new ResponseEntity<>(new ResponseListDto<>(
            mapper.accountsToResponseDtos(Accounts)), HttpStatus.OK);
    }

    @DeleteMapping("/{account-id}")
    public ResponseEntity deleteAccount(@Positive @PathVariable("account-id") long id) {
        accountService.deleteAccount(id, 1L);
        return ResponseEntity.noContent().build();
    }
}
