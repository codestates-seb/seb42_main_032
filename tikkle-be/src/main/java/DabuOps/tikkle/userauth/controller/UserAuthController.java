package DabuOps.tikkle.userauth.controller;

import DabuOps.tikkle.oauth.dto.LogInMemberDto;
import DabuOps.tikkle.oauth.resolver.LoginMember;
import DabuOps.tikkle.transaction_history.service.TransactionHistoryService;
import DabuOps.tikkle.userauth.dto.AccountInfoDto;
import DabuOps.tikkle.userauth.dto.AccountTransactionDto;
import DabuOps.tikkle.userauth.dto.ModifiedTransactionHistoryDto;
import DabuOps.tikkle.userauth.dto.TokenResponseDto;
import DabuOps.tikkle.userauth.service.UserAuthService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
@Slf4j
public class UserAuthController {
    private final UserAuthService userAuthService;
    private final TransactionHistoryService transactionHistoryService;

    @GetMapping("/members/auth")
    public String accountAuth(@RequestParam("code") String authorizationCode, @LoginMember LogInMemberDto logInMemberDto) {
        TokenResponseDto tokenResponse = userAuthService.requestToken(authorizationCode, logInMemberDto.getMemberId());
        List<AccountInfoDto> accountInfoDtoList = userAuthService.requestUserInfo(tokenResponse.getAccessToken(), tokenResponse.getUserSeqNo());

        return "사용자 인증이 완료되었습니다.";
    }

    @PostMapping("/transaction_histories/api")
    public String inquiryTransactionHistories(@LoginMember LogInMemberDto logInMemberDto) {
        List<ModifiedTransactionHistoryDto> transactionDtoList = userAuthService.requestTransactionHistories(logInMemberDto.getMemberId());

        return "조회 완료";
    }


}