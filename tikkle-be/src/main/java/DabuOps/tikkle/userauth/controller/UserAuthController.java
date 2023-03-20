package DabuOps.tikkle.userauth.controller;

import DabuOps.tikkle.oauth.dto.LogInMemberDto;
import DabuOps.tikkle.oauth.resolver.LoginMember;
import DabuOps.tikkle.userauth.dto.AccountInfoDto;
import DabuOps.tikkle.userauth.dto.TokenResponseDto;
import DabuOps.tikkle.userauth.service.UserAuthService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
@Slf4j
public class UserAuthController {
    private final UserAuthService userAuthService;

    @GetMapping("/members/auth")
    public String accountAuth(@RequestParam("code") String authorizationCode, @LoginMember LogInMemberDto logInMemberDto) {
        TokenResponseDto tokenResponse = userAuthService.requestToken(authorizationCode, logInMemberDto.getMemberId());
        List<AccountInfoDto> accountInfoDtoList = userAuthService.requestUserInfo(tokenResponse.getAccessToken());

        return "사용자 인증이 완료되었습니다.";
    }

//    @GetMapping("/transaction_histories/auth")
//    public Mono<AccountTransactionListDto> transactionList(@RequestParam("from_date") String fromDate,
//        @RequestParam("to_date") String toDate,
//        @LoginMember LogInMemberDto logInMemberDto){}


}