package DabuOps.tikkle.userauth.controller;

import DabuOps.tikkle.member.service.MemberService;
import DabuOps.tikkle.transaction_history.service.TransactionHistoryService;
import DabuOps.tikkle.userauth.dto.AccountInfoDto;
import DabuOps.tikkle.userauth.dto.ModifiedTransactionHistoryDto;
import DabuOps.tikkle.userauth.dto.TokenResponseDto;
import DabuOps.tikkle.userauth.service.UserAuthService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@Slf4j
public class UserAuthController {
    private final UserAuthService userAuthService;

    @PostMapping("/members/auth/{member-id}")
    public String accountAuth(@PathVariable("member-id") Long memberId, @RequestParam("code") String authorizationCode) {
        TokenResponseDto tokenResponse = userAuthService.requestToken(authorizationCode, memberId);
        List<AccountInfoDto> accountInfoDtoList = userAuthService.requestUserInfo(tokenResponse.getAccessToken(), tokenResponse.getUserSeqNo());

        return "사용자 인증이 완료되었습니다.";
    }

    @PostMapping("/transaction_histories/api/{member-id}")
    public String inquiryTransactionHistories(@PathVariable("member-id") Long memberId) {
        List<ModifiedTransactionHistoryDto> transactionDtoList = userAuthService.requestTransactionHistories(memberId);

        return "조회 완료";
    }


}