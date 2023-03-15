package DabuOps.tikkle.account.mapper;

import DabuOps.tikkle.account.dto.AccountDto;
import DabuOps.tikkle.account.entity.Account;
import java.util.List;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface AccountMapper {

    Account postDtoToAccount(AccountDto.Post post);

    Account patchDtoToAccount(AccountDto.Patch patch);

    @Named("ATR")
    @Mapping(source = "member.id", target = "memberId")
    AccountDto.Response accountToResponseDto(Account account);

    @IterableMapping(qualifiedByName = "ATR")
    List<AccountDto.Response> accountsToResponseDtos(List<Account> accounts);
}
